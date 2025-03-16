import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Première rangée: Photo principale avec le titre */}
          <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://i.imgur.com/LFjVFj2.jpeg"
                alt="Photo d'Étienne Pogoda"
                className="rounded-lg shadow-md w-full h-auto"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-['Poppins'] text-foreground">
                Qui suis-je ?
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Derrière l'écran, je suis Étienne Pogoda, développeur freelance.
                Après 7 ans de formations en développement web sur différentes
                stack, tout en travaillant en restauration, je me lance
                aujourd'hui en freelance.
              </p>
            </motion.div>
          </div>

          {/* Deuxième rangée: Photo codage avec texte descriptif */}
          <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <img
                src="https://i.imgur.com/eGdIlno.jpeg"
                alt="Étienne Pogoda en train de coder sur sa terrasse"
                className="rounded-lg shadow-md w-full h-auto"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                J'aime imaginer des projets utiles et sur-mesure, avec une
                attention particulière à la qualité, la performance et l'impact
                environnemental.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Mon objectif : créer avec vous des solutions solides, élégantes,
                qui répondent à vos vrais besoins.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
