import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

// Topic ntfy (à changer régulièrement pour la sécurité)
const NTFY_TOPIC = "pogodev-contact-5z9h2k1x7n4w8q3m";
const COOLDOWN_KEY = "ntfy_last_submit";
const COOLDOWN_MS = 60000; // 60 secondes

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

export function NtfyContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contact: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  // Time trap : activer le bouton après 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonEnabled(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Vérifier le cooldown au chargement
  useEffect(() => {
    checkCooldown();
    const interval = setInterval(checkCooldown, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkCooldown = () => {
    const lastSubmit = localStorage.getItem(COOLDOWN_KEY);
    if (lastSubmit) {
      const elapsed = Date.now() - parseInt(lastSubmit);
      const remaining = Math.max(0, COOLDOWN_MS - elapsed);
      setCooldownRemaining(Math.ceil(remaining / 1000));
    } else {
      setCooldownRemaining(0);
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const digits = phone.replace(/[\s+()-]/g, "");
    return /^\d{8,}$/.test(digits);
  };

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (value.length < 2 || value.length > 60) {
          return "Indiquez votre nom (2–60 caractères).";
        }
        break;
      case "contact":
        if (value.includes("@")) {
          if (!validateEmail(value)) {
            return "Indiquez un e-mail valide.";
          }
        } else {
          if (!validatePhone(value)) {
            return "Indiquez un numéro valide (au moins 8 chiffres).";
          }
        }
        break;
      case "message":
        if (value.length < 10 || value.length > 2000) {
          return "Indiquez un message (10–2000 caractères).";
        }
        break;
    }
    return undefined;
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Validation en temps réel
    if (name !== "website") {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam : honeypot
    if (formData.website) {
      return; // Bot détecté
    }

    // Validation complète
    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      if (key !== "website") {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Vérifier le cooldown
    if (cooldownRemaining > 0) {
      return;
    }

    // Afficher la confirmation
    setShowConfirmation(true);
  };

  const handleConfirmSend = async () => {
    setShowConfirmation(false);
    setIsSubmitting(true);

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
          "Title": "Nouveau message du site",
        },
        body: body,
      });

      if (response.ok) {
        setSubmitStatus("success");
        localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
        checkCooldown();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", contact: "", message: "", website: "" });
    setErrors({});
    setSubmitStatus("idle");
  };

  if (submitStatus === "success") {
    return (
      <div className="max-w-2xl mx-auto" role="status" aria-live="polite">
        <Alert className="bg-success/10 border-success/30">
          <CheckCircle2 className="h-5 w-5 text-success" />
          <AlertDescription className="text-foreground">
            <p className="font-semibold mb-2">Merci ! Message envoyé.</p>
            <p className="text-muted-foreground mb-4">
              Je vous répondrai via <span className="font-medium text-foreground">{formData.contact}</span>.
            </p>
            <Button onClick={handleReset} variant="outline">
              Envoyer un autre message
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Nom */}
        <div>
          <Label htmlFor="name" className="text-foreground mb-2 block">
            Nom
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Votre nom"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-destructive mt-1" role="alert" aria-live="polite">
              {errors.name}
            </p>
          )}
        </div>

        {/* Contact */}
        <div>
          <Label htmlFor="contact" className="text-foreground mb-2 block">
            Contact
          </Label>
          <Input
            id="contact"
            type="text"
            placeholder="E-mail ou téléphone"
            value={formData.contact}
            onChange={(e) => handleChange("contact", e.target.value)}
            aria-invalid={!!errors.contact}
            aria-describedby="contact-help contact-error"
            className={errors.contact ? "border-destructive" : ""}
          />
          <p id="contact-help" className="text-sm text-muted-foreground mt-1">
            Je vous recontacte à cette adresse/ce numéro.
          </p>
          {errors.contact && (
            <p id="contact-error" className="text-sm text-destructive mt-1" role="alert" aria-live="polite">
              {errors.contact}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message" className="text-foreground mb-2 block">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Votre message…"
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`min-h-[150px] ${errors.message ? "border-destructive" : ""}`}
          />
          {errors.message && (
            <p id="message-error" className="text-sm text-destructive mt-1" role="alert" aria-live="polite">
              {errors.message}
            </p>
          )}
        </div>

        {/* Honeypot (caché) */}
        <div className="sr-only" aria-hidden="true">
          <Label htmlFor="website">Site web</Label>
          <Input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={(e) => handleChange("website", e.target.value)}
          />
        </div>

        {/* Bouton d'envoi */}
        <div>
          <Button
            type="submit"
            disabled={!buttonEnabled || cooldownRemaining > 0 || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi...
              </>
            ) : cooldownRemaining > 0 ? (
              `Attendez ${cooldownRemaining}s`
            ) : !buttonEnabled ? (
              "Chargement..."
            ) : (
              "Envoyer"
            )}
          </Button>
        </div>

        {submitStatus === "error" && (
          <Alert variant="destructive" role="alert" aria-live="polite">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Envoi impossible pour le moment. Réessayez plus tard ou passez par{" "}
              <a
                href="https://www.linkedin.com/in/etiennepogoda/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-destructive-foreground"
              >
                LinkedIn
              </a>
              .
            </AlertDescription>
          </Alert>
        )}
      </form>

      {/* Modale de confirmation */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent role="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description">
          <AlertDialogHeader>
            <AlertDialogTitle id="dialog-title">Vérifiez vos infos</AlertDialogTitle>
            <AlertDialogDescription id="dialog-description" className="space-y-3">
              <div>
                <span className="font-semibold text-foreground">Nom :</span>{" "}
                <span className="text-foreground">{formData.name}</span>
              </div>
              <div>
                <span className="font-semibold text-foreground">Contact :</span>{" "}
                <span className="text-foreground">{formData.contact}</span>
              </div>
              <div>
                <span className="font-semibold text-foreground">Message :</span>{" "}
                <span className="text-foreground">{formData.message.substring(0, 100)}...</span>
              </div>
              <p className="text-muted-foreground italic mt-4">
                Est-ce bien le bon moyen de vous joindre ?
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Modifier</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSend}>Confirmer l'envoi</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
