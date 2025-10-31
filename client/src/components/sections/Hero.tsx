import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ThreeAnimation } from "@/lib/three-animation";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ChevronDown } from "lucide-react";

export function Hero() {
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const threeAnimationRef = useRef<ThreeAnimation | null>(null);

  useEffect(() => {
    // Initialize Three.js animation
    if (threeContainerRef.current && !threeAnimationRef.current) {
      const containerId = "three-container";
      threeContainerRef.current.id = containerId;

      threeAnimationRef.current = new ThreeAnimation({
        containerId,
        particleCount: 150,
        particleSize: 0.05,
        particleColor: "#2c9e5e", // Vert naturel pour correspondre au thème
        lineColor: "#34d8ac", // Vert vif pour les connections
        lineOpacity: 0.2,
      });

      threeAnimationRef.current.start();
    }

    // Cleanup
    return () => {
      if (threeAnimationRef.current) {
        threeAnimationRef.current.stop();
        threeAnimationRef.current = null;
      }
    };
  }, []);

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
            className="text-3xl md:text-4xl lg:text-5xl lg:leading-tight font-bold mb-8 font-['Poppins'] text-foreground"
            variants={itemVariants}
          >
            Un site web, c'est comme une maison : mieux vaut qu'elle soit solide
            et facile à entretenir
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6"
            variants={itemVariants}
          >
            Je crée des sites et applications pensés pour durer : rapides à
            charger, simples à héberger, sans complexité inutile.
          </motion.p>
          <motion.p
            className="text-base md:text-lg text-muted-foreground mb-4"
            variants={itemVariants}
          >
            <span className="text-foreground font-medium">Ma valeur ajoutée</span>
            &nbsp;: vous expliquer clairement les choix techniques, vous rendre
            autonome, et vous livrer un projet que vous pourrez faire évoluer
            sereinement — avec ou sans moi.
          </motion.p>
          <motion.p
            className="text-base md:text-lg text-accent mb-8"
            variants={itemVariants}
          >
            Projet de référence&nbsp;:{" "}
            <a
              href="https://alto-lille.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold"
            >
              Alto Lille
            </a>
            , boutique e-commerce sobre et performante.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            variants={itemVariants}
          >
            <Button asChild size="lg" className="group">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Discutons de votre projet
                <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
