import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, X, AlertTriangle, Loader2 } from "lucide-react";

// Configuration du worker Cloudflare
const WORKER_URL = "https://old-water-0fb4.pogoda-etienne.workers.dev";

interface FormData {
  name: string;
  contact: string;
  message: string;
  website: string; // honeypot
}

interface FormErrors {
  name?: string;
  contact?: string;
  message?: string;
}

type FormStatus = "idle" | "confirming" | "sending" | "success" | "partial-success" | "error";

interface SendResult {
  telegram: boolean;
  ntfy: boolean;
}

export function RobustContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contact: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [sendResult, setSendResult] = useState<SendResult>({ telegram: false, ntfy: false });
  const [canSubmit, setCanSubmit] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const formMountTime = useRef<number>(Date.now());
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Time trap: activer le bouton après 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => setCanSubmit(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Vérifier le cooldown au chargement
  const checkCooldown = (): boolean => {
    const lastSubmit = localStorage.getItem("lastContactSubmit");
    if (lastSubmit) {
      const elapsed = Date.now() - parseInt(lastSubmit, 10);
      if (elapsed < 60000) {
        return false;
      }
    }
    return true;
  };

  // Validation du nom
  const validateName = (name: string): string | undefined => {
    if (name.length < 2 || name.length > 60) {
      return "Indiquez votre nom (2–60 caractères).";
    }
    if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(name)) {
      return "Utilisez uniquement des lettres, espaces, apostrophes et tirets.";
    }
    return undefined;
  };

  // Validation du contact (email ou téléphone)
  const validateContact = (contact: string): string | undefined => {
    const trimmed = contact.trim();
    if (trimmed.includes("@")) {
      // Validation email stricte
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(trimmed)) {
        return "Indiquez un e-mail valide (ex: nom@domaine.fr).";
      }
    } else {
      // Validation téléphone
      const digits = trimmed.replace(/[^\d]/g, "");
      if (digits.length < 8) {
        return "Indiquez un numéro valide (au moins 8 chiffres).";
      }
      if (digits.length > 15) {
        return "Le numéro est trop long (max 15 chiffres).";
      }
    }
    return undefined;
  };

  // Validation du message
  const validateMessage = (message: string): string | undefined => {
    const trimmed = message.trim();
    if (trimmed.length < 10) {
      return "Votre message est trop court (minimum 10 caractères).";
    }
    if (trimmed.length > 2000) {
      return "Votre message est trop long (maximum 2000 caractères).";
    }
    // Détection basique de spam
    const spamPatterns = [
      /(.)\1{10,}/i, // Répétition excessive
      /(viagra|casino|lottery|prize)/i, // Mots-clés spam
    ];
    if (spamPatterns.some(pattern => pattern.test(trimmed))) {
      return "Ce message semble suspect. Veuillez reformuler.";
    }
    return undefined;
  };

  // Validation en temps réel
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Valider le champ modifié
    if (name === "name") {
      setErrors((prev) => ({ ...prev, name: validateName(value) }));
    } else if (name === "contact") {
      setErrors((prev) => ({ ...prev, contact: validateContact(value) }));
    } else if (name === "message") {
      setErrors((prev) => ({ ...prev, message: validateMessage(value) }));
    }
  };

  // Validation complète du formulaire
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: validateName(formData.name),
      contact: validateContact(formData.contact),
      message: validateMessage(formData.message),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== undefined);
  };

  // Ouvrir la modal de confirmation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifications anti-spam
    if (formData.website !== "") {
      console.log("Spam detected: honeypot");
      return;
    }

    const timeSinceMount = Date.now() - formMountTime.current;
    if (timeSinceMount < 5000) {
      console.log("Spam detected: too fast");
      return;
    }

    if (!checkCooldown()) {
      setStatus("error");
      return;
    }

    if (validateForm()) {
      setShowConfirmModal(true);
      setStatus("confirming");
      setTimeout(() => firstFocusableRef.current?.focus(), 100);
    }
  };

  // Envoi via le worker Cloudflare
  const sendViaWorker = async (name: string, contact: string, message: string): Promise<boolean> => {
    try {
      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, contact, message }),
      });

      return response.ok;
    } catch (error) {
      console.error("Erreur worker:", error);
      return false;
    }
  };

  // Envoi via le worker (qui gère Telegram + Ntfy)
  const handleConfirmSend = async () => {
    setShowConfirmModal(false);
    setStatus("sending");

    try {
      const success = await sendViaWorker(formData.name, formData.contact, formData.message);

      if (success) {
        setStatus("success");
        setSendResult({ telegram: true, ntfy: true });
        localStorage.setItem("lastContactSubmit", Date.now().toString());
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setStatus("error");
    }
  };

  // Fermer la modal
  const handleCloseModal = () => {
    setShowConfirmModal(false);
    setStatus("idle");
  };

  // Gérer Escape pour fermer la modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showConfirmModal) {
        handleCloseModal();
      }
    };

    if (showConfirmModal) {
      document.addEventListener("keydown", handleEscape);
      const modal = modalRef.current;
      if (modal) {
        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        const handleTab = (e: KeyboardEvent) => {
          if (e.key === "Tab") {
            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
              }
            } else {
              if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
              }
            }
          }
        };

        document.addEventListener("keydown", handleTab);
        return () => {
          document.removeEventListener("keydown", handleTab);
          document.removeEventListener("keydown", handleEscape);
        };
      }
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [showConfirmModal]);

  // Réinitialiser le formulaire
  const handleReset = () => {
    setFormData({ name: "", contact: "", message: "", website: "" });
    setErrors({});
    setStatus("idle");
    setSendResult({ telegram: false, ntfy: false });
    formMountTime.current = Date.now();
    setCanSubmit(false);
    setTimeout(() => setCanSubmit(true), 5000);
  };

  // État succès complet
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl p-6 md:p-8 text-center border border-green-200 dark:border-green-800"
        role="alert"
        aria-live="polite"
      >
        <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">Merci !</h3>
        <p className="text-sm md:text-base text-muted-foreground mb-2">
          Message envoyé avec succès !
        </p>
        <p className="text-sm md:text-base text-muted-foreground mb-6">
          Je reviens vers vous très rapidement sur <span className="font-semibold text-foreground">{formData.contact}</span>.
        </p>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors font-medium text-sm md:text-base"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    );
  }

  // État succès partiel
  if (status === "partial-success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 rounded-2xl p-6 md:p-8 text-center border border-amber-200 dark:border-amber-800"
        role="alert"
        aria-live="polite"
      >
        <AlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-amber-600 dark:text-amber-400 mx-auto mb-4" />
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">Message reçu !</h3>
        <p className="text-sm md:text-base text-muted-foreground mb-2">
          Votre message a été envoyé via {sendResult.telegram ? "Telegram" : "Ntfy"}.
        </p>
        <p className="text-xs text-muted-foreground mb-6">
          (Un des services n'a pas pu être contacté, mais j'ai bien reçu votre message)
        </p>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors font-medium text-sm md:text-base"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    );
  }

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        className="bg-card rounded-2xl p-8 border border-border shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        aria-label="Formulaire de contact"
      >
        {/* Honeypot (caché) */}
        <div className="hidden" aria-hidden="true">
          <label>Site web</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Nom */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Votre nom"
            className={`w-full px-4 py-3 bg-background border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-border focus:ring-accent focus:border-transparent"
            }`}
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                id="name-error"
                className="mt-2 text-sm text-red-600 dark:text-red-400"
                role="alert"
                aria-live="polite"
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Contact <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="E-mail ou téléphone"
            className={`w-full px-4 py-3 bg-background border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
              errors.contact
                ? "border-red-500 focus:ring-red-500"
                : "border-border focus:ring-accent focus:border-transparent"
            }`}
            required
            aria-required="true"
            aria-invalid={!!errors.contact}
            aria-describedby="contact-help contact-error"
          />
          <p
            id="contact-help"
            className="mt-2 text-sm text-muted-foreground"
          >
            Je vous recontacte à cette adresse/ce numéro.
          </p>
          <AnimatePresence>
            {errors.contact && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                id="contact-error"
                className="mt-2 text-sm text-red-600 dark:text-red-400"
                role="alert"
                aria-live="polite"
              >
                {errors.contact}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Message */}
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Votre message…"
              rows={6}
              className={`w-full px-4 py-3 bg-background border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all resize-none ${
                errors.message
                  ? "border-red-500 focus:ring-red-500"
                  : "border-border focus:ring-accent focus:border-transparent"
              }`}
              required
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error message-count" : "message-count"}
            />
            <div
              id="message-count"
              className="absolute bottom-3 right-3 text-xs text-muted-foreground"
            >
              {formData.message.length}/2000
            </div>
          </div>
          <AnimatePresence>
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                id="message-error"
                className="mt-2 text-sm text-red-600 dark:text-red-400"
                role="alert"
                aria-live="polite"
              >
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Bouton Envoyer */}
        <button
          type="submit"
          disabled={!canSubmit || status === "sending"}
          className="w-full px-6 py-4 bg-accent text-white rounded-xl hover:bg-accent/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all font-semibold text-lg shadow-lg flex items-center justify-center gap-3"
          aria-label={!canSubmit ? "Bouton disponible dans quelques secondes" : "Envoyer le message"}
        >
          {status === "sending" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Envoyer
            </>
          )}
        </button>

        {!canSubmit && (
          <p className="mt-2 text-sm text-muted-foreground text-center">
            Bouton disponible dans quelques secondes...
          </p>
        )}

        {/* Message d'erreur */}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl"
            role="alert"
            aria-live="polite"
          >
            <p className="text-red-800 dark:text-red-200 text-sm font-medium mb-2">
              ❌ Envoi impossible pour le moment
            </p>
            <p className="text-red-800 dark:text-red-200 text-sm">
              Réessayez plus tard ou contactez-moi via{" "}
              <a
                href="https://linkedin.com/in/etiennepogoda"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline font-semibold"
              >
                LinkedIn
              </a>{" "}
              ou{" "}
              <a
                href="mailto:contact@pogodev.com"
                className="underline hover:no-underline font-semibold"
              >
                email direct
              </a>
              .
            </p>
          </motion.div>
        )}
      </motion.form>

      {/* Modal de confirmation */}
      <AnimatePresence>
        {showConfirmModal && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={handleCloseModal}
              aria-hidden="true"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-card rounded-2xl p-5 sm:p-6 md:p-8 shadow-2xl border border-border max-h-[90vh] overflow-y-auto"
              >
                {/* Bouton fermer */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-3 right-3 md:top-4 md:right-4 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                <h3
                  id="modal-title"
                  className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6 pr-8"
                >
                  Vérifiez vos infos
                </h3>

                <div className="space-y-2.5 sm:space-y-3 md:space-y-4 mb-3 sm:mb-4 md:mb-6">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-muted-foreground">Nom</p>
                    <p className="text-sm sm:text-base text-foreground font-medium break-words overflow-wrap-anywhere">
                      {formData.name}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-muted-foreground">Contact</p>
                    <p className="text-sm sm:text-base text-foreground font-medium break-all overflow-wrap-anywhere">
                      {formData.contact}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-muted-foreground">Message</p>
                    <p className="text-sm sm:text-base text-foreground break-words overflow-wrap-anywhere">
                      {formData.message.substring(0, 150)}
                      {formData.message.length > 150 && "..."}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm md:text-base text-foreground mb-3 sm:mb-4 md:mb-6 font-medium text-center">
                  Est-ce bien le bon moyen de vous joindre ?
                </p>

                <div className="flex flex-col gap-2.5 sm:gap-3">
                  <button
                    onClick={handleConfirmSend}
                    className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors font-medium text-sm sm:text-base order-1"
                  >
                    Confirmer l'envoi
                  </button>
                  <button
                    ref={firstFocusableRef}
                    onClick={handleCloseModal}
                    className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-background border-2 border-border text-foreground rounded-xl hover:bg-background/80 transition-colors font-medium text-sm sm:text-base order-2"
                  >
                    Modifier
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
