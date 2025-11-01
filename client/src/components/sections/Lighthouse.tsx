import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ImageModal } from "@/components/ui/image-modal";

export function Lighthouse() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="lighthouse" ref={sectionRef} className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center mb-6 font-['Poppins'] text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Performance mesurée : pogodev.com
        </motion.h2>

        <motion.p
          className="text-center text-muted-foreground max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Des résultats concrets, mesurés avec Google Lighthouse.
        </motion.p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scores Lighthouse */}
          <motion.div
            className="bg-card rounded-xl shadow-sm border border-border overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Scores Lighthouse de pogodev.com
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Performance, Accessibilité, Bonnes pratiques, SEO
              </p>
            </div>
            <ImageModal
              src="/images/lighthouse-scores.avif"
              alt="Scores Lighthouse de pogodev.com - Performance 100, Accessibilité 100, Bonnes pratiques 100, SEO 100"
            >
              <div className="aspect-[4/3] lg:aspect-video bg-muted cursor-pointer hover:bg-muted/80 transition-colors duration-300">
                <picture>
                  <source
                    srcSet="/images/lighthouse-scores.avif"
                    type="image/avif"
                  />
                  <source
                    srcSet="/images/lighthouse-scores.webp"
                    type="image/webp"
                  />
                  <img
                    src="/images/lighthouse-scores.jpg"
                    alt="Scores Lighthouse de pogodev.com"
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width="3014"
                    height="1814"
                  />
                </picture>
              </div>
            </ImageModal>
          </motion.div>

          {/* Documentation Google */}
          <motion.div
            className="bg-card rounded-xl shadow-sm border border-border overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Ce que dit Google
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Documentation officielle sur les scores de performance
              </p>
            </div>
            <ImageModal
              src="/images/google-lighthouse-doc.avif"
              alt="Documentation Google Lighthouse - Explication des scores de performance et recommandations"
            >
              <div className="aspect-[4/3] lg:aspect-video bg-muted cursor-pointer hover:bg-muted/80 transition-colors duration-300">
                <picture>
                  <source
                    srcSet="/images/google-lighthouse-doc.avif"
                    type="image/avif"
                  />
                  <source
                    srcSet="/images/google-lighthouse-doc.webp"
                    type="image/webp"
                  />
                  <img
                    src="/images/google-lighthouse-doc.jpg"
                    alt="Documentation Google Lighthouse sur les scores"
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width="1516"
                    height="830"
                  />
                </picture>
              </div>
            </ImageModal>
            <div className="p-6 bg-accent/5 border-t border-border">
              <p className="text-sm text-muted-foreground italic">
                "Pour offrir une expérience utilisateur de qualité, les sites doivent s'efforcer
                d'obtenir un bon score (90-100). Obtenir un score "parfait" de 100 est extrêmement
                difficile et n'est pas attendu."
              </p>
              <a
                href="https://developer.chrome.com/docs/lighthouse/performance/performance-scoring?hl=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline text-sm mt-2 inline-block"
              >
                → Lire la documentation complète
              </a>
            </div>
          </motion.div>
        </div>

        <motion.p
          className="text-center text-muted-foreground max-w-3xl mx-auto mt-8 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          ✨ Cliquez sur les images pour les voir en détail • Ces scores reflètent l'application rigoureuse des principes d'éco-conception :
          optimisation des images, code léger, et bonnes pratiques web.
        </motion.p>

      </div>
    </section>
  );
}
