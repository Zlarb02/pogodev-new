import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
  Code,
  ShoppingBag,
  Gift,
  Bot,
  Clock,
  Server,
  Check,
  LayoutDashboard,
  Database,
  Workflow,
  Search,
  Smartphone,
  LineChart,
  Zap,
  CheckCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center mb-12 font-['Poppins'] text-foreground"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Mon offre
        </motion.h2>

        <div className="max-w-5xl mx-auto">
          <motion.h3
            className="text-xl font-semibold mb-8 flex row gap-3 items-center justify-center"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <CheckCheck className="h-8 w-8 flex-shrink-0" /> Ce que je peux
            réaliser pour vous
          </motion.h3>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Service 1 */}
            <motion.div
              className="bg-card p-6 rounded-xl shadow-sm"
              variants={fadeInUp}
            >
              <div className="text-accent flex row gap-4 items-center min-h-[64px] mb-4">
                <Globe className="h-8 w-8 flex-shrink-0" />
                <h4 className="text-lg font-semibold text-foreground">
                  Sites vitrines & portfolios
                </h4>
              </div>
              <p className="text-muted-foreground min-h-20">
                Sites vitrines et portfolios professionnels pour présenter votre
                activité et vos réalisations avec élégance.
              </p>
            </motion.div>

            {/* Service 2 */}
            <motion.div
              className="bg-card p-6 rounded-xl shadow-sm"
              variants={fadeInUp}
            >
              <div className="text-accent flex row gap-4 items-center min-h-[64px] mb-4">
                <Code className="h-8 w-8 flex-shrink-0" />
                <h4 className="text-lg font-semibold text-foreground">
                  Applications web
                </h4>
              </div>
              <p className="text-muted-foreground min-h-20">
                Applications web sur-mesure et performantes, conçues pour
                répondre précisément à vos besoins spécifiques.
              </p>
            </motion.div>

            {/* Service 3 */}
            <motion.div
              className="bg-card p-6 rounded-xl shadow-sm"
              variants={fadeInUp}
            >
              <div className="text-accent flex row gap-4 items-center min-h-[64px] mb-4">
                <ShoppingBag className="h-8 w-8 flex-shrink-0" />
                <h4 className="text-lg font-semibold text-foreground">
                  Boutiques en ligne
                </h4>
              </div>
              <p className="text-muted-foreground min-h-20">
                E-commerce sécurisé et optimisé pour commercialiser efficacement
                vos produits ou services en ligne.
              </p>
            </motion.div>
          </motion.div>

          <motion.h3
            className="text-xl font-semibold mb-8"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
          >
            🔧 En option selon besoins :
          </motion.h3>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delayChildren: 0.4 }}
          >
            {/* Option 1 - Automatisations */}
            <motion.div
              className="bg-card p-6 rounded-xl shadow-sm"
              variants={fadeInUp}
            >
              <div className="text-accent flex row gap-4 items-center min-h-[64px] mb-4">
                <Bot className="h-6 w-6 flex-shrink-0" />
                <h4 className="text-lg font-semibold text-foreground">
                  Automatisations métiers
                </h4>
              </div>
              <p className="text-muted-foreground min-h-24">
                Intégration d'IA et d'APIs sur-mesure pour automatiser vos
                processus et optimiser votre productivité.
              </p>
            </motion.div>

            {/* Option 2 - Auto-hébergement */}
            <motion.div
              className="bg-card p-6 rounded-xl shadow-sm"
              variants={fadeInUp}
            >
              <div className="text-accent flex row gap-4 items-center min-h-[64px] mb-4">
                <Database className="h-6 w-6 flex-shrink-0" />
                <h4 className="text-lg font-semibold text-foreground">
                  Solutions auto-hébergées
                </h4>
              </div>
              <p className="text-muted-foreground min-h-24">
                Contrôle total sur vos données et réduction des coûts avec des
                déploiements éco-conçus sur votre infrastructure.
              </p>
            </motion.div>

            {/* Option 3 - CI/CD */}
            <motion.div
              className="bg-card p-6 rounded-xl shadow-sm"
              variants={fadeInUp}
            >
              <div className="text-accent flex row gap-4 items-center min-h-[64px] mb-4">
                <Workflow className="h-6 w-6 flex-shrink-0" />
                <h4 className="text-lg font-semibold text-foreground">
                  CI/CD simples
                </h4>
              </div>
              <p className="text-muted-foreground min-h-24">
                Pipelines de déploiement automatisés pour des mises à jour
                fluides et des interventions rapides sur vos projets.
              </p>
            </motion.div>

            {/* Option 4 - Dashboards */}
            <motion.div
              className="bg-card p-6 rounded-xl shadow-sm"
              variants={fadeInUp}
            >
              <div className="text-accent flex row gap-4 items-center min-h-[64px] mb-4">
                <LayoutDashboard
                  className="h-6 w-6 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <h4 className="text-lg font-semibold text-foreground">
                  Dashboards d'administration
                </h4>
              </div>
              <p className="text-muted-foreground min-h-24">
                Interfaces de gestion intuitives pour piloter votre contenu en
                toute autonomie, sans compétence technique.
              </p>
            </motion.div>
          </motion.div>

          {/* Special offers */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.6 },
              },
            }}
          >
            {/* Offer 1 */}
            <motion.div
              className="bg-accent/10 border border-accent/20 p-6 rounded-xl"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
              }}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-cyan-950 text-white rounded-full p-3 mr-4">
                  <Gift className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Tarif préférentiel
                  </h4>
                  <p className="text-accent text-lg font-bold mb-3">
                    🎁 -50% pour mes 2 premiers clients
                  </p>
                  <p className="text-muted-foreground">
                    Profitez d'un tarif exceptionnel pour le lancement de mon
                    activité, en échange de votre confiance.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Offer 2 */}
            <motion.div
              className="bg-accent/10 border border-accent/20 p-6 rounded-xl"
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
              }}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-cyan-950 text-white rounded-full p-3 mr-4">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    Livraison adaptée
                  </h4>
                  <p className="text-accent text-lg font-bold mb-3">
                    ⚡ Délais adaptés à votre projet
                  </p>
                  <p className="text-muted-foreground">
                    Quelques jours pour un site simple, plusieurs semaines pour
                    une application complète, avec étapes claires et
                    accompagnement.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.8 }}
          >
            <Button asChild size="lg">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Obtenez un devis personnalisé
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 ml-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </Button>
          </motion.div>

          {/* Hosting info */}
          <motion.div
            className="bg-card p-8 rounded-xl shadow-sm mb-16"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.9 }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center text-foreground">
              <Server className="h-6 w-6 mr-2 text-accent" />
              Hébergement & accompagnement sur-mesure
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-2 mt-1" />
                <div>
                  Je vous aide à choisir l'hébergement le plus adapté : VPS,
                  cloud, serveur dédié, ou hébergement statique sur o2switch
                  (inclus).
                </div>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-2 mt-1" />
                <div>
                  Nom de domaine à votre charge —{" "}
                  <a
                    href="https://www.namecheap.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Vérifier ici sur Namecheap
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-2 mt-1" />
                <div>
                  Solutions évolutives possibles avec forfait hébergement et
                  support technique à l'heure pour vous accompagner si besoin.
                </div>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-2 mt-1" />
                <div>
                  Formation offerte sur CMS ou outils pour vous rendre le plus
                  autonome possible.
                </div>
              </li>
            </ul>
          </motion.div>

          {/* SEO & Modern Referencing */}
          <motion.div
            className="bg-card p-8 rounded-xl shadow-sm"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 1.0 }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center text-foreground">
              <Search className="h-6 w-6 mr-2 text-accent" />
              Référencement & Visibilité optimisés
            </h3>

            <p className="mb-6 text-muted-foreground">
              Chaque projet est conçu avec le référencement au cœur des
              priorités :
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Zap className="h-5 w-5 text-accent mr-2 mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">
                      SEO technique optimisé
                    </h4>
                    <p className="text-muted-foreground">
                      Structure, vitesse, balisage sémantique et métadonnées
                      optimisés.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Smartphone className="h-5 w-5 text-accent mr-2 mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">
                      Mobile-first & Responsive
                    </h4>
                    <p className="text-muted-foreground">
                      Expérience utilisateur fluide sur tous les appareils,
                      critère essentiel pour Google.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <LineChart className="h-5 w-5 text-accent mr-2 mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">
                      Analytics & Mesure d'impact
                    </h4>
                    <p className="text-muted-foreground">
                      Outils de suivi respectueux de la vie privée pour analyser
                      et améliorer votre visibilité.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-accent mr-2 mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">
                      Optimisation locale & globale
                    </h4>
                    <p className="text-muted-foreground">
                      Stratégies adaptées pour renforcer votre présence en ligne
                      locale ou internationale.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-accent/10 text-accent">
                Schema.org
              </Badge>
              <Badge variant="outline" className="bg-accent/10 text-accent">
                Core Web Vitals
              </Badge>
              <Badge variant="outline" className="bg-accent/10 text-accent">
                SSR/SSG
              </Badge>
              <Badge variant="outline" className="bg-accent/10 text-accent">
                HTTPS
              </Badge>
              <Badge variant="outline" className="bg-accent/10 text-accent">
                Sitemap XML
              </Badge>
              <Badge variant="outline" className="bg-accent/10 text-accent">
                Open Graph
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
