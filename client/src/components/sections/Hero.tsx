import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, Github as GithubIcon, Linkedin as LinkedinIcon, ChevronDown, ExternalLink } from "lucide-react";

export function Hero() {
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const threeAnimationRef = useRef<any | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Lazy-load Three.js uniquement quand visible (Intersection Observer pour meilleures performances)
    if (!prefersReducedMotion && threeContainerRef.current && !threeAnimationRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !threeAnimationRef.current) {
              const containerId = "three-container";
              if (threeContainerRef.current) {
                threeContainerRef.current.id = containerId;

                // Chargement différé de Three.js pour améliorer FCP/LCP
                setTimeout(() => {
                  import("@/lib/three-animation").then(({ ThreeAnimation }) => {
                    if (threeContainerRef.current && !threeAnimationRef.current) {
                      threeAnimationRef.current = new ThreeAnimation({
                        containerId,
                        particleCount: 100,
                        particleSize: 0.05,
                        particleColor: "#2c9e5e",
                        lineColor: "#34d8ac",
                        lineOpacity: 0.15,
                      });

                      threeAnimationRef.current.start();
                    }
                  });
                }, 200); // Délai pour laisser le rendu initial se terminer

              // Déconnecter l'observer une fois chargé
              observer.disconnect();
              }
            }
          });
        },
        { threshold: 0.1 } // Charge quand 10% du Hero est visible
      );

      observer.observe(threeContainerRef.current);

      return () => {
        observer.disconnect();
        mediaQuery.removeEventListener("change", handleChange);
        if (threeAnimationRef.current) {
          threeAnimationRef.current.stop();
          threeAnimationRef.current = null;
        }
      };
    }

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      if (threeAnimationRef.current) {
        threeAnimationRef.current.stop();
        threeAnimationRef.current = null;
      }
    };
  }, [prefersReducedMotion]);

  // Optimisation des variants pour réduire les re-renders
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1, // Réduit pour améliorer FCP
        staggerChildren: 0.1, // Réduit pour améliorer FCP
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 }, // Réduit l'effet pour la performance
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }, // Réduit la durée
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16"
    >
      <div ref={threeContainerRef} className="absolute inset-0 z-0"></div>
      <div className="container mx-auto px-4 py-16 z-10 relative">
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl lg:leading-tight font-bold mb-6 font-['Poppins'] text-foreground"
            variants={itemVariants}
          >
            Le web, c'est ma maison. Je le construis pour qu'il soit solide
            et facile à entretenir
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground/80 italic mb-8"
            variants={itemVariants}
          >
            Bonus : consomme peu, dure longtemps.
          </motion.p>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-foreground font-medium mb-6"
            variants={itemVariants}
          >
            Je vous explique clairement les choix techniques, vous rends autonome, et vous livre un projet que vous pourrez faire évoluer sereinement — avec ou sans moi.
          </motion.p>

          <motion.p
            className="text-base md:text-lg text-muted-foreground mb-6"
            variants={itemVariants}
          >
            Pourquoi solide et facile à entretenir ? Parce qu'un site bien construit résiste au temps et aux attaques, et vous coûte moins de temps, d'énergie et d'argent à maintenir. Sans dépendre de personne.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8"
            variants={itemVariants}
          >
            <Button asChild size="lg" className="group">
              <a
                href="https://alto-lille.fr"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visiter Alto-Lille.fr, mon dernier projet
                <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            <div className="flex space-x-4">
              <a
                href="mailto:etienne@pogodev.com"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/zlarb02"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/etiennepogoda"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-6 w-6" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <a
          href="#about"
          className="text-muted-foreground flex flex-col items-center animate-bounce"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="mb-2">Découvrir</span>
          <ChevronDown className="h-6 w-6" />
        </a>
      </motion.div>
    </section>
  );
}
