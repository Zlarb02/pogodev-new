import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Palette,
  Eye,
  FileText,
  UserCheck,
  Check,
  Shield,
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
            <p className="text-muted-foreground">
              Pas de « magie ». Je vous explique ce que je fais, pourquoi, et combien ça coûte.
              Les devis sont détaillés. Vous savez où va chaque euro.
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
              Freelance = vous me parlez, je vous réponds. Pas de commercial, pas d'équipe
              commerciale, pas d'intermédiaire. Relation directe.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
