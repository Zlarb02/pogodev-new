import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Palette,
  Eye,
  FileText,
  UserCheck,
} from "lucide-react";
import { ImageModal } from "@/components/ui/image-modal";

export function WhyMe() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="why-me" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center mb-12 font-['Poppins'] text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Pourquoi moi ?
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Card 1 - Sur-mesure */}
          <motion.div
            className="bg-card p-6 rounded-xl shadow-sm border border-border"
            variants={itemVariants}
          >
            <div className="text-accent mb-4 flex row items-center gap-4">
              <Palette className="h-10 w-10" />
              <h3 className="text-xl font-semibold text-foreground mb-0">
                Sur-mesure
              </h3>
            </div>

            <p className="text-muted-foreground">
              Chaque projet a ses contraintes : budget, timing, compétences en interne.
              Je m'adapte à votre réalité, pas l'inverse. Pas de solution clé en main
              standardisée.
            </p>
          </motion.div>

          {/* Card 2 - Accessible */}
          <motion.div
            className="bg-card p-6 rounded-xl shadow-sm border border-border"
            variants={itemVariants}
          >
            <div className="text-accent mb-4 flex row items-center gap-4">
              <Eye className="h-10 w-10" />
              <h3 className="text-xl font-semibold mb-0 text-foreground">
                Accessible
              </h3>
            </div>
            <p className="text-muted-foreground">
              Accessible dans les deux sens : un site utilisable par tous (navigation clavier,
              lecteurs d'écran, contrastes WCAG AAA), et un code que vous pouvez comprendre
              si vous voulez mettre les mains dedans.
            </p>
          </motion.div>

          {/* Card 3 - Transparent */}
          <motion.div
            className="bg-card p-6 rounded-xl shadow-sm border border-border"
            variants={itemVariants}
          >
            <div className="text-accent mb-4 flex row items-center gap-4">
              <FileText className="h-10 w-10" />
              <h3 className="text-xl font-semibold mb-0 text-foreground">
                Transparent
              </h3>
            </div>
            <p className="text-muted-foreground mb-3">
              Pas de « magie ». Je vous explique ce que je fais, pourquoi, et combien ça coûte.
            </p>
            <p className="text-muted-foreground">
              Je travaille en code ouvert. Vous pouvez auditer et modifier le code.
            </p>
          </motion.div>

          {/* Card 4 - Indépendant */}
          <motion.div
            className="bg-card p-6 rounded-xl shadow-sm border border-border"
            variants={itemVariants}
          >
            <div className="text-accent mb-4 flex row items-center gap-4">
              <UserCheck className="h-10 w-10" />
              <h3 className="text-xl font-semibold mb-0 text-foreground">
                Indépendant
              </h3>
            </div>
            <p className="text-muted-foreground">
              Freelance = vous me parlez, je vous réponds. Pas de commercial, pas d'équipe commerciale, pas d'intermédiaire. Relation directe. Je reste ouvert aux propositions d'embauche.
            </p>
          </motion.div>
        </motion.div>

        {/* Section Des preuves - Lighthouse */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-center mb-6 font-['Poppins'] text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Des preuves ?
          </motion.h3>

          <motion.p
            className="text-center text-muted-foreground max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Des résultats concrets, mesurés avec Google Lighthouse.
          </motion.p>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Documentation Google - Code couleur */}
            <motion.div
              className="bg-card rounded-xl shadow-sm border border-border overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-3 text-foreground">
                  Comment lire les scores Lighthouse ?
                </h4>
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
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-3 text-foreground">
                  Résultats de pogodev.com
                </h4>
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
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            ✨ Cliquez sur les images pour les voir en détail • Ces scores reflètent l'application rigoureuse des principes d'éco-conception :
            optimisation des images, code léger, et bonnes pratiques web.
          </motion.p>

          <motion.div
            className="mt-8 max-w-4xl mx-auto bg-accent/10 border-2 border-accent/30 p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <p className="text-sm text-foreground mb-4">
              <span className="font-semibold">Vous voulez vérifier par vous-même ?</span> Vous pouvez tester les performances de mes projets avec{" "}
              <a href="https://developer.chrome.com/docs/lighthouse" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Lighthouse</a>, leur écoconception avec{" "}
              <a href="https://kastor.green" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Kastor</a>,{" "}
              <a href="https://ecograder.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Ecograder</a>,{" "}
              <a href="https://www.ecoindex.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Ecoindex</a>,{" "}
              <a href="https://www.websitecarbon.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Website Carbon</a>, et la sécurité avec{" "}
              <a href="https://observatory.mozilla.org" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Mozilla Observatory</a>.
            </p>
            <p className="text-sm text-foreground">
              Tous mes projets sont disponibles publiquement sur{" "}
              <a href="https://github.com/zlarb02" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium inline-flex items-center gap-1">
                GitHub
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                </svg>
              </a> — transparence totale, vous pouvez auditer le code.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
