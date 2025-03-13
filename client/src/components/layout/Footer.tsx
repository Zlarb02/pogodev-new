import { Link } from 'wouter';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary mb-4 md:mb-0">
            &copy; {currentYear} pogodev.com - Tous droits réservés
          </p>
          
          <div className="flex space-x-6">
            <a href="#contact" className="text-secondary hover:text-accent transition-colors">Contact</a>
            <a href="#about" className="text-secondary hover:text-accent transition-colors">À propos</a>
            <a href="#services" className="text-secondary hover:text-accent transition-colors">Services</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
