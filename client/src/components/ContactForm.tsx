import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, X } from "lucide-react";

// Topic ntfy (à garder secret et à rotationner régulièrement)
const NTFY_TOPIC = "pogodev-contact-5z9h2k1m8n4p7q3r";

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

type FormStatus = "idle" | "confirming" | "sending" | "success" | "error";

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contact: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
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
    return undefined;
  };

  // Validation du contact (email ou téléphone)
  const validateContact = (contact: string): string | undefined => {
    if (contact.includes("@")) {
      // Validation email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contact)) {
        return "Indiquez un e-mail valide.";
      }
    } else {
      // Validation téléphone
      const digits = contact.replace(/[^\d]/g, "");
      if (digits.length < 8) {
        return "Indiquez un numéro valide (au moins 8 chiffres).";
      }
    }
    return undefined;
  };

  // Validation du message
  const validateMessage = (message: string): string | undefined => {
    if (message.length < 10 || message.length > 2000) {
      return "Indiquez un message (10–2000 caractères).";
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
      // Honeypot déclenché
      console.log("Spam detected: honeypot");
      return;
    }

    const timeSinceMount = Date.now() - formMountTime.current;
    if (timeSinceMount < 5000) {
      // Time trap déclenché
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
      // Focus sur le premier élément focusable de la modal
      setTimeout(() => firstFocusableRef.current?.focus(), 100);
    }
  };

  // Envoi vers ntfy
  const handleConfirmSend = async () => {
    setShowConfirmModal(false);
    setStatus("sending");

    try {
      const body = `[Contact site]
Nom: ${formData.name}
Contact: ${formData.contact}
Message:
${formData.message}`;

      const response = await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          Title: "Nouveau message du site",
        },
        body,
      });

      if (response.ok) {
        setStatus("success");
        localStorage.setItem("lastContactSubmit", Date.now().toString());
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending to ntfy:", error);
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
      // Piéger le focus dans la modal
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
    formMountTime.current = Date.now();
    setCanSubmit(false);
    setTimeout(() => setCanSubmit(true), 5000);
  };

  // État succès
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
        <p className="text-sm md:text-base text-muted-foreground mb-6">
          Message envoyé. Je reviens vers vous dès que je vois le message, je devrais le voir rapidement sur mon téléphone.
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
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Votre nom"
            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p
              id="name-error"
              className="mt-2 text-sm text-red-600 dark:text-red-400"
              role="alert"
              aria-live="polite"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Contact */}
        <div className="mb-6">
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Contact
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="E-mail ou téléphone"
            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
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
          {errors.contact && (
            <p
              id="contact-error"
              className="mt-2 text-sm text-red-600 dark:text-red-400"
              role="alert"
              aria-live="polite"
            >
              {errors.contact}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Votre message…"
            rows={6}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
            required
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p
              id="message-error"
              className="mt-2 text-sm text-red-600 dark:text-red-400"
              role="alert"
              aria-live="polite"
            >
              {errors.message}
            </p>
          )}
        </div>

        {/* Bouton Envoyer */}
        <button
          type="submit"
          disabled={!canSubmit || status === "sending"}
          className="w-full px-6 py-4 bg-accent text-white rounded-xl hover:bg-accent/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all font-semibold text-lg shadow-lg flex items-center justify-center gap-3"
          aria-label={!canSubmit ? "Bouton disponible dans quelques secondes" : "Envoyer le message"}
        >
          <Send className="w-5 h-5" />
          {status === "sending" ? "Envoi en cours..." : "Envoyer"}
        </button>

        {!canSubmit && (
          <p className="mt-2 text-sm text-muted-foreground text-center">
            Bouton disponible dans quelques secondes...
          </p>
        )}

        {/* Message d'erreur */}
        {status === "error" && (
          <div
            className="mt-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl"
            role="alert"
            aria-live="polite"
          >
            <p className="text-red-800 dark:text-red-200 text-sm">
              Envoi impossible pour le moment. Réessayez plus tard ou passez par{" "}
              <a
                href="https://linkedin.com/in/etiennepogoda"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
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
                  <p className="text-sm sm:text-base text-foreground font-medium break-words overflow-wrap-anywhere">{formData.name}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Contact</p>
                  <p className="text-sm sm:text-base text-foreground font-medium break-all overflow-wrap-anywhere">{formData.contact}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Message</p>
                  <p className="text-sm sm:text-base text-foreground break-words overflow-wrap-anywhere">
                    {formData.message.split("\n")[0].substring(0, 100)}
                    {formData.message.length > 100 && "..."}
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
