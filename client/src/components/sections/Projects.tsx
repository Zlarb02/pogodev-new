import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModals } from "@/contexts/ModalsContext";

export function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Utiliser le contexte pour les modals et les projets
  const { openProjectModal, handleVisitSite, projects } = useModals();

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
    <section id="projects" ref={sectionRef} className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center mb-6 font-['Poppins'] text-foreground"
          initial={{ opacity: 1, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Mes projets personnels et démonstrateurs
        </motion.h2>

        <motion.p
          className="text-center text-muted-foreground max-w-3xl mx-auto mb-8"
          initial={{ opacity: 1, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Voici quelques projets et concepts réalisés pour montrer ce que je
          peux faire. Cliquez pour plus de détails.
        </motion.p>

        {/* Bloc Alto Lille vendeur en haut, grille inchangée */}
        <motion.p
          className="max-w-3xl mx-auto mb-8 text-center text-lg md:text-xl text-accent font-semibold"
          initial={{ opacity: 1, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="font-bold">Alto Lille</span> : mon projet vitrine,
          boutique e-commerce sur mesure, moderne et engagée.
          <br />
          Conçue pour un créateur de lampes écoresponsables, Alto Lille réunit
          design haut de gamme, animation 3D, mode sombre/clair, paiement
          Stripe, gestion autonome des contenus, overlays saisonniers, et bien
          plus.
          <br />
          Ce projet incarne ma passion pour le web utile, performant et humain.
          <br />
          <br />
          <a
            href="https://alto-lille.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-4 py-2 bg-accent text-white rounded-lg font-semibold shadow hover:bg-accent/90 transition"
          >
            Découvrir Alto Lille
          </a>
        </motion.p>
        <br />
        <br />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="visible"
          animate="visible"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-card rounded-xl shadow-sm overflow-hidden transition-transform hover:scale-[1.02] relative group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Button
                    variant="outline"
                    className="bg-background/80 hover:bg-background"
                    onClick={() => openProjectModal(project)}
                  >
                    <Info className="mr-2 h-4 w-4" />
                    Détails du projet
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3 mb-4">
                  {project.technologies &&
                    project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  {project.technologies && project.technologies.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline flex items-center"
                    onClick={(e) => handleVisitSite(e, project)}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    <span>Voir le site</span>
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => openProjectModal(project)}
                  >
                    <span>Plus d'infos</span>
                    <Info className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 1, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-muted-foreground">
            🎯 Vous pouvez tester leurs performances avec
            <a
              href="https://developers.google.com/web/tools/lighthouse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline mx-1"
            >
              Lighthouse
            </a>
            ,
            <a
              href="https://ecograder.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline mx-1"
            >
              Ecograder
            </a>
            ,
            <a
              href="https://www.websitecarbon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline mx-1"
            >
              Carbon
            </a>
            ,
            <a
              href="https://observatory.mozilla.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline mx-1"
            >
              Mozilla Observatory
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
