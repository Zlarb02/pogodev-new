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
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

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
    <section id="why-me" ref={sectionRef} className="py-20 bg-muted/30">
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
              Je construis avec vous, pas pour vous. On part de <span className="text-purple-400">votre réalité</span> : votre budget, vos délais, vos compétences.
              Pas de formule standardisée qui s'impose à vous.
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
            <p className="text-muted-foreground mb-3">
              Un site <span className="text-blue-400">utilisable par tous</span> : personnes en situation de handicap, au clavier, lecteurs d'écran, contrastes élevés. Navigation et configurations limpides.
            </p>
            <p className="text-muted-foreground">
              Et aussi : un code compréhensible si vous voulez y mettre les mains.
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
              Je travaille en <span className="text-cyan-400">code ouvert</span>. Vous pouvez auditer et modifier le code.
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
              Indépendant = vous me parlez, je vous réponds. Pas de commercial, pas d'équipe commerciale, pas d'intermédiaire. <span className="text-green-400">Relation directe</span>. Je reste ouvert aux propositions d'embauche.
            </p>
          </motion.div>
        </motion.div>

        {/* Section La qualité, mesurée - Lighthouse */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-center mb-4 font-['Poppins'] text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            La qualité, mesurée
          </motion.h3>

          <motion.p
            className="text-center text-muted-foreground max-w-3xl mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Exemple avec Google Lighthouse qui analyse la qualité des sites web. Voici comment ce site se comporte.
          </motion.p>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Scores Lighthouse de pogodev.com - EN PREMIER */}
            <motion.div
              className="bg-card rounded-xl shadow-sm border border-border overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
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
              <div className="p-6 bg-gradient-to-br from-accent/5 to-transparent">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 group">
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/5 flex items-center justify-center border border-orange-500/20 group-hover:border-orange-500/40 transition-colors">
                      <span className="text-2xl font-bold text-orange-600">86</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-foreground mb-1">Performance</h5>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Vitesse de chargement et fluidité. Un bon score, avec une marge d'amélioration.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group">
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/5 flex items-center justify-center border border-green-500/20 group-hover:border-green-500/40 transition-colors">
                      <span className="text-2xl font-bold text-green-600">100</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-foreground mb-1">Accessibilité</h5>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Utilisable par tous, y compris les personnes en situation de handicap (lecteurs d'écran, navigation clavier...).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group">
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/5 flex items-center justify-center border border-green-500/20 group-hover:border-green-500/40 transition-colors">
                      <span className="text-2xl font-bold text-green-600">100</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-foreground mb-1">Bonnes pratiques</h5>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Respect des standards modernes du web : sécurité, compatibilité, qualité du code.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group">
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/5 flex items-center justify-center border border-green-500/20 group-hover:border-green-500/40 transition-colors">
                      <span className="text-2xl font-bold text-green-600">100</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-foreground mb-1">SEO</h5>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Optimisé pour être bien référencé sur Google et les autres moteurs de recherche.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Documentation Google - Code couleur - EN SECOND */}
            <motion.div
              className="bg-card rounded-xl shadow-sm border border-border overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-3 text-foreground">
                  Comment lire les scores ?
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
              <div className="p-6 bg-gradient-to-br from-accent/5 to-transparent">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-red-500/10 to-red-600/5 flex items-center justify-center border border-red-500/20 group-hover:border-red-500/40 transition-colors">
                      <span className="text-sm font-bold text-red-600">0-49</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <span className="font-medium text-foreground">Rouge</span> — Le site a besoin d'améliorations importantes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/5 flex items-center justify-center border border-orange-500/20 group-hover:border-orange-500/40 transition-colors">
                      <span className="text-sm font-bold text-orange-600">50-89</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <span className="font-medium text-foreground">Orange</span> — Correct, mais peut être optimisé
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/5 flex items-center justify-center border border-green-500/20 group-hover:border-green-500/40 transition-colors">
                      <span className="text-sm font-bold text-green-600">90+</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <span className="font-medium text-foreground">Vert</span> — Excellent ! Le site respecte les bonnes pratiques
                      </p>
                    </div>
                  </div>
                </div>
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
