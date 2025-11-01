import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ChevronDown, ExternalLink } from "lucide-react";

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

    // Lazy-load Three.js animation only if motion is allowed
    if (!prefersReducedMotion && threeContainerRef.current && !threeAnimationRef.current) {
      const containerId = "three-container";
      threeContainerRef.current.id = containerId;

      // Dynamic import for Three.js animation
      import("@/lib/three-animation").then(({ ThreeAnimation }) => {
        if (threeContainerRef.current && !threeAnimationRef.current) {
          threeAnimationRef.current = new ThreeAnimation({
            containerId,
            particleCount: 150,
            particleSize: 0.05,
            particleColor: "#2c9e5e",
            lineColor: "#34d8ac",
            lineOpacity: 0.2,
          });

          threeAnimationRef.current.start();
        }
      });
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
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
            Un site web, c'est comme une maison : mieux vaut qu'elle soit solide
            et facile à entretenir
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground/80 italic mb-8"
            variants={itemVariants}
          >
            Et comme pour une maison bien isolée, ce qui est bon pour la planète finit par être bon pour le porte-monnaie.
          </motion.p>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6"
            variants={itemVariants}
          >
            Je crée des sites et applications pensés pour durer : rapides à
            charger, simples à héberger, sans complexité inutile.
          </motion.p>

          <motion.p
            className="text-base md:text-lg text-muted-foreground mb-6"
            variants={itemVariants}
          >
            <span className="text-foreground font-medium">Ma valeur ajoutée</span>
            &nbsp;: vous expliquer clairement les choix techniques, vous rendre
            autonome, et vous livrer un projet que vous pourrez faire évoluer
            sereinement — avec ou sans moi.
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
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/etiennepogoda"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
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
