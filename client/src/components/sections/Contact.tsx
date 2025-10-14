import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  MessageCircle,
  Phone,
  Github,
  Linkedin,
  Zap,
  Clock,
} from "lucide-react";

export function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center mb-6 font-['Poppins'] text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Parlons de votre projet
        </motion.h2>

        <motion.p
          className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Une idée de projet web ? Prenez contact, je vous rappelle par SMS !
        </motion.p>

        <div className="max-w-4xl mx-auto">
          {/* Cards avec processus */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              className="bg-card rounded-xl p-6 text-center shadow-sm border border-accent/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">1. Vous m'écrivez</h3>
              <p className="text-sm text-muted-foreground">
                Décrivez-moi votre projet en quelques mots par SMS
              </p>
            </motion.div>

            <motion.div
              className="bg-card rounded-xl p-6 text-center shadow-sm border border-accent/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">2. Je vous rappelle</h3>
              <p className="text-sm text-muted-foreground">
                Réponse rapide par SMS pour planifier un échange
              </p>
            </motion.div>

            <motion.div
              className="bg-card rounded-xl p-6 text-center shadow-sm border border-accent/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">3. On discute projet</h3>
              <p className="text-sm text-muted-foreground">
                Échange approfondi pour concrétiser votre vision
              </p>
            </motion.div>
          </div>

          {/* CTA principal */}
          <motion.div
            className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 text-center border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="max-w-lg mx-auto">
              <h3 className="text-2xl font-bold mb-4">Prêt à démarrer ?</h3>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-amber-800 font-semibold text-lg mb-2">
                  ⚠️ SMS UNIQUEMENT
                </p>
                <p className="text-amber-700 text-sm">
                  Je ne réponds qu'aux SMS, pas aux appels téléphoniques
                </p>
              </div>

              <p className="text-muted-foreground mb-6">
                Envoyez-moi un message avec votre idée de projet.
              </p>

              <a
                href="sms:0771853328"
                className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                07 71 85 33 28
              </a>

              <p className="text-xs text-muted-foreground mt-4">
                Cliquez pour ouvrir votre app SMS directement
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
