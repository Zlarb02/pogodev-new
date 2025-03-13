import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, Code, ShoppingBag, Gift, Clock, Server, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-center mb-12 font-['Poppins'] text-foreground"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Mon offre
        </motion.h2>
        
        <div className="max-w-5xl mx-auto">
          <motion.h3 
            className="text-xl font-semibold mb-8"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            ✅ Ce que je peux réaliser pour vous :
          </motion.h3>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Service 1 */}
            <motion.div 
              className="bg-card p-6 rounded-xl shadow-sm"
              variants={fadeInUp}
            >
              <div className="text-accent mb-4">
                <Globe className="h-10 w-10" />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-foreground">Sites vitrines & portfolios</h4>
              <p className="text-muted-foreground">Sites vitrines, landing pages, portfolios professionnels pour présenter votre activité.</p>
            </motion.div>
            
            {/* Service 2 */}
            <motion.div 
              className="bg-card p-6 rounded-xl shadow-sm"
              variants={fadeInUp}
            >
              <div className="text-accent mb-4">
                <Code className="h-10 w-10" />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-foreground">Applications web</h4>
              <p className="text-muted-foreground">Applications web sur-mesure, modernes et performantes selon vos besoins spécifiques.</p>
            </motion.div>
            
            {/* Service 3 */}
            <motion.div 
              className="bg-card p-6 rounded-xl shadow-sm"
              variants={fadeInUp}
            >
              <div className="text-accent mb-4">
                <ShoppingBag className="h-10 w-10" />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-foreground">Boutiques en ligne</h4>
              <p className="text-muted-foreground">E-commerce sécurisé et prêt à vendre pour commercialiser vos produits ou services.</p>
            </motion.div>
          </motion.div>
          
          <motion.h3 
            className="text-xl font-semibold mb-8"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
          >
            🔧 En option selon besoins :
          </motion.h3>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delayChildren: 0.4 }}
          >
            {/* Option 1 */}
            <motion.div 
              className="bg-card p-6 rounded-xl shadow-sm"
              variants={fadeInUp}
            >
              <h4 className="text-lg font-semibold mb-3 text-foreground">Automatisations métiers</h4>
              <p className="text-muted-foreground">Automatisations métiers et API pour faciliter votre travail quotidien.</p>
            </motion.div>
            
            {/* Option 2 */}
            <motion.div 
              className="bg-card p-6 rounded-xl shadow-sm"
              variants={fadeInUp}
            >
              <h4 className="text-lg font-semibold mb-3 text-foreground">Solutions auto-hébergées</h4>
              <p className="text-muted-foreground">Solutions auto-hébergées et éco-conçues pour plus de contrôle.</p>
            </motion.div>
            
            {/* Option 3 */}
            <motion.div 
              className="bg-card p-6 rounded-xl shadow-sm"
              variants={fadeInUp}
            >
              <h4 className="text-lg font-semibold mb-3 text-foreground">CI/CD simples</h4>
              <p className="text-muted-foreground">CI/CD simples pour faciliter les mises à jour de votre site ou application.</p>
            </motion.div>
          </motion.div>
          
          {/* Special offers */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.6 }
              }
            }}
          >
            {/* Offer 1 */}
            <motion.div 
              className="bg-accent/10 border border-accent/20 p-6 rounded-xl"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-accent text-white rounded-full p-3 mr-4">
                  <Gift className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">Tarif préférentiel</h4>
                  <p className="text-accent text-lg font-bold mb-3">🎁 -50% pour mes 2 premiers clients</p>
                  <p className="text-muted-foreground">Profitez d'un tarif exceptionnel pour le lancement de mon activité, en échange de votre confiance.</p>
                </div>
              </div>
            </motion.div>
            
            {/* Offer 2 */}
            <motion.div 
              className="bg-accent/10 border border-accent/20 p-6 rounded-xl"
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-accent text-white rounded-full p-3 mr-4">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">Livraison adaptée</h4>
                  <p className="text-accent text-lg font-bold mb-3">⚡ Délais adaptés à votre projet</p>
                  <p className="text-muted-foreground">Quelques jours pour un site simple, plusieurs semaines pour une application complète, avec étapes claires et accompagnement.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.8 }}
          >
            <Button asChild size="lg">
              <a href="#contact">
                Obtenez un devis personnalisé
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </Button>
          </motion.div>
          
          {/* Hosting info */}
          <motion.div 
            className="bg-card p-8 rounded-xl shadow-sm"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.9 }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center text-foreground">
              <Server className="h-6 w-6 mr-2 text-accent" />
              Hébergement & accompagnement sur-mesure
            </h3>
            
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-2 mt-1" />
                <div>
                  Je vous aide à choisir l'hébergement le plus adapté : VPS, cloud, serveur dédié, ou hébergement statique sur o2switch (inclus).
                </div>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-2 mt-1" />
                <div>
                  Nom de domaine à votre charge — <a href="https://www.namecheap.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Vérifier ici sur Namecheap</a>.
                </div>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-2 mt-1" />
                <div>
                  Solutions évolutives possibles avec forfait hébergement et support technique à l'heure pour vous accompagner si besoin.
                </div>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-2 mt-1" />
                <div>
                  Formation offerte sur CMS ou outils pour vous rendre le plus autonome possible.
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
