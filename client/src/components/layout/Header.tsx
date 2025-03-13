import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Handle scroll event to change header style
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = () => {
    // Close mobile menu when clicking on a link
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <a className="text-xl font-semibold text-primary font-['Poppins']">
            pogodev<span className="text-accent">.com</span>
          </a>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="lg:hidden focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          <a href="#about" className="text-primary hover:text-accent transition-colors">Qui suis-je ?</a>
          <a href="#why-me" className="text-primary hover:text-accent transition-colors">Pourquoi moi ?</a>
          <a href="#services" className="text-primary hover:text-accent transition-colors">Mon offre</a>
          <a href="#projects" className="text-primary hover:text-accent transition-colors">Projets</a>
          <a href="#process" className="text-primary hover:text-accent transition-colors">Processus</a>
          <a href="#contact" className="inline-flex items-center justify-center rounded-full px-5 py-2 bg-accent text-white hover:bg-blue-600 transition-colors">Contact</a>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`lg:hidden bg-white w-full ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <a href="#about" onClick={handleNavClick} className="text-primary hover:text-accent py-2 transition-colors">Qui suis-je ?</a>
          <a href="#why-me" onClick={handleNavClick} className="text-primary hover:text-accent py-2 transition-colors">Pourquoi moi ?</a>
          <a href="#services" onClick={handleNavClick} className="text-primary hover:text-accent py-2 transition-colors">Mon offre</a>
          <a href="#projects" onClick={handleNavClick} className="text-primary hover:text-accent py-2 transition-colors">Projets</a>
          <a href="#process" onClick={handleNavClick} className="text-primary hover:text-accent py-2 transition-colors">Processus</a>
          <a href="#contact" onClick={handleNavClick} className="w-full text-center px-5 py-2 bg-accent text-white rounded-full hover:bg-blue-600 transition-colors">Contact</a>
        </div>
      </div>
    </header>
  );
}
