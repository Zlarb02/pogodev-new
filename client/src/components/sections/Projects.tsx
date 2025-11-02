import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Info, Github as GithubIcon } from "lucide-react";
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
          className="text-2xl md:text-3xl font-bold text-center mb-12 font-['Poppins'] text-foreground"
          initial={{ opacity: 1, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Mes projets
        </motion.h2>

        {/* Section Projets professionnels */}
        <motion.h3
          className="text-xl font-semibold mb-6 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Projets professionnels
        </motion.h3>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16"
          variants={containerVariants}
          initial="visible"
          animate="visible"
        >
          {projects.filter(p => p.id === 'alto' || p.id === 'violette').map((project) => (
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
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="450"
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
                    <span>Visiter le site</span>
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => openProjectModal(project)}
                    aria-label="Voir les détails du projet"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Expérimentations personnelles et projets de formation */}
        <motion.h3
          className="text-xl font-semibold mb-6 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Expérimentations personnelles et projets de formation
        </motion.h3>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="visible"
          animate="visible"
        >
          {projects.filter(p => p.id !== 'alto' && p.id !== 'violette').map((project) => (
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
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="450"
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
                <div className="flex items-center justify-between flex-wrap gap-2">
                  {project.id === 'mirojo' ? (
                    <>
                      <div className="flex gap-3 flex-wrap">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:underline flex items-center text-sm"
                          >
                            <GithubIcon className="h-4 w-4 mr-1" />
                            <span>Code source</span>
                          </a>
                        )}
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline flex items-center text-sm"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          <span>Landing Webflow</span>
                        </a>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => openProjectModal(project)}
                        aria-label="Voir les détails du projet"
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline flex items-center"
                        >
                          <GithubIcon className="h-4 w-4 mr-1" />
                          <span>Code source</span>
                        </a>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => openProjectModal(project)}
                        aria-label="Voir les détails du projet"
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </>
                  )}
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
              className="text-accent underline hover:no-underline mx-1"
            >
              Lighthouse
            </a>
            , leur écoconception avec
            <a
              href="https://ecoindex.fr/comment-ca-marche/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:no-underline mx-1"
            >
              Kastor
            </a>
            ,
            <a
              href="https://ecograder.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:no-underline mx-1"
            >
              Ecograder
            </a>
            ,
            <a
              href="https://www.ecoindex.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:no-underline mx-1"
            >
              Ecoindex
            </a>
            ,
            <a
              href="https://www.websitecarbon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:no-underline mx-1"
            >
              Website Carbon
            </a>
            , et la sécurité avec
            <a
              href="https://observatory.mozilla.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:no-underline mx-1"
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
