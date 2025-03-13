import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';

export function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const projects = [
    {
      title: "E-commerce produits numériques",
      description: "Site de vente en ligne pour produits numériques avec paiement sécurisé et téléchargements automatiques.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      url: "https://shop.pogodev.com"
    },
    {
      title: "Site vitrine pour freelance",
      description: "Présentation professionnelle avec portfolio intégré et formulaire de contact pour une photographe.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      url: "https://anais.pogodev.com"
    },
    {
      title: "Portfolio interactif 3D",
      description: "Expérience immersive avec avatar animé et navigation 3D pour un architecte d'intérieur.",
      image: "https://images.unsplash.com/photo-1595776613215-fe04b78de550?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      url: "https://scene.pogodev.com"
    },
    {
      title: "Mirojo.app - Application JDR",
      description: "Application web pour jeu de rôle avec intégration IA pour créer des scénarios et personnages.",
      image: "https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      url: "https://mirojo.app"
    },
    {
      title: "Violette - Site vitrine",
      description: "Site vitrine entièrement responsive optimisé pour tous types d'appareils et tailles d'écran.",
      image: "https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      url: "https://violette.pogodev.com"
    },
    {
      title: "GrooveGather - Plateforme",
      description: "Plateforme collaborative pour musiciens permettant le partage et la création de projets communs.",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      url: "https://groovegather.fr"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-center mb-6 font-['Poppins']"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Projets personnels et démonstrateurs
        </motion.h2>
        
        <motion.p 
          className="text-center text-secondary max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Voici quelques projets et concepts réalisés pour montrer ce que je peux faire.
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform hover:scale-[1.02]"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-secondary mb-4">{project.description}</p>
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-accent hover:underline flex items-center"
                >
                  <span>Voir le projet</span>
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-secondary">
            🎯 Vous pouvez tester leurs performances avec 
            <a href="https://developers.google.com/web/tools/lighthouse" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline mx-1">Lighthouse</a>, 
            <a href="https://ecograder.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline mx-1">Ecograder</a>, 
            <a href="https://www.websitecarbon.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline mx-1">Carbon</a>, 
            <a href="https://observatory.mozilla.org/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline mx-1">Mozilla Observatory</a>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
