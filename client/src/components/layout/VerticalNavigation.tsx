import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { User, Star, Briefcase, FolderOpen, ListChecks, Mail } from "lucide-react";

// Sections à inclure dans la navigation verticale
const navItems = [
  { id: "about", label: "À propos", icon: User },
  { id: "why-me", label: "Pourquoi moi", icon: Star },
  { id: "services", label: "Mon offre", icon: Briefcase },
  { id: "projects", label: "Projets", icon: FolderOpen },
  { id: "process", label: "Processus", icon: ListChecks },
  { id: "contact", label: "Contact", icon: Mail },
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
      // Réduire le throttle pour mobile (50ms au lieu de 100ms)
      const now = Date.now();
      if (now - lastChangeTime < 50) return;

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

        // Donner plus de poids aux sections près du haut de l'écran (meilleur pour mobile)
        const topDistance = Math.abs(rect.top);
        const topBoost = topDistance < windowHeight * 0.3 ? 1.5 : 1;
        const score = visibility * topBoost;

        if (score > maxVisibility) {
          maxVisibility = score;
          visibleSection = id;
        }
      });

      // Seuil plus bas pour mobile pour réagir plus vite
      if (maxVisibility > 0.1 && visibleSection !== activeSection) {
        setActiveSection(visibleSection);
        setLastChangeTime(now);
      }

      // Cacher la navigation sur la section Hero
      const heroElement = document.getElementById("hero");
      // Récupérer l'élément footer
      const footerElement = document.querySelector("footer");

      if (heroElement) {
        const heroRect = heroElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Vérifier si le footer est visible
        let footerVisible = false;
        if (footerElement) {
          const footerRect = footerElement.getBoundingClientRect();
          // Le footer est considéré comme visible si sa partie supérieure entre dans la vue
          footerVisible = footerRect.top < windowHeight;
        }

        // Montrer la navigation seulement si on n'est pas sur le hero ET pas sur le footer
        setIsVisible(heroRect.bottom <= windowHeight * 0.6 && !footerVisible);
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
        "fixed z-40 inset-x-0 mx-auto px-2",
        isLandscape ? "bottom-2 lg:hidden" : "bottom-6 md:hidden"
      )}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* Barre de navigation avec icônes et label intégré */}
      <div className="relative flex items-center justify-between mx-auto max-w-lg backdrop-blur-xl border-2 border-border/50 shadow-xl bg-card/95 rounded-full py-2.5 px-4 gap-1">
        
        {navItems.map(({ id, label, icon: Icon }, index) => (
          <motion.a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById(id)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className={cn(
              "relative flex items-center justify-center gap-2 rounded-full transition-all duration-300 cursor-pointer",
              activeSection === id 
                ? "px-3 py-2 bg-accent/20 border-2 border-accent/50" 
                : "p-2 hover:bg-accent/10 hover:scale-110"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.05,
              type: "spring", 
              stiffness: 400, 
              damping: 25 
            }}
            whileTap={{ scale: 0.95 }}
            layout
            aria-label={label}
          >
            {/* Icône avec animation au survol */}
            <motion.div
              animate={activeSection === id ? {
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1.1, 1.1, 1]
              } : {}}
              transition={{ 
                duration: 0.5,
                times: [0, 0.2, 0.5, 0.8, 1]
              }}
            >
              <Icon 
                className={cn(
                  "transition-all duration-300",
                  activeSection === id
                    ? "h-5 w-5 text-accent"
                    : "h-5 w-5 text-muted-foreground"
                )}
              />
            </motion.div>

            {/* Texte visible seulement pour la section active */}
            <AnimatePresence>
              {activeSection === id && (
                <motion.span
                  initial={{ opacity: 0, width: 0, x: -10 }}
                  animate={{ opacity: 1, width: "auto", x: 0 }}
                  exit={{ opacity: 0, width: 0, x: -10 }}
                  transition={{ 
                    duration: 0.3,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                  className="text-sm font-semibold text-accent whitespace-nowrap overflow-hidden"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.a>
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
