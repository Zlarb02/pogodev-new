import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Sections à inclure dans la navigation verticale
const navItems = [
  { id: "about", label: "À propos" },
  { id: "why-me", label: "Pourquoi moi" },
  { id: "services", label: "Mon offre" },
  { id: "projects", label: "Projets" },
  { id: "process", label: "Processus" },
  { id: "contact", label: "Contact" },
];

export function VerticalNavigation() {
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isLandscape, setIsLandscape] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  // Ajout d'un délai pour éviter les changements trop rapides de section active
  const [lastChangeTime, setLastChangeTime] = useState(0);

  useEffect(() => {
    // Fonction pour détecter l'orientation paysage
    const checkOrientation = () => {
      setIsLandscape(
        window.innerWidth > window.innerHeight && window.innerWidth < 1024
      );
    };

    // Vérification initiale
    checkOrientation();

    // Écouter les changements d'orientation
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    // Remplacer les IntersectionObservers par un mécanisme plus stable
    // basé sur la position des sections dans la fenêtre
    const handleScroll = () => {
      // Ne pas traiter les événements de défilement trop fréquemment
      const now = Date.now();
      if (now - lastChangeTime < 100) return;

      // Trouver la section la plus visible
      let maxVisibility = 0;
      let visibleSection = "";

      navItems.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculer la visibilité de la section par rapport à la fenêtre
        const visibleHeight =
          Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visibility = visibleHeight > 0 ? visibleHeight / rect.height : 0;

        // Donner plus de poids aux sections près du milieu de l'écran
        const middleBoost =
          1 -
          (2 * Math.abs((rect.top + rect.bottom) / 2 - windowHeight / 2)) /
            windowHeight;
        const score = visibility * (1 + Math.max(0, middleBoost));

        if (score > maxVisibility) {
          maxVisibility = score;
          visibleSection = id;
        }
      });

      // Ne mettre à jour la section active que si une section est suffisamment visible
      if (maxVisibility > 0.15 && visibleSection !== activeSection) {
        setActiveSection(visibleSection);
        setLastChangeTime(now);
      }

      // Cacher la navigation sur la section Hero
      const heroElement = document.getElementById("hero");
      if (heroElement) {
        const heroRect = heroElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        setIsVisible(heroRect.bottom <= windowHeight * 0.6);
      }
    };

    // Détection initiale
    const checkInitialSection = () => {
      handleScroll();
      setInitialCheckDone(true);

      // Délai pour s'assurer que la navigation est visible après le chargement
      setTimeout(() => {
        handleScroll();
      }, 500);
    };

    checkInitialSection();

    // Écouter les événements de défilement
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Nettoyage
    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [activeSection, lastChangeTime]);

  // Attendre que la vérification initiale soit terminée avant de rendre quoi que ce soit
  if (!initialCheckDone) return null;

  // Navigation mobile standard (barre horizontale en bas de l'écran)
  const MobileNavigation = (
    <motion.div
      className={cn(
        "fixed z-40 inset-x-0 mx-auto",
        isLandscape ? "bottom-2 lg:hidden" : "bottom-4 md:hidden"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className={cn(
          "flex items-center justify-center mx-auto max-w-fit backdrop-blur-md border border-border shadow-lg",
          isLandscape
            ? "bg-card/95 rounded-lg gap-3 py-1.5 px-3"
            : "bg-card/90 rounded-full gap-2 py-2 px-4"
        )}
      >
        {navItems.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById(id)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className={cn(
              "relative flex items-center justify-center",
              isLandscape ? "gap-1.5" : ""
            )}
          >
            <div
              className={cn(
                "rounded-full transition-all duration-300",
                isLandscape ? "h-2 w-2" : "h-3 w-3",
                activeSection === id
                  ? "bg-accent shadow-md shadow-accent/20"
                  : "bg-muted-foreground/30"
              )}
            />

            {/* Afficher les textes en mode paysage */}
            {isLandscape && (
              <span
                className={cn(
                  "text-xs font-medium whitespace-nowrap",
                  activeSection === id ? "text-accent" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            )}

            {activeSection === id && (
              <motion.div
                layoutId="mobileActiveIndicator"
                className={cn(
                  "absolute rounded-full bg-accent/20",
                  isLandscape ? "-inset-0.5" : "-inset-1"
                )}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </a>
        ))}
      </div>
    </motion.div>
  );

  // Navigation desktop (barre verticale à droite)
  const DesktopNavigation = (
    <motion.div
      className={cn(
        "fixed z-40 flex flex-col items-center h-[80vh] my-auto",
        // Ajuster la position verticale selon la taille d'écran, occuper plus de hauteur
        isLandscape
          ? "hidden lg:flex lg:right-8 lg:top-[10%] lg:top-[18%]"
          : "hidden md:flex md:right-8 md:top-[10%] md:top-[18%]"
      )}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      <div className="relative flex flex-col items-center justify-between h-full gap-0 py-8 px-3 rounded-full bg-card/80 backdrop-blur-md border border-border shadow-lg">
        {/* Ligne connectant les points */}
        <div className="absolute left-1/2 -translate-x-1/2 top-8 bottom-8 -z-10 w-[1px] bg-gradient-to-b from-transparent via-border to-transparent" />

        {navItems.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className="relative p-1.5 group z-10 flex items-center justify-center"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById(id)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            onMouseEnter={() => setHoveredItem(id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div
              className={cn(
                "h-4 w-4 rounded-full transition-all duration-300 ease-in-out hover:scale-125",
                activeSection === id
                  ? "bg-accent shadow-lg shadow-accent/30"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/70"
              )}
            />

            <AnimatePresence>
              {(hoveredItem === id || activeSection === id) && (
                <motion.span
                  initial={{ opacity: 0, x: -10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -5, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "absolute right-full mr-3 py-1.5 px-4 rounded-md text-sm font-medium whitespace-nowrap",
                    "bg-card border border-border shadow-md",
                    "backdrop-blur-md z-20",
                    activeSection === id
                      ? "text-accent border-accent/40"
                      : "text-foreground"
                  )}
                >
                  {label}
                  {activeSection === id && (
                    <motion.div
                      className="absolute inset-0 rounded-md bg-accent/5"
                      layoutId="activeNavLabelHighlight"
                    />
                  )}
                </motion.span>
              )}
            </AnimatePresence>
          </a>
        ))}

        {/* Indicateur animé de la section active */}
        <motion.div
          className="absolute mt-10 left-1/2 w-6 h-6 rounded-full bg-accent/10 z-0 flex items-center justify-center"
          layoutId="activeNavIndicator"
          initial={false}
          animate={{
            // Calculer la position Y en fonction de la position relative dans la liste des items
            top: `calc(${
              navItems.findIndex((item) => item.id === activeSection) /
              (navItems.length - 1)
            } * (95% - 4rem))`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            bounce: 0.2,
          }}
        >
          <motion.div
            className="w-4 h-4 rounded-full bg-accent/20"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
          {/* Effet de pulsation extérieure - Corrigé pour être parfaitement centré */}
          <motion.div
            className="absolute w-8 h-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 3,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );

  // Rendu conditionnel selon la taille d'écran
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <>
          {MobileNavigation}
          {DesktopNavigation}
        </>
      )}
    </AnimatePresence>
  );
}
