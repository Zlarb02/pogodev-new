import * as React from "react";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Footer({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [showLegalModal, setShowLegalModal] = React.useState(false);

  return (
    <footer
      className={cn(
        "w-full border-t bg-background text-muted-foreground py-4 px-4",
        className
      )}
      {...props}
    >
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-xs">
          © {new Date().getFullYear()} Etienne Pogoda | Tous droits réservés
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-5">
          <a href="#about" className="text-xs hover:text-foreground">
            À propos
          </a>
          <a href="#services" className="text-xs hover:text-foreground">
            Services
          </a>
          <a href="#projects" className="text-xs hover:text-foreground">
            Projets
          </a>
          <a href="#contact" className="text-xs hover:text-foreground">
            Contact
          </a>
          <button
            onClick={() => setShowLegalModal(true)}
            className="text-xs hover:text-foreground bg-transparent border-none p-0 cursor-pointer"
          >
            Mentions légales
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/zlarb02"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-foreground"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/etiennepogoda"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-foreground"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:etienne@pogodev.com"
            aria-label="Email"
            className="hover:text-foreground"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>

      <Dialog open={showLegalModal} onOpenChange={setShowLegalModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mentions légales</DialogTitle>
            <DialogDescription>
              En vigueur au {new Date().toLocaleDateString("fr-FR")}
            </DialogDescription>
          </DialogHeader>

          <div className="text-sm text-muted-foreground space-y-4 mt-4">
            <section>
              <h3 className="text-sm font-medium text-foreground">
                1. Édition du site
              </h3>
              <p>
                Ce site est édité par Etienne Pogoda, développeur web freelance
                en micro-entreprise.
              </p>
              <p className="mt-2">
                <strong>Contact</strong> : etienne@pogodev.com
              </p>
            </section>

            <section>
              <h3 className="text-sm font-medium text-foreground">
                2. Hébergement
              </h3>
              <p>
                Ce site est hébergé par OVH SAS, 2 rue Kellermann, 59100
                Roubaix, France. RCS Lille Métropole 424 761 419 00045.
                Téléphone : +33 9 72 10 10 07.
              </p>
            </section>

            <section>
              <h3 className="text-sm font-medium text-foreground">
                3. Propriété intellectuelle
              </h3>
              <p>
                L'ensemble du contenu de ce site (structure, textes, logos,
                images, etc.) est protégé par le droit d'auteur et est la
                propriété exclusive d'Etienne Pogoda.
              </p>
            </section>

            <section>
              <h3 className="text-sm font-medium text-foreground">
                4. RGPD et données personnelles
              </h3>
              <p>
                Les informations recueillies via le formulaire de contact sont
                destinées à répondre à vos demandes et peuvent être transmises
                aux partenaires si nécessaire pour le traitement de votre
                demande.
              </p>
              <p className="mt-2">
                Conformément à la loi Informatique et Libertés et au RGPD, vous
                disposez d'un droit d'accès, de rectification, et de suppression
                de vos données. Pour exercer ce droit, contactez
                etienne@pogodev.com.
              </p>
            </section>

            <section>
              <h3 className="text-sm font-medium text-foreground">
                5. Cookies
              </h3>
              <p>
                Ce site utilise des cookies techniques nécessaires à son bon
                fonctionnement. Aucun cookie de suivi ou publicitaire n'est
                utilisé.
              </p>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
