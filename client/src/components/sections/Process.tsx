import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

export function Process() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const steps = [
    {
      id: 1,
      title: "Premier échange",
      description:
        "Discussion approfondie pour comprendre votre projet, vos besoins et vos objectifs.",
    },
    {
      id: 2,
      title: "Proposition et devis",
      description:
        "Je vous propose une solution adaptée avec un devis clair et détaillé.",
    },
    {
      id: 3,
      title: "Développement sur-mesure",
      description:
        "Réalisation du projet avec des points de validation réguliers pour ajuster si nécessaire.",
    },
    {
      id: 4,
      title: "Livraison et accompagnement",
      description:
        "Mise en ligne du projet, formation et support pour vous rendre autonome.",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const deliverables = [
    "Un site ou une application finalisé(e), prêt(e) à l'emploi.",
    "Un code propre, documenté, maintenable.",
    "Un guide de prise en main (PDF ou vidéo).",
    "Tous les accès (vous êtes propriétaire).",
    "Aide au choix et mise en ligne de l'hébergement.",
    "Accompagnement pour l'achat de votre nom de domaine (Namecheap recommandé).",
    "Support technique facturé à l'heure après la période de garantie.",
    "Suivi et corrections gratuites pendant 30 jours.",
  ];

  return (
    <section id="process" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center mb-12 font-['Poppins'] text-foreground"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Comment ça fonctionne ?
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline central line - visible on all screen sizes */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-accent/20 rounded-full"></div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className={`relative flex items-start ${
                    index !== steps.length - 1 ? "mb-12" : ""
                  }`}
                  variants={fadeInUp}
                >
                  {/* Mobile and desktop optimized layout */}
                  <div className="flex w-full">
                    {/* Circle indicator - aligned to left on mobile, centered on desktop */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 z-10 flex items-center justify-center w-8 h-8 md:w-12 md:h-12 bg-cyan-950 text-white rounded-full shadow-lg border-4 border-background">
                      <span className="font-medium text-sm md:text-base">
                        {step.id}
                      </span>
                    </div>

                    {/* Content container with conditional positioning */}
                    <div
                      className={`pl-16 md:w-1/2 ${
                        step.id % 2 === 0
                          ? "md:pl-8 md:ml-auto"
                          : "md:pr-8 md:text-right"
                      }`}
                    >
                      <div
                        className={`bg-card rounded-lg p-4 md:p-5 shadow-sm border border-accent/10 transition-all hover:shadow-md hover:border-accent/30`}
                      >
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* What you receive */}
          <motion.div
            className="mt-24 bg-card p-8 rounded-xl"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-foreground">
              Ce que vous recevez
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deliverables.map((item, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-1" />
                  <span className="text-muted-foreground">
                    {item.includes("Namecheap") ? (
                      <>Accompagnement pour l'achat de votre nom de domaine.</>
                    ) : (
                      item
                    )}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
