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
        "On discute de ce dont vous avez vraiment besoin (pas seulement ce que vous pensez vouloir, ou de ce que j'ai envie de vendre : on prend le temps de réfléchir ensemble au besoin réel).",
    },
    {
      id: 2,
      title: "Prototype dans l'heure",
      description:
        "Je vous propose la solution la plus adaptée et je vous montre un prototype dans l'heure suivant l'appel. Vous décidez de la suite.",
    },
    {
      id: 3,
      title: "Développement sur-mesure",
      description:
        "Réalisation du projet avec des points de validation réguliers pour ajuster si nécessaire. Travail d'équipe avec d'autres développeur·ses possible.",
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
        </div>
      </div>
    </section>
  );
}
