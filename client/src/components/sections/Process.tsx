import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check } from 'lucide-react';

export function Process() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const steps = [
    {
      id: 1,
      title: "Premier échange",
      description: "Discussion approfondie pour comprendre votre projet, vos besoins et vos objectifs."
    },
    {
      id: 2,
      title: "Proposition et devis",
      description: "Je vous propose une solution adaptée avec un devis clair et détaillé."
    },
    {
      id: 3,
      title: "Développement sur-mesure",
      description: "Réalisation du projet avec des points de validation réguliers pour ajuster si nécessaire."
    },
    {
      id: 4,
      title: "Livraison et accompagnement",
      description: "Mise en ligne du projet, formation et support pour vous rendre autonome."
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const deliverables = [
    "Un site ou une application finalisé(e), prêt(e) à l'emploi.",
    "Un code propre, documenté, maintenable.",
    "Un guide de prise en main (PDF ou vidéo).",
    "Tous les accès (vous êtes propriétaire).",
    "Aide au choix et mise en ligne de l'hébergement.",
    "Nom de domaine à votre charge (Namecheap).",
    "Support technique à l'heure (si besoin).",
    "Suivi et corrections gratuites pendant 30 jours."
  ];

  return (
    <section id="process" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-center mb-12 font-['Poppins']"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Comment ça fonctionne ?
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Process steps */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-slate-100"></div>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {steps.map((step, index) => (
                <motion.div 
                  key={step.id}
                  className={`relative flex flex-col md:flex-row items-center ${index !== steps.length - 1 ? 'mb-12' : ''}`}
                  variants={fadeInUp}
                >
                  {step.id % 2 === 1 ? (
                    <>
                      <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                        <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                        <p className="text-secondary">{step.description}</p>
                      </div>
                      <div className="z-10 flex items-center justify-center w-12 h-12 bg-accent text-white rounded-full">
                        <span className="font-medium">{step.id}</span>
                      </div>
                      <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                    </>
                  ) : (
                    <>
                      <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                      <div className="z-10 flex items-center justify-center w-12 h-12 bg-accent text-white rounded-full">
                        <span className="font-medium">{step.id}</span>
                      </div>
                      <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0">
                        <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                        <p className="text-secondary">{step.description}</p>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* What you receive */}
          <motion.div 
            className="mt-24 bg-slate-50 p-8 rounded-xl"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-xl font-semibold mb-6">Ce que vous recevez</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deliverables.map((item, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-1" />
                  <span>
                    {item.includes("Namecheap") ? (
                      <>
                        Nom de domaine à votre charge (<a href="https://www.namecheap.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Namecheap</a>).
                      </>
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
