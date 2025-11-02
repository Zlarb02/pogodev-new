import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  MessageCircle,
  Github,
  Linkedin,
} from "lucide-react";

export function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* CTA principal */}
          <motion.div
            className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 text-center border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="max-w-lg mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Prêt à démarrer ?</h3>

              <div className="bg-accent/10 border-2 border-accent/30 rounded-lg p-4 mb-6">
                <p className="text-foreground font-semibold text-lg mb-2">
                  Je privilégie les échanges simples et directs. <br /> Un SMS
                  suffit pour lancer la discussion.
                </p>
              </div>

              <p className="text-muted-foreground mb-6">
                Envoyez-moi un message avec votre idée de projet.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
                <a
                  href="sms:0771853328"
                  className="inline-flex items-center px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent/90 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  07 71 85 33 28
                </a>

                <a
                  href="#tarifs"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("tarifs")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center px-6 py-3 bg-card border-2 border-accent/30 text-foreground rounded-xl hover:bg-accent/10 transition-all font-medium text-base shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  Tarifs et devis ?
                </a>
              </div>

              <p className="text-xs text-muted-foreground mt-2">
                Cliquez pour ouvrir votre application SMS depuis un téléphone.
              </p>
            </div>
          </motion.div>

          {/* Liens sociaux */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-muted-foreground mb-4">Ou retrouvez-moi sur :</p>
            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/zlarb02"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-card rounded-full flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all transform hover:scale-110 shadow-sm"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/etiennepogoda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-card rounded-full flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all transform hover:scale-110 shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
