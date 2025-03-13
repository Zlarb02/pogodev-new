import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ClipboardCopy, MessageSquare, Shield, Globe, Check } from 'lucide-react';

export function WhyMe() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
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
    <section id="why-me" ref={sectionRef} className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-center mb-12 font-['Poppins']"
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
          <motion.div className="bg-white p-6 rounded-xl shadow-sm" variants={itemVariants}>
            <div className="text-accent mb-4">
              <ClipboardCopy className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Sur-mesure</h3>
            <p className="text-secondary">Une approche sur-mesure, qui s'adapte à vous et à vos besoins spécifiques.</p>
          </motion.div>
          
          {/* Card 2 */}
          <motion.div className="bg-white p-6 rounded-xl shadow-sm" variants={itemVariants}>
            <div className="text-accent mb-4">
              <MessageSquare className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Accessible</h3>
            <p className="text-secondary">Un accompagnement humain et accessible, même si vous n'êtes pas technique.</p>
          </motion.div>
          
          {/* Card 3 */}
          <motion.div className="bg-white p-6 rounded-xl shadow-sm" variants={itemVariants}>
            <div className="text-accent mb-4">
              <Shield className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Qualité</h3>
            <p className="text-secondary">Un vrai souci de qualité : rapidité, durabilité, simplicité et robustesse.</p>
          </motion.div>
          
          {/* Card 4 */}
          <motion.div className="bg-white p-6 rounded-xl shadow-sm" variants={itemVariants}>
            <div className="text-accent mb-4">
              <Globe className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Responsable</h3>
            <p className="text-secondary">Des solutions responsables, éco-conçues, stables, et faciles à faire évoluer.</p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-xl font-medium text-primary italic">
            "Mon but est de vous livrer un projet fiable, beau, et simple à utiliser, sans vous compliquer la vie."
          </p>
        </motion.div>
        
        {/* Quality section */}
        <motion.div 
          className="mt-16 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-100"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <Shield className="h-6 w-6 mr-2 text-accent" />
            Qualité testée et prouvée
          </h3>
          
          <p className="mb-6 text-secondary">Tous mes sites sont testés et optimisés pour :</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-accent mr-2" />
              <span>Performance rapide</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-accent mr-2" />
              <span>Accessibilité</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-accent mr-2" />
              <span>Bonnes pratiques</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-accent mr-2" />
              <span>Éco-conception</span>
            </div>
          </div>
          
          <p className="mt-6 font-medium text-primary">➡️ Mes projets obtiennent des scores presque parfaits.</p>
          
          <div className="mt-4">
            <p className="mb-2">👉 Vous pouvez vérifier par vous-même avec ces outils :</p>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <a href="https://developers.google.com/web/tools/lighthouse" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-slate-100 rounded-full text-sm hover:bg-slate-200 transition-colors">
                Lighthouse (Google)
              </a>
              <a href="https://ecograder.com/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-slate-100 rounded-full text-sm hover:bg-slate-200 transition-colors">
                Ecograder
              </a>
              <a href="https://www.websitecarbon.com/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-slate-100 rounded-full text-sm hover:bg-slate-200 transition-colors">
                Website Carbon
              </a>
              <a href="https://observatory.mozilla.org/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-slate-100 rounded-full text-sm hover:bg-slate-200 transition-colors">
                Mozilla Observatory
              </a>
            </div>
            
            <p className="mt-6 italic text-secondary">
              "Parce qu'une démonstration vaut mieux qu'un beau discours."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
