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
          className="text-2xl md:text-3xl font-bold text-center mb-4 font-['Poppins'] text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          La qualité, mesurée
        </motion.h2>

        <motion.p
          className="text-center text-muted-foreground max-w-3xl mx-auto mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Google Lighthouse analyse automatiquement la qualité des sites web. Voici comment ce site se comporte.
        </motion.p>

        {/* Explication simple de Lighthouse */}
        <motion.div
          className="max-w-2xl mx-auto mb-12 bg-accent/10 border-2 border-accent/30 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            🔍 Qu'est-ce que Lighthouse ?
          </h3>
          <p className="text-muted-foreground mb-3">
            C'est un outil gratuit de Google qui note les sites web sur 4 critères essentiels.
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Le code couleur :</span> 🔴 Rouge (0-49) = problèmes importants • 
            🟠 Orange (50-89) = améliorations possibles • 
            🟢 Vert (90-100) = excellent
          </p>
        </motion.div>

        {/* Scores en grand et clair */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-card rounded-2xl shadow-lg border-2 border-border p-8">
            <h3 className="text-xl font-semibold mb-6 text-center text-foreground">
              Les scores de ce site
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">86</div>
                <div className="text-sm font-medium text-foreground mb-1">Performance</div>
                <div className="text-xs text-muted-foreground">Rapide ⚡</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">100</div>
                <div className="text-sm font-medium text-foreground mb-1">Accessibilité</div>
                <div className="text-xs text-muted-foreground">Pour tous ♿</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">100</div>
                <div className="text-sm font-medium text-foreground mb-1">Bonnes pratiques</div>
                <div className="text-xs text-muted-foreground">Sécurisé 🔒</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">100</div>
                <div className="text-sm font-medium text-foreground mb-1">SEO</div>
                <div className="text-xs text-muted-foreground">Visible 👀</div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Ces scores montrent que le site est rapide, accessible à tous, sécurisé et bien référencé sur Google.
              </p>
              <ImageModal
                src="/images/pogodev-lighthouse-results.webp"
                alt="Capture d'écran détaillée des scores Lighthouse de pogodev.com"
              >
                <button className="text-sm text-accent hover:underline">
                  Voir la capture d'écran complète →
                </button>
              </ImageModal>
            </div>
          </div>
        </motion.div>

        {/* Documentation en option */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <details className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
            <summary className="p-6 cursor-pointer hover:bg-accent/5 transition-colors">
              <h3 className="text-lg font-semibold inline text-foreground">
                📚 En savoir plus sur Lighthouse et comment lire ces scores
              </h3>
            </summary>
            <div className="p-6 pt-0 border-t border-border">
              <p className="text-muted-foreground mb-4">
                Google Lighthouse est un outil d'audit automatique qui évalue la qualité des pages web selon 4 critères :
              </p>
              <ul className="space-y-3 mb-6 text-sm text-muted-foreground">
                <li><span className="font-semibold text-foreground">⚡ Performance</span> : Vitesse de chargement et fluidité</li>
                <li><span className="font-semibold text-foreground">♿ Accessibilité</span> : Utilisable par tous, y compris les personnes en situation de handicap</li>
                <li><span className="font-semibold text-foreground">🔒 Bonnes pratiques</span> : Sécurité, standards web modernes</li>
                <li><span className="font-semibold text-foreground">👀 SEO</span> : Optimisation pour les moteurs de recherche (Google, etc.)</li>
              </ul>
              <ImageModal
                src="/images/lighthouse-score-guide.webp"
                alt="Documentation officielle Google expliquant le code couleur Lighthouse"
              >
                <div className="aspect-video bg-card/50 rounded-lg cursor-pointer hover:bg-card/70 transition-colors border border-border overflow-hidden">
                  <picture>
                    <source srcSet="/images/lighthouse-score-guide.webp" type="image/webp" />
                    <img
                      src="/images/lighthouse-score-guide.png"
                      alt="Guide des scores Lighthouse"
                      className="w-full h-full object-contain p-4"
                      loading="lazy"
                      width="1016"
                      height="553"
                    />
                  </picture>
                </div>
              </ImageModal>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Cliquez sur l'image pour voir la documentation complète de Google
              </p>
            </div>
          </details>
        </motion.div>

        <motion.p
          className="text-center text-muted-foreground max-w-3xl mx-auto mt-8 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Ces scores reflètent l'éco-conception : images optimisées, code léger, bonnes pratiques web.
        </motion.p>

      </div>
    </section>
  );
}
