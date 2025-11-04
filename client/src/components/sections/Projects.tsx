import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Info, Github as GithubIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModals } from "@/contexts/ModalsContext";

export function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });
  const [isMobile, setIsMobile] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fonction pour toggler l'état d'un projet
  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  // Utiliser le contexte pour les modals et les projets
  const { openProjectModal, handleVisitSite, projects } = useModals();

  // Gérer l'ouverture automatique d'un projet via event custom
  useEffect(() => {
    const handleOpenProject = (event: CustomEvent) => {
      const projectId = event.detail.projectId;
      if (projectId) {
        setExpandedProjects(new Set([projectId]));
      }
    };

    const handleOpenProjectModal = (event: CustomEvent) => {
      const projectId = event.detail.projectId;
      if (projectId) {
        const project = projects.find(p => p.id === projectId);
        if (project) {
          openProjectModal(project);
        }
      }
    };

    window.addEventListener('openProject' as any, handleOpenProject);
    window.addEventListener('openProjectModal' as any, handleOpenProjectModal);
    
    return () => {
      window.removeEventListener('openProject' as any, handleOpenProject);
      window.removeEventListener('openProjectModal' as any, handleOpenProjectModal);
    };
  }, [projects, openProjectModal]);

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
    <section id="projects" ref={sectionRef} className="py-20 bg-muted/30 min-h-screen">
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

        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
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

        {/* Section Expérimentations personnelles et projets de formation */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-6 text-foreground">
            Expérimentations personnelles et projets de formation
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.filter(p => p.id !== 'alto' && p.id !== 'violette').map((project) => {
              const isExpanded = expandedProjects.has(project.id);
              
              return (
                <div key={project.id} className="bg-card rounded-lg shadow-sm overflow-hidden">
                  {/* En-tête cliquable sur mobile */}
                  <div
                    onClick={() => isMobile && toggleProject(project.id)}
                    className={`w-full ${isMobile ? 'cursor-pointer hover:bg-accent/5' : ''}`}
                    role={isMobile ? "button" : undefined}
                    tabIndex={isMobile ? 0 : undefined}
                    aria-expanded={isMobile ? isExpanded : true}
                    onKeyDown={(e) => {
                      if (isMobile && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        toggleProject(project.id);
                      }
                    }}
                  >
                    <div className="relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-36 object-cover"
                        loading="lazy"
                        decoding="async"
                        width="800"
                        height="450"
                      />
                      {isMobile && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
                          <div className="bg-background/90 backdrop-blur-sm rounded-full p-2">
                            <ChevronDown 
                              className={`w-6 h-6 text-accent transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            />
                          </div>
                        </div>
                      )}
                      {!isMobile && (
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity group">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-background/80 hover:bg-background"
                            onClick={(e) => {
                              e.stopPropagation();
                              openProjectModal(project);
                            }}
                          >
                            <Info className="mr-2 h-3 w-3" />
                            <span className="text-xs">Détails</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contenu dépliable */}
                  <AnimatePresence initial={false}>
                    {(isExpanded || !isMobile) && (
                      <motion.div
                        initial={isMobile ? { height: 0, opacity: 0 } : false}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={isMobile ? { height: 0, opacity: 0 } : {}}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-4">
                          <h3 className="text-base font-semibold mb-1 text-foreground">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {project.technologies &&
                              project.technologies.slice(0, 2).map((tech, index) => (
                                <span
                                  key={index}
                                  className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                            {project.technologies && project.technologies.length > 2 && (
                              <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
                                +{project.technologies.length - 2}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between gap-2 text-xs">
                            {project.id === 'mirojo' ? (
                              <>
                                <div className="flex gap-2 flex-wrap">
                                  {project.githubUrl && (
                                    <a
                                      href={project.githubUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-accent hover:underline flex items-center"
                                    >
                                      <GithubIcon className="h-3 w-3 mr-1" />
                                      <span>Code</span>
                                    </a>
                                  )}
                                  <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent hover:underline flex items-center"
                                  >
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    <span>Site</span>
                                  </a>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-muted-foreground hover:text-foreground h-6 w-6 p-0"
                                  onClick={() => openProjectModal(project)}
                                  aria-label="Voir les détails du projet"
                                >
                                  <Info className="h-3 w-3" />
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
                                    <GithubIcon className="h-3 w-3 mr-1" />
                                    <span>Code source</span>
                                  </a>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-muted-foreground hover:text-foreground h-6 w-6 p-0"
                                  onClick={() => openProjectModal(project)}
                                  aria-label="Voir les détails du projet"
                                >
                                  <Info className="h-3 w-3" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
