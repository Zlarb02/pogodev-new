import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectType } from "@/components/ProjectModal";
import { useModals } from "@/contexts/ModalsContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Séparons les états des dropdowns pour desktop et mobile
  const [isDesktopProjectsOpen, setIsDesktopProjectsOpen] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);
  const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  // Utiliser le contexte pour les modals et les projets
  const { openProjectModal, handleVisitSite, projects } = useModals();

  const projectsDropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Si le menu est fermé, fermer aussi tous les dropdowns
    if (!isMenuOpen) {
      setIsMobileProjectsOpen(false);
      setIsMobileServicesOpen(false);
    }
  };

  // Fonction spécifique pour le toggle desktop
  const toggleDesktopProjects = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsDesktopProjectsOpen(!isDesktopProjectsOpen);
  };

  // Fonction spécifique pour le toggle mobile
  const toggleMobileProjects = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsMobileProjectsOpen((curr) => !curr);
  };

  // Détecter si nous sommes sur la page 404
  const [is404Page, setIs404Page] = useState(false);

  useEffect(() => {
    // Vérifier si nous sommes sur la page 404 en regardant le sessionStorage
    const redirect = sessionStorage.getItem("redirect");
    const notFoundUrl = sessionStorage.getItem("notFoundUrl");

    if (redirect || notFoundUrl) {
      setIs404Page(true);
    }

    // Handle scroll event to change header style
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        projectsDropdownRef.current &&
        !projectsDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDesktopProjectsOpen(false);
      }

      // Fermer le menu mobile en cliquant à l'extérieur
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('button[aria-label="Menu"]')
      ) {
        setIsMenuOpen(false);
      }
    };

    // Empêcher le défilement du body quand le menu mobile est ouvert
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Ne pas afficher le header sur la page 404
  if (is404Page) {
    return null;
  }

  const handleNavClick = (sectionId?: string) => {
    // Close mobile menu when clicking on a link
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }

    // Close all dropdowns
    setIsDesktopProjectsOpen(false);
    setIsMobileProjectsOpen(false);
    setIsDesktopServicesOpen(false);
    setIsMobileServicesOpen(false);

    // Scroll to the section if an ID is provided
    if (sectionId) {
      // Si nous sommes sur la page 404, nous devons d'abord retourner à l'accueil
      if (is404Page) {
        const basePath = window.location.hostname === "pogodev.com" ? "" : "/";
        window.location.href = `${basePath}/#${sectionId}`;
        return;
      }

      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Fonction pour ouvrir la modal avec les détails du projet
  const handleOpenProjectModal = (project: ProjectType) => {
    openProjectModal(project);
    // Fermer seulement le dropdown desktop
    setIsDesktopProjectsOpen(false);
    // Ne pas fermer le menu mobile ni son dropdown pour permettre de continuer à naviguer
  };

  // Animations pour le menu mobile
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-sm shadow-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-4 group">
            <img
              src={`assets/logo-large.svg`}
              alt="Logo"
              className="h-16 md:h-20 w-auto group-hover:scale-105 transition-transform duration-300"
              width="200"
              height="80"
            />
            <div className="flex flex-col">
              <div className="text-xl md:text-2xl font-bold font-['Poppins'] cursor-pointer">
                <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-teal-300 group-hover:to-emerald-300 transition-all duration-300">
                  pogodev
                </span>
                <span className="text-accent group-hover:text-accent/80 transition-colors duration-300">.com</span>
              </div>
              <div className="text-[10px] md:text-xs text-muted-foreground/70 font-medium tracking-wide uppercase">
                <span className="text-cyan-400/70">Solutions web</span> <span className="text-green-400/70">écoconçues</span>
              </div>
            </div>
          </a>

          {/* Mobile menu button - Advanced Artistic CSS */}
          <button
            className="lg:hidden focus:outline-none relative w-16 h-16 flex items-center justify-center group perspective-1000"
            onClick={toggleMenu}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            style={{ perspective: '1000px' }}
          >
            {/* Conteneur avec effet 3D et rotation lente hypnotique */}
            <div className={`relative w-9 h-9 transition-transform duration-500 ease-out ${isMenuOpen ? 'rotate-180' : ''}`}
                 style={{ 
                   transformStyle: 'preserve-3d',
                   animation: isMenuOpen ? 'none' : 'float-rotate 8s ease-in-out infinite'
                 }}>
              
              {/* Background circle avec effet morphing intensifié */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 via-cyan-500/20 to-teal-500/20 transition-all duration-500 ${
                isMenuOpen 
                  ? 'scale-[2] rotate-180 opacity-70' 
                  : 'scale-100 rotate-0 opacity-0 group-hover:opacity-80 group-hover:scale-110'
              }`} 
              style={{ 
                filter: 'blur(8px)',
                animation: isMenuOpen ? 'none' : 'none'
              }} />
              
              {/* Deuxième couche de glow pour plus de profondeur */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/10 to-accent/10 transition-all duration-700 ${
                isMenuOpen 
                  ? 'scale-[2.5] opacity-40' 
                  : 'scale-100 opacity-0 group-hover:opacity-60 group-hover:scale-[1.3]'
              }`} 
              style={{ 
                filter: 'blur(12px)'
              }} />
              
              {/* Burger lines container */}
              <div className="absolute inset-0 flex flex-col justify-center items-center gap-1.5">
                {/* Line 1 - Top */}
                <span
                  className={`h-0.5 rounded-full transition-all duration-500 ease-out ${
                    isMenuOpen
                      ? "w-7 bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 rotate-45 translate-y-[7px] shadow-sm"
                      : "w-7 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 rotate-0 translate-y-0 group-hover:w-6 group-hover:translate-x-1.5 shadow-md"
                  }`}
                  style={{
                    boxShadow: isMenuOpen 
                      ? '0 0 4px rgba(244, 114, 182, 0.3)' 
                      : '0 0 8px rgba(34, 211, 238, 0.4)'
                  }}
                />
                
                {/* Line 2 - Middle avec effet morphing complexe */}
                <div className="relative w-7 h-0.5 overflow-hidden">
                  <span
                    className={`absolute inset-0 rounded-full transition-all duration-500 ease-out ${
                      isMenuOpen
                        ? "scale-x-0 opacity-0 rotate-180"
                        : "scale-x-100 opacity-100 rotate-0 group-hover:scale-x-70"
                    }`}
                    style={{
                      background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
                      boxShadow: isMenuOpen ? 'none' : '0 0 8px rgba(139, 92, 246, 0.4)',
                      transformOrigin: 'center'
                    }}
                  />
                  {/* Particules subtiles au survol */}
                  {!isMenuOpen && (
                    <>
                      <span className="absolute left-0 w-1 h-0.5 bg-blue-400/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute right-0 w-1 h-0.5 bg-pink-400/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  )}
                </div>
                
                {/* Line 3 - Bottom */}
                <span
                  className={`h-0.5 rounded-full transition-all duration-500 ease-out ${
                    isMenuOpen
                      ? "w-7 bg-gradient-to-r from-fuchsia-400 via-pink-400 to-rose-400 -rotate-45 -translate-y-[7px] shadow-sm"
                      : "w-7 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 rotate-0 translate-y-0 group-hover:w-6 group-hover:translate-x-1.5 shadow-md"
                  }`}
                  style={{
                    boxShadow: isMenuOpen 
                      ? '0 0 4px rgba(244, 114, 182, 0.3)' 
                      : '0 0 8px rgba(251, 146, 60, 0.4)'
                  }}
                />
              </div>
              
              {/* Orbites animées plus dynamiques */}
              <div className={`absolute inset-0 rounded-full border border-accent/40 transition-all duration-700 ${
                isMenuOpen ? 'scale-[2] opacity-0' : 'scale-100 opacity-0 group-hover:opacity-100 group-hover:scale-[1.35]'
              }`} 
              style={{ 
                animation: isMenuOpen ? 'none' : 'spin 2.5s linear infinite'
              }} />
              
              <div className={`absolute inset-0 rounded-full border border-cyan-400/30 transition-all duration-700 ${
                isMenuOpen ? 'scale-[2] opacity-0' : 'scale-100 opacity-0 group-hover:opacity-100 group-hover:scale-[1.2]'
              }`} 
              style={{ 
                animation: isMenuOpen ? 'none' : 'spin 1.8s linear infinite reverse',
                animationDelay: '0.3s'
              }} />
              
              {/* Troisième orbite pour plus de dynamisme */}
              <div className={`absolute inset-0 rounded-full border border-teal-400/20 transition-all duration-700 ${
                isMenuOpen ? 'scale-[2] opacity-0' : 'scale-100 opacity-0 group-hover:opacity-70 group-hover:scale-[1.5]'
              }`} 
              style={{ 
                animation: isMenuOpen ? 'none' : 'spin 3.2s linear infinite',
                animationDelay: '0.6s'
              }} />
            </div>
            
            {/* Focus ring animé */}
            <div className="absolute inset-0 rounded-full opacity-0 focus-visible:opacity-100 transition-opacity">
              <div className="absolute inset-0 rounded-full border-2 border-accent animate-ping" style={{ animationDuration: '1.5s' }} />
              <div className="absolute inset-0 rounded-full border-2 border-accent" />
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center space-x-8">
            <a
              href="#about"
              className="text-foreground hover:text-accent transition-colors py-2 flex items-center"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("about");
              }}
            >
              Qui suis-je ?
            </a>
            
            {/* Desktop Dropdown pour Mon offre */}
            <div className="relative flex items-center">
              <button
                className="text-foreground hover:text-accent transition-colors flex items-center gap-1 py-2"
                onClick={() => setIsDesktopServicesOpen(!isDesktopServicesOpen)}
                onBlur={(e) => {
                  // Fermer uniquement si le focus sort du dropdown
                  if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
                    setTimeout(() => setIsDesktopServicesOpen(false), 150);
                  }
                }}
              >
                Mon offre{" "}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isDesktopServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isDesktopServicesOpen && (
                <div className="absolute top-full left-0 mt-2 py-2 w-64 bg-card rounded-lg shadow-md border border-border z-50">
                  <a
                    href="#services"
                    className="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("services");
                      setIsDesktopServicesOpen(false);
                    }}
                  >
                    Ce que je livre
                  </a>
                  <a
                    href="#pour-qui"
                    className="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("pour-qui");
                      setIsDesktopServicesOpen(false);
                    }}
                  >
                    Pour qui ?
                  </a>
                  <a
                    href="#tarifs"
                    className="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("tarifs");
                      setIsDesktopServicesOpen(false);
                    }}
                  >
                    Tarifs & devis
                  </a>
                  <div className="h-px bg-border my-1" />
                  <div className="px-4 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    En option
                  </div>
                  <a
                    href="#services"
                    className="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent"
                    onClick={(e) => {
                      e.preventDefault();
                      // Scroll vers la section services puis vers "En option"
                      const servicesSection = document.getElementById("services");
                      if (servicesSection) {
                        servicesSection.scrollIntoView({ behavior: "smooth" });
                        // Petit délai pour laisser le scroll se faire, puis scroll vers "En option"
                        setTimeout(() => {
                          const optionsTitle = Array.from(document.querySelectorAll('h3')).find(
                            h3 => h3.textContent?.includes('En option')
                          );
                          if (optionsTitle) {
                            optionsTitle.scrollIntoView({ behavior: "smooth", block: "center" });
                          }
                        }, 500);
                      }
                      setIsDesktopServicesOpen(false);
                    }}
                  >
                    APIs & IA
                  </a>
                  <a
                    href="#services"
                    className="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent"
                    onClick={(e) => {
                      e.preventDefault();
                      // Scroll vers la section services puis vers "En option"
                      const servicesSection = document.getElementById("services");
                      if (servicesSection) {
                        servicesSection.scrollIntoView({ behavior: "smooth" });
                        setTimeout(() => {
                          const optionsTitle = Array.from(document.querySelectorAll('h3')).find(
                            h3 => h3.textContent?.includes('En option')
                          );
                          if (optionsTitle) {
                            optionsTitle.scrollIntoView({ behavior: "smooth", block: "center" });
                          }
                        }, 500);
                      }
                      setIsDesktopServicesOpen(false);
                    }}
                  >
                    Interface de gestion
                  </a>
                </div>
              )}
            </div>

            {/* Desktop Dropdown pour les projets - PROJETS PRO UNIQUEMENT */}
            <div
              className="relative flex items-center"
              ref={projectsDropdownRef}
            >
              <button
                className="text-foreground hover:text-accent transition-colors flex items-center gap-1 py-2"
                onClick={toggleDesktopProjects}
              >
                Mes projets{" "}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isDesktopProjectsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isDesktopProjectsOpen && (
                <div className="absolute top-full left-0 mt-2 py-2 w-64 bg-card rounded-lg shadow-md border border-border z-50">
                  <a
                    href="#projects"
                    className="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("projects");
                    }}
                  >
                    Tous les projets
                  </a>
                  <div className="h-px bg-border my-1" />
                  <div className="px-4 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Projets professionnels
                  </div>
                  {projects.filter(p => p.id === 'alto' || p.id === 'violette').map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between px-4 py-2 text-sm hover:bg-accent/10 group"
                    >
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent flex-1"
                        onClick={(e) => handleVisitSite(e, project)}
                      >
                        {project.title}
                      </a>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleOpenProjectModal(project);
                        }}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#process"
              className="text-foreground hover:text-accent transition-colors py-2 flex items-center"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("process");
              }}
            >
              Comment ça marche ?
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full px-5 py-2 bg-cyan-950 text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("contact");
              }}
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Mobile Navigation avec animations */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              ref={menuRef}
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="lg:hidden fixed left-0 right-0 bottom-0 top-[72px] z-[100] overflow-y-auto h-[calc(100vh-72px)]"
              style={{ 
                pointerEvents: "auto",
                background: 'linear-gradient(to bottom, transparent 0%, hsl(var(--background)/.85) 5%, hsl(var(--background)/.98) 15%, hsl(var(--background)/.95) 100%)'
              }}
            >
              {/* Orbes flottants artistiques */}
              <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-accent/5 to-cyan-500/5 blur-3xl" />
              <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-gradient-to-tr from-teal-500/5 to-emerald-500/5 blur-3xl" />
              
              <div className="container mx-auto px-4 py-6 flex flex-col space-y-6 relative">
                <motion.a
                  href="#about"
                  variants={itemVariants}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("about");
                  }}
                  className="group relative flex items-center justify-between text-foreground py-4 px-4 rounded-xl bg-gradient-to-r from-card/50 to-transparent hover:from-accent/10 hover:to-accent/5 border border-border/30 hover:border-accent/30 transition-all duration-300 overflow-hidden"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="text-lg font-semibold relative z-10 group-hover:text-accent transition-colors">Qui suis-je ?</span>
                  <ChevronRight className="h-5 w-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10" />
                </motion.a>

                <motion.a
                  href="#why-me"
                  variants={itemVariants}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("why-me");
                  }}
                  className="group relative flex items-center justify-between text-foreground py-4 px-4 rounded-xl bg-gradient-to-r from-card/50 to-transparent hover:from-cyan-500/10 hover:to-cyan-500/5 border border-border/30 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="text-lg font-semibold relative z-10 group-hover:text-cyan-400 transition-colors">Pourquoi moi ?</span>
                  <ChevronRight className="h-5 w-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10" />
                </motion.a>

                {/* Menu déroulant mobile pour Mon offre */}
                <motion.div
                  variants={itemVariants}
                  className="relative rounded-xl bg-gradient-to-br from-card/60 to-card/30 border border-border/40 p-4 overflow-hidden"
                >
                  {/* Effet de brillance */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                  
                  <div
                    className="flex items-center justify-between text-foreground hover:text-accent transition-colors cursor-pointer"
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    aria-expanded={isMobileServicesOpen}
                    aria-controls="services-dropdown-mobile"
                  >
                    <span className="text-lg font-semibold">Mon offre</span>
                    <motion.div
                      animate={{ rotate: isMobileServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, type: "spring" }}
                    >
                      <ChevronDown className="h-5 w-5 opacity-60" />
                    </motion.div>
                  </div>

                  <div
                    id="services-dropdown-mobile"
                    className={`transition-all duration-300 mt-4 overflow-hidden ${
                      isMobileServicesOpen
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="space-y-2 pl-4 border-l-2 border-accent/30">
                      <a
                        href="#services"
                        className="group block py-2 px-3 text-base hover:text-accent flex items-center rounded-lg hover:bg-accent/5 transition-all"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick("services");
                        }}
                      >
                        <span className="text-accent mr-3 group-hover:scale-125 transition-transform">•</span>
                        <span className="group-hover:translate-x-1 transition-transform">Ce que je livre</span>
                      </a>
                      <a
                        href="#pour-qui"
                        className="group block py-2 px-3 text-base hover:text-accent flex items-center rounded-lg hover:bg-accent/5 transition-all"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick("pour-qui");
                        }}
                      >
                        <span className="text-accent mr-3 group-hover:scale-125 transition-transform">•</span>
                        <span className="group-hover:translate-x-1 transition-transform">Pour qui ?</span>
                      </a>
                      <a
                        href="#tarifs"
                        className="group block py-2 px-3 text-base hover:text-accent flex items-center rounded-lg hover:bg-accent/5 transition-all"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick("tarifs");
                        }}
                      >
                        <span className="text-accent mr-3 group-hover:scale-125 transition-transform">•</span>
                        <span className="group-hover:translate-x-1 transition-transform">Tarifs & devis</span>
                      </a>
                      <div className="py-2 mt-2 text-xs font-bold text-accent/70 uppercase tracking-widest pl-3 flex items-center gap-2">
                        <div className="h-[1px] w-8 bg-gradient-to-r from-accent/50 to-transparent" />
                        En option
                      </div>
                      <a
                        href="#services"
                        className="group block py-2 px-3 text-base hover:text-accent flex items-center rounded-lg hover:bg-accent/5 transition-all"
                        onClick={(e) => {
                          e.preventDefault();
                          const servicesSection = document.getElementById("services");
                          if (servicesSection) {
                            servicesSection.scrollIntoView({ behavior: "smooth" });
                            setTimeout(() => {
                              const optionsTitle = Array.from(document.querySelectorAll('h3')).find(
                                h3 => h3.textContent?.includes('En option')
                              );
                              if (optionsTitle) {
                                optionsTitle.scrollIntoView({ behavior: "smooth", block: "center" });
                              }
                            }, 500);
                          }
                          setIsMenuOpen(false);
                        }}
                      >
                        <span className="text-accent mr-3 group-hover:scale-125 transition-transform">•</span>
                        <span className="group-hover:translate-x-1 transition-transform">APIs & IA</span>
                      </a>
                      <a
                        href="#services"
                        className="group block py-2 px-3 text-base hover:text-accent flex items-center rounded-lg hover:bg-accent/5 transition-all"
                        onClick={(e) => {
                          e.preventDefault();
                          const servicesSection = document.getElementById("services");
                          if (servicesSection) {
                            servicesSection.scrollIntoView({ behavior: "smooth" });
                            setTimeout(() => {
                              const optionsTitle = Array.from(document.querySelectorAll('h3')).find(
                                h3 => h3.textContent?.includes('En option')
                              );
                              if (optionsTitle) {
                                optionsTitle.scrollIntoView({ behavior: "smooth", block: "center" });
                              }
                            }, 500);
                          }
                          setIsMenuOpen(false);
                        }}
                      >
                        <span className="text-accent mr-2">•</span>
                        Interface de gestion
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Menu déroulant mobile pour les projets */}
                <motion.div
                  variants={itemVariants}
                  className="py-3"
                >
                  {/* Titre du dropdown qui fait le toggle */}
                  <div
                    className="flex items-center justify-between text-foreground cursor-pointer group rounded-xl p-3 bg-gradient-to-r from-card/50 to-card/30 border border-border/50 hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden"
                    onClick={toggleMobileProjects}
                    aria-expanded={isMobileProjectsOpen}
                    aria-controls="projects-dropdown-mobile"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="text-lg font-medium relative z-10 group-hover:text-purple-400 transition-colors">Mes projets</span>
                    <motion.div
                      animate={{ rotate: isMobileProjectsOpen ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="relative z-10"
                    >
                      <ChevronDown className="h-5 w-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </div>

                  {/* Contenu du dropdown - utilisons CSS pour l'animation au lieu de Framer Motion */}
                  <div
                    id="projects-dropdown-mobile"
                    className={`transition-all duration-300 mt-3 overflow-hidden rounded-xl bg-gradient-to-b from-card/60 to-card/30 border border-border/40 relative ${
                      isMobileProjectsOpen
                        ? "max-h-[400px] opacity-100 p-4"
                        : "max-h-0 opacity-0 p-0 border-transparent"
                    }`}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                    <div className="space-y-3 pl-4 border-l-2 border-border">
                          <a
                            href="#projects"
                            className="group/item flex items-center py-2 text-base hover:text-purple-400 transition-colors rounded-lg hover:bg-purple-500/5 px-3"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick("projects");
                            }}
                          >
                            <span className="text-purple-400 mr-2 transition-transform group-hover/item:scale-125">•</span>
                            <span className="transition-transform group-hover/item:translate-x-1">Tous les projets</span>
                          </a>
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-3 mb-2 flex items-center gap-2">
                            Projets professionnels
                            <div className="flex-1 h-[1px] bg-gradient-to-r from-purple-500/50 to-transparent" />
                          </div>
                          {projects.filter(p => p.id === 'alto' || p.id === 'violette').map((project) => (
                            <div key={project.id} className="group/item flex items-center rounded-lg hover:bg-purple-500/5 transition-colors">
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-2 text-base hover:text-purple-400 flex items-center flex-1 px-3 transition-colors"
                                onClick={(e) => handleVisitSite(e, project)}
                              >
                                <span className="text-purple-400 mr-2 transition-transform group-hover/item:scale-125">•</span>
                                <span className="transition-transform group-hover/item:translate-x-1">{project.title}</span>
                              </a>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-10 w-10 min-w-10 p-0 hover:bg-purple-500/20 hover:text-purple-400 transition-colors rounded-lg"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleOpenProjectModal(project);
                                }}
                              >
                                <Info className="h-5 w-5" />
                              </Button>
                            </div>
                          ))}
                    </div>
                  </div>
                </motion.div>

                <motion.a
                  href="#process"
                  variants={itemVariants}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("process");
                  }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center justify-between text-foreground py-3 transition-all duration-300 rounded-xl p-3 bg-gradient-to-r from-card/50 to-card/30 border border-border/50 hover:border-emerald-500/50 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="text-lg font-medium relative z-10 group-hover:text-emerald-400 transition-colors">Comment ça marche ?</span>
                  <ChevronRight className="h-5 w-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10" />
                </motion.a>

                <motion.div variants={itemVariants} className="pt-6 flex justify-end">
                  <motion.a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("contact");
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-accent/95 to-accent text-white font-medium rounded-full transition-all duration-200 relative overflow-hidden shadow-md hover:shadow-lg hover:shadow-accent/25"
                  >
                    {/* Effet de brillance subtil */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                    <span className="relative z-10">Contact</span>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
