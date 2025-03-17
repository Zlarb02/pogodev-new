import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Séparons les états des dropdowns pour desktop et mobile
  const [isDesktopProjectsOpen, setIsDesktopProjectsOpen] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);

  const projectsDropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Si le menu est fermé, fermer aussi le dropdown des projets
    if (!isMenuOpen) {
      setIsMobileProjectsOpen(false);
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

  useEffect(() => {
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

  const handleNavClick = (sectionId?: string) => {
    // Close mobile menu when clicking on a link
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }

    // Close projects dropdowns
    setIsDesktopProjectsOpen(false);
    setIsMobileProjectsOpen(false);

    // Scroll to the section if an ID is provided
    if (sectionId) {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Liste des projets
  const projects = [
    {
      name: "E-commerce produits numériques",
      id: "shop",
      url: "https://shop.pogodev.com",
    },
    {
      name: "Site vitrine freelance",
      id: "anais",
      url: "https://anais.pogodev.com",
    },
    {
      name: "Portfolio interactif 3D",
      id: "scene",
      url: "https://scene.pogodev.com",
    },
    { name: "Mirojo.app", id: "mirojo", url: "https://mirojo.app" },
    { name: "Violette", id: "violette", url: "https://violette.pogodev.com" },
    { name: "GrooveGather", id: "groove", url: "https://groovegather.fr" },
  ];

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

  // Version simplifiée de l'animation de dropdown
  const dropdownVariants = {
    closed: {
      height: 0,
      opacity: 0,
      overflow: "hidden",
    },
    open: {
      height: "auto",
      opacity: 1,
      overflow: "hidden",
    },
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-sm shadow-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <img src="/assets/logo-large.svg" alt="Logo" className="h-20 w-auto" />
        <Link href="/">
          <div className="text-xl font-semibold text-primary font-['Poppins'] cursor-pointer">
            pogodev<span className="text-accent">.com</span>
          </div>
        </Link>

        {/* Mobile menu button */}
        <button
          className="lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md p-1"
          onClick={toggleMenu}
          aria-label="Menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
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
          <a
            href="#why-me"
            className="text-foreground hover:text-accent transition-colors py-2 flex items-center"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("why-me");
            }}
          >
            Pourquoi moi ?
          </a>
          <a
            href="#services"
            className="text-foreground hover:text-accent transition-colors py-2 flex items-center"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("services");
            }}
          >
            Mon offre
          </a>
          {/* Desktop Dropdown pour les projets */}
          <div className="relative flex items-center" ref={projectsDropdownRef}>
            <a
              href="#projects"
              className="text-foreground hover:text-accent transition-colors flex items-center gap-1 py-2"
              onClick={toggleDesktopProjects}
            >
              Mes projets{" "}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isDesktopProjectsOpen ? "rotate-180" : ""
                }`}
              />
            </a>
            {isDesktopProjectsOpen && (
              <div className="absolute top-full left-0 mt-2 py-2 w-56 bg-card rounded-lg shadow-md border border-border z-50">
                <a
                  href="#projects"
                  className="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("projects");
                  }}
                >
                  Tous les projets
                </a>
                {projects.map((project) => (
                  <a
                    key={project.id}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent"
                    onClick={() => setIsDesktopProjectsOpen(false)}
                  >
                    {project.name}
                  </a>
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
            Processus
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
            className="lg:hidden fixed left-0 right-0 bottom-0 top-[72px] z-[100] bg-background/95 backdrop-blur-md overflow-y-auto h-[calc(100vh-72px)]"
            style={{ pointerEvents: "auto" }}
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-6 relative">
              <motion.a
                href="#about"
                variants={itemVariants}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("about");
                }}
                className="flex items-center justify-between text-foreground hover:text-accent py-3 border-b border-border/40 transition-colors"
              >
                <span className="text-lg font-medium">Qui suis-je ?</span>
                <ChevronRight className="h-5 w-5 opacity-60" />
              </motion.a>

              <motion.a
                href="#why-me"
                variants={itemVariants}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("why-me");
                }}
                className="flex items-center justify-between text-foreground hover:text-accent py-3 border-b border-border/40 transition-colors"
              >
                <span className="text-lg font-medium">Pourquoi moi ?</span>
                <ChevronRight className="h-5 w-5 opacity-60" />
              </motion.a>

              <motion.a
                href="#services"
                variants={itemVariants}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("services");
                }}
                className="flex items-center justify-between text-foreground hover:text-accent py-3 border-b border-border/40 transition-colors"
              >
                <span className="text-lg font-medium">Mon offre</span>
                <ChevronRight className="h-5 w-5 opacity-60" />
              </motion.a>

              {/* Menu déroulant mobile pour les projets - VERSION SIMPLIFIÉE */}
              <motion.div
                variants={itemVariants}
                className="py-3 border-b border-border/40"
              >
                {/* Titre du dropdown qui fait le toggle */}
                <div
                  className="flex items-center justify-between text-foreground hover:text-accent transition-colors cursor-pointer"
                  onClick={toggleMobileProjects}
                  aria-expanded={isMobileProjectsOpen}
                  aria-controls="projects-dropdown-mobile"
                >
                  <span className="text-lg font-medium">Mes projets</span>
                  <motion.div
                    animate={{ rotate: isMobileProjectsOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 opacity-60" />
                  </motion.div>
                </div>

                {/* Contenu du dropdown - utilisons CSS pour l'animation au lieu de Framer Motion */}
                <div
                  id="projects-dropdown-mobile"
                  className={`transition-all duration-300 mt-4 overflow-hidden ${
                    isMobileProjectsOpen
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-3 pl-4 border-l-2 border-border">
                    <a
                      href="#projects"
                      className="block py-2 text-base hover:text-accent flex items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick("projects");
                      }}
                    >
                      <span className="text-accent mr-2">•</span>
                      Tous les projets
                    </a>
                    {projects.map((project) => (
                      <a
                        key={project.id}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-2 text-base hover:text-accent flex items-center"
                        onClick={() => setIsMobileProjectsOpen(false)}
                      >
                        <span className="text-accent mr-2">•</span>
                        {project.name}
                      </a>
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
                className="flex items-center justify-between text-foreground hover:text-accent py-3 border-b border-border/40 transition-colors"
              >
                <span className="text-lg font-medium">Processus</span>
                <ChevronRight className="h-5 w-5 opacity-60" />
              </motion.a>

              <motion.div variants={itemVariants} className="pt-6">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("contact");
                  }}
                  className="block w-full text-center px-5 py-3.5 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Contact
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
