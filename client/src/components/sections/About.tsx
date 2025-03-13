import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-center mb-12 font-['Poppins']"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Qui suis-je ?
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div 
              className="md:w-1/3"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
                alt="Photo d'Étienne Pogoda" 
                className="rounded-lg shadow-md" 
                width="300" 
                height="400"
              />
            </motion.div>
            
            <motion.div 
              className="md:w-2/3"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-lg leading-relaxed text-secondary mb-6">
                Derrière l'écran, je suis Étienne Pogoda, développeur fullstack & devops. Après 7 ans de formation continue tout en travaillant en restauration, je me lance aujourd'hui en freelance.
              </p>
              <p className="text-lg leading-relaxed text-secondary mb-6">
                J'aime imaginer des projets utiles et sur-mesure, avec une attention particulière à la qualité, la performance et l'impact environnemental.
              </p>
              <p className="text-lg leading-relaxed text-secondary">
                Mon objectif : créer avec vous des solutions solides, élégantes, qui répondent à vos vrais besoins.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
