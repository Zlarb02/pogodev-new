import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  MessageCircle,
  Github,
  Linkedin,
  ReceiptEuro,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RobustContactForm } from "@/components/RobustContactForm";
import { Button } from "@/components/ui/button";

export function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeTab, setActiveTab] = useState("form");

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Contact
        </motion.h2>

        {/* Bouton Tarifs et devis */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-accent/40 text-foreground hover:bg-accent/10 hover:border-accent"
          >
            <a
              href="#tarifs"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("tarifs")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <ReceiptEuro className="w-5 h-5 mr-2" />
              Tarifs et devis
            </a>
          </Button>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="form">Formulaire</TabsTrigger>
              <TabsTrigger value="direct">Contact direct</TabsTrigger>
            </TabsList>

            <TabsContent value="form" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <RobustContactForm />
              </motion.div>
            </TabsContent>

            <TabsContent value="direct" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* CTA principal */}
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 text-center border border-primary/20">
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

                    <div className="flex justify-center mb-4">
                      <a
                        href="sms:0771853328"
                        className="inline-flex items-center px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent/90 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
                      >
                        <MessageCircle className="w-5 h-5 mr-3" />
                        07 71 85 33 28
                      </a>
                    </div>

                    <p className="text-xs text-muted-foreground mt-2">
                      Cliquez pour ouvrir votre application SMS depuis un téléphone.
                    </p>
                  </div>
                </div>

                {/* Liens sociaux */}
                <div className="text-center mt-12">
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
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
