import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  ClipboardCopy,
  MessageSquare,
  Shield,
  Globe,
  Check,
} from "lucide-react";

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
          Pourquoi travailler avec moi ?
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Card 1 */}
          <motion.div
            className="bg-card p-6 rounded-xl shadow-sm"
            variants={itemVariants}
          >
            <div className="text-accent mb-4 flex row items-center gap-4">
              <ClipboardCopy className="h-10 w-10" />{" "}
              <h3 className="text-xl font-semibold text-foreground mb-0">
                Sur-mesure
              </h3>
            </div>

            <p className="text-muted-foreground">
              Une approche sur-mesure, qui s'adapte à vous et à vos besoins
              spécifiques.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="bg-card p-6 rounded-xl shadow-sm"
            variants={itemVariants}
          >
            <div className="text-accent mb-4 flex row items-center gap-4">
              <MessageSquare className="h-10 w-10" />{" "}
              <h3 className="text-xl font-semibold mb-0 text-foreground">
                Accessible
              </h3>
            </div>
            <p className="text-muted-foreground">
              Un accompagnement humain et accessible, même si vous n'êtes pas
              technique.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="bg-card p-6 rounded-xl shadow-sm"
            variants={itemVariants}
          >
            <div className="text-accent mb-4 flex row items-center gap-4">
              <Shield className="h-10 w-10" />
              <h3 className="text-xl font-semibold mb-0 text-foreground">
                Qualité
              </h3>
            </div>
            <p className="text-muted-foreground">
              Un vrai souci de qualité : rapidité, durabilité, simplicité et
              robustesse.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            className="bg-card p-6 rounded-xl shadow-sm"
            variants={itemVariants}
          >
            <div className="text-accent mb-4 flex row items-center gap-4">
              <Globe className="h-10 w-10" />
              <h3 className="text-xl font-semibold mb-0 text-foreground">
                Responsable
              </h3>
            </div>
            <p className="text-muted-foreground">
              Des solutions responsables, éco-conçues, stables, et faciles à
              faire évoluer.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-xl font-medium text-primary italic">
            "Je transforme vos idées en solutions élégantes et efficaces, <br />
            pour vous simplifier la vie"
          </p>
        </motion.div>

        {/* Quality section */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-sm border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center text-foreground">
            <Shield className="h-6 w-6 mr-2 text-accent" />
            Qualité testée et prouvée
          </h3>

          <p className="mb-6 text-muted-foreground">
            Tous mes sites sont testés et optimisés pour :
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-accent mr-2" />
              <span className="text-muted-foreground">Performance rapide</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-accent mr-2" />
              <span className="text-muted-foreground">Accessibilité</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-accent mr-2" />
              <span className="text-muted-foreground">Bonnes pratiques</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-accent mr-2" />
              <span className="text-muted-foreground">Éco-conception</span>
            </div>
          </div>

          <p className="mt-6 font-medium text-primary">
            ➡️ Je m'engage dans une démarche d'amélioration continue pour des
            performances optimales.
          </p>

          <div className="mt-4">
            <p className="mb-2 text-muted-foreground">
              👉 Dans un souci de transparence, vous pouvez évaluer les sites
              avec ces outils :
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href="https://developers.google.com/web/tools/lighthouse"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors text-muted-foreground"
              >
                Lighthouse (Google)
              </a>
              <a
                href="https://ecograder.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors text-muted-foreground"
              >
                Ecograder
              </a>
              <a
                href="https://www.websitecarbon.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors text-muted-foreground"
              >
                Website Carbon
              </a>
              <a
                href="https://observatory.mozilla.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors text-muted-foreground"
              >
                Mozilla Observatory
              </a>
            </div>

            <p className="mt-6 italic text-muted-foreground">
              "La qualité n'est pas un acte mais une habitude sur laquelle je
              travaille chaque jour 🌱"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
