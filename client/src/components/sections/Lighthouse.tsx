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
          Des preuves ?
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
          {/* Documentation Google - Code couleur */}
          <motion.div
            className="bg-card rounded-xl shadow-sm border border-border overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Comment lire les scores Lighthouse ?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Le code couleur expliqué par Google
              </p>
            </div>
            <ImageModal
              src="/images/lighthouse-score-guide.webp"
              alt="Guide des scores Lighthouse - Code couleur : 0-49 rouge (faible), 50-89 orange (amélioration nécessaire), 90-100 vert (bon)"
            >
              <div className="aspect-[4/3] lg:aspect-video bg-muted cursor-pointer hover:bg-muted/80 transition-colors duration-300">
                <picture>
                  <source srcSet="/images/lighthouse-score-guide.webp" type="image/webp" />
                  <img
                    src="/images/lighthouse-score-guide.png"
                    alt="Guide des scores Lighthouse"
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width="1016"
                    height="553"
                  />
                </picture>
              </div>
            </ImageModal>
            <div className="p-6 bg-accent/5 border-t border-border">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li><span className="font-semibold text-red-600">0 à 49</span> (rouge) : Faible - nécessite des améliorations urgentes</li>
                <li><span className="font-semibold text-orange-600">50 à 89</span> (orange) : Amélioration nécessaire</li>
                <li><span className="font-semibold text-green-600">90 à 100</span> (vert) : Bon - respecte les bonnes pratiques</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-4 italic">
                Un score parfait de 100 est extrêmement difficile et n'est pas attendu. L'objectif est d'atteindre la zone verte (90+).
              </p>
            </div>
          </motion.div>

          {/* Scores Lighthouse de pogodev.com */}
          <motion.div
            className="bg-card rounded-xl shadow-sm border border-border overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Résultats de pogodev.com
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Les 4 piliers mesurés par Lighthouse
              </p>
            </div>
            <ImageModal
              src="/images/pogodev-lighthouse-results.webp"
              alt="Scores Lighthouse de pogodev.com - Performance 86, Accessibilité 100, Bonnes pratiques 100, SEO 100"
            >
              <div className="aspect-[4/3] lg:aspect-video bg-muted cursor-pointer hover:bg-muted/80 transition-colors duration-300">
                <picture>
                  <source srcSet="/images/pogodev-lighthouse-results.webp" type="image/webp" />
                  <img
                    src="/images/pogodev-lighthouse-results.png"
                    alt="Scores Lighthouse de pogodev.com"
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width="2019"
                    height="1215"
                  />
                </picture>
              </div>
            </ImageModal>
            <div className="p-6 bg-accent/5 border-t border-border">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li><span className="font-semibold text-orange-600">Performance : 86/100</span> - Bon résultat, des optimisations sont encore possibles</li>
                <li><span className="font-semibold text-green-600">Accessibilité : 100/100</span> - Excellent ! Le site est accessible à tous</li>
                <li><span className="font-semibold text-green-600">Bonnes pratiques : 100/100</span> - Parfait ! Respect total des standards web</li>
                <li><span className="font-semibold text-green-600">SEO : 100/100</span> - Optimal pour le référencement naturel (SEO = Search Engine Optimization = faire en sorte que votre site soit bien positionné dans les résultats de recherche Google)</li>
              </ul>
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
