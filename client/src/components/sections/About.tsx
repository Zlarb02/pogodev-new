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
              <picture>
                <source
                  srcSet="/images/etienne-portrait.avif"
                  type="image/avif"
                />
                <source
                  srcSet="/images/etienne-portrait.webp"
                  type="image/webp"
                />
                <img
                  src="/images/etienne-portrait.jpg"
                  alt="Photo d'Étienne Pogoda"
                  className="rounded-lg shadow-md w-full h-auto"
                  loading="lazy"
                  width="800"
                  height="800"
                />
              </picture>
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
              <p className="text-lg leading-relaxed text-muted-foreground mb-4">
                Je m'appelle Étienne, j'ai 29 ans et je vis à Lille. Mon parcours, c'est pas une ligne droite :
                j'ai bossé en restauration, enchaîné 8 formations pro, vécu 3 ans en foyer de jeunes travailleurs
                avec ma copine. Aujourd'hui on a un HLM, elle paie le loyer, et je dois trouver des clients rapidement.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mb-4">
                Pendant longtemps, mes valeurs m'ont freiné. J'ai attendu que le monde change. Maintenant,
                j'ai décidé de participer à sa transformation, à ma manière : en créant des sites web qui
                ne gaspillent pas, qui durent, et qui respectent les gens qui les utilisent.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground font-medium">
                Pas besoin de choisir entre un site robuste et un site éthique. Les deux vont ensemble.
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
              <picture>
                <source
                  srcSet="/images/etienne-coding.avif"
                  type="image/avif"
                />
                <source
                  srcSet="/images/etienne-coding.webp"
                  type="image/webp"
                />
                <img
                  src="/images/etienne-coding.jpg"
                  alt="Étienne Pogoda en train de coder sur sa terrasse"
                  className="rounded-lg shadow-md w-full h-auto"
                  loading="lazy"
                  width="5184"
                  height="3888"
                />
              </picture>
            </motion.div>

            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="text-lg leading-relaxed text-muted-foreground mb-4">
                <span className="font-medium text-foreground">Mon approche</span> : partir de vos vrais besoins, choisir la solution adaptée (pas
                forcément la plus à la mode), et vous livrer quelque chose que vous comprenez
                et maîtrisez.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                Code lisible. Pas de dépendances inutiles. Pas de tracking par défaut.
                C'est aussi simple que ça.
              </p>
              <div className="bg-accent/10 border-l-4 border-accent p-4 rounded">
                <h3 className="text-xl font-medium mb-2 text-foreground">
                  Stack alternative
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Vous préférez garder le contrôle de vos données ? Je monte aussi des stacks
                  sans services GAFAM.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
