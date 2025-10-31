import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
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
  Box,
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
          <motion.p
            className="text-lg text-center mb-8 text-muted-foreground max-w-3xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Sites et applications qui chargent vite, restent simples à héberger,
            et n'embarquent que le nécessaire. Une approche sobre, durable et
            transparente.
          </motion.p>

          <motion.h3
            className="text-xl font-semibold mb-8 flex row gap-3 items-center justify-center"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <CheckCheck className="h-8 w-8 flex-shrink-0" /> Ce que je livre
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
                  Sites vitrines propres
                </h4>
              </div>
              <p className="text-muted-foreground min-h-20">
                Sites vitrines et portfolios performants avec un poids maîtrisé
                et une techno compréhensible.
              </p>
            </motion.div>

            {/* Service 2 */}
            <motion.div
              className="bg-card p-6 rounded-xl shadow-sm"
              variants={fadeInUp}
            >
              <div className="text-accent flex row gap-4 items-center min-h-[64px] mb-4">
                <ShoppingBag className="h-8 w-8 flex-shrink-0" />
                <h4 className="text-lg font-semibold text-foreground">
                  E-commerce / Paiements
                </h4>
              </div>
              <p className="text-muted-foreground min-h-20">
                Boutiques en ligne sécurisées avec Stripe, optimisées pour la
                conversion et la performance.
              </p>
            </motion.div>

            {/* Service 3 */}
            <motion.div
              className="bg-card p-6 rounded-xl shadow-sm"
              variants={fadeInUp}
            >
              <div className="text-accent flex row gap-4 items-center min-h-[64px] mb-4">
                <Box className="h-8 w-8 flex-shrink-0" />
                <h4 className="text-lg font-semibold text-foreground">
                  Petits outils web & 3D
                </h4>
              </div>
              <p className="text-muted-foreground min-h-20">
                Outils web pour la prod ou la communauté, scènes 3D interactives
                (Three.js, React Three Fiber, Blender).
              </p>
            </motion.div>
          </motion.div>

          <motion.h3
            className="text-xl font-semibold mb-8 mt-12"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
          >
            🔧 Options techniques & avancées
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
                  APIs LLM & Automatisations
                </h4>
              </div>
              <p className="text-muted-foreground min-h-24">
                Intégration d'APIs LLM seulement si c'est utile : génération de
                contenu, traitement média, ou outil interne.
              </p>
            </motion.div>

            {/* Option 2 - Alternative-friendly */}
            <motion.div
              className="bg-card p-6 rounded-xl shadow-sm"
              variants={fadeInUp}
            >
              <div className="text-accent flex row gap-4 items-center min-h-[64px] mb-4">
                <Database className="h-6 w-6 flex-shrink-0" />
                <h4 className="text-lg font-semibold text-foreground">
                  Alternative GAFAM
                </h4>
              </div>
              <p className="text-muted-foreground min-h-24">
                Stack sans GAFAM : hébergement perso/VPS, DNS maîtrisé, analytics
                légers, outils open-source. Gardez le contrôle de vos données.
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
                  Déploiement dockerisé
                </h4>
              </div>
              <p className="text-muted-foreground min-h-24">
                Stacks dockerisées déployables avec Traefik/Nginx, pour un
                hébergement simple et évolutif.
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
            {/* Offer 1 - Principes */}
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
                    Mes principes
                  </h4>
                  <p className="text-accent text-lg font-bold mb-3">
                    🌱 Éco-conception · Sobriété · Accessibilité
                  </p>
                  <p className="text-muted-foreground">
                    Pas de dépendances inutiles, pas de tracking par défaut. Du
                    code lisible et maintenable.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Offer 2 - Approche */}
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
                    Façon de travailler
                  </h4>
                  <p className="text-accent text-lg font-bold mb-3">
                    💬 Du besoin réel à la solution adaptée
                  </p>
                  <p className="text-muted-foreground">
                    On part du besoin réel, on choisit la solution la plus
                    adaptée, je livre quelque chose que vous pouvez héberger et
                    faire évoluer sereinement.
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
                  cloud, serveur dédié, ou hébergement de solution légère chez
                  o2switch offert (nom de domaine non inclus).
                </div>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-2 mt-1" />
                <div>
                  Accompagnement dans le choix du nom de domaine (Abonnement
                  annuel à votre charge, vous êtes propriétaire du domaine) —{" "}
                  <a
                    href="https://www.namecheap.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Vérifier prix et disponibilité sur Namecheap
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
              Référencement & visibilité optimisés
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
