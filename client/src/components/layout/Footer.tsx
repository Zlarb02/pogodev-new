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
  const [is404Page, setIs404Page] = React.useState(false);

  React.useEffect(() => {
    // Vérifier si nous sommes sur la page 404
    const redirect = sessionStorage.getItem("redirect");
    const notFoundUrl = sessionStorage.getItem("notFoundUrl");

    if (redirect || notFoundUrl) {
      setIs404Page(true);
    }
  }, []);

  // Ne pas afficher le footer sur la page 404
  if (is404Page) {
    return null;
  }

  // Fonction pour gérer les clics sur les liens en tenant compte de la page 404
  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    event.preventDefault();

    // Si nous sommes sur la page 404, nous devons d'abord retourner à l'accueil
    if (is404Page) {
      const basePath = window.location.hostname === "pogodev.com" ? "" : "/";
      window.location.href = `${basePath}/#${sectionId}`;
      return;
    }

    // Sinon, faire défiler en douceur jusqu'à la section
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

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
          <a
            href="#about"
            className="text-xs hover:text-foreground"
            onClick={(e) => handleNavClick(e, "about")}
          >
            À propos
          </a>
          <a
            href="#services"
            className="text-xs hover:text-foreground"
            onClick={(e) => handleNavClick(e, "services")}
          >
            Services
          </a>
          <a
            href="#projects"
            className="text-xs hover:text-foreground"
            onClick={(e) => handleNavClick(e, "projects")}
          >
            Projets
          </a>
          <a
            href="#contact"
            className="text-xs hover:text-foreground"
            onClick={(e) => handleNavClick(e, "contact")}
          >
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
                Ce site est édité par Etienne Pogoda, développeur web indépendant
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
                Ce site est hébergé par GitHub Pages, un service de GitHub Inc.,
                88 Colin P. Kelly Jr. Street, San Francisco, CA 94107,
                États-Unis.
              </p>
              <p className="mt-2">
                Le nom de domaine est géré par o2switch, SARL au capital de
                100000€, RCS Clermont-Ferrand 510 909 807 00024, 222-224
                Boulevard Gustave Flaubert, 63000 Clermont-Ferrand, France.
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
              <p className="mt-2">
                Toute reproduction, distribution ou utilisation sans
                autorisation écrite préalable est strictement interdite et
                constituerait une contrefaçon sanctionnée par les articles
                L.335-2 et suivants du Code de la propriété intellectuelle.
              </p>
            </section>

            <section>
              <h3 className="text-sm font-medium text-foreground">
                4. RGPD et données personnelles
              </h3>
              <p>
                Les informations recueillies via le formulaire de contact sont
                destinées exclusivement à répondre à vos demandes et ne sont
                transmises à aucun tiers, sauf obligation légale.
              </p>
              <p className="mt-2">
                Conformément au Règlement Général sur la Protection des Données
                (RGPD) et à la loi Informatique et Libertés, vous disposez d'un
                droit d'accès, de rectification, de limitation, de portabilité
                et de suppression de vos données. Pour exercer ce droit,
                contactez etienne@pogodev.com.
              </p>
            </section>

            <section>
              <h3 className="text-sm font-medium text-foreground">
                5. Cookies
              </h3>
              <p>
                Ce site utilise uniquement des cookies techniques nécessaires à
                son bon fonctionnement. Aucun cookie de suivi, publicitaire ou
                d'analyse de comportement n'est utilisé.
              </p>
            </section>

            <section>
              <h3 className="text-sm font-medium text-foreground">
                6. Limitation de responsabilité
              </h3>
              <p>
                Etienne Pogoda s'efforce d'assurer l'exactitude des informations
                présentes sur ce site mais ne peut garantir qu'elles soient
                complètes, précises, exhaustives ou sans erreur. Etienne Pogoda
                décline toute responsabilité concernant les dommages directs ou
                indirects résultant de l'accès ou de l'utilisation de ce site.
              </p>
              <p className="mt-2">
                Les liens vers d'autres sites ne sont fournis qu'à titre
                informatif et n'impliquent aucune approbation de leur contenu.
              </p>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
