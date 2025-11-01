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
import { ImageModal } from "@/components/ui/image-modal";

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
            Des sites rapides, légers, faciles à maintenir. Une approche sobre et pragmatique,
            parce que c'est souvent la plus rentable et la plus durable.
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
              className="bg-card p-6 rounded-xl shadow-sm border border-border"
              variants={fadeInUp}
            >
              <div className="text-accent flex row gap-4 items-center min-h-[64px] mb-4">
                <Globe className="h-8 w-8 flex-shrink-0" />
                <h4 className="text-lg font-semibold text-foreground">
                  Web simple
                </h4>
              </div>
              <p className="text-muted-foreground">
                Portfolio artistique avec galerie multimédia, blog pour partager vos idées, campagne de dons pour votre association, site pour présenter votre savoir-faire : un site qui fait exactement ce dont vous avez besoin, sans superflu.
              </p>
              <p className="text-muted-foreground mt-4 text-sm">
                Exemple : <a href="https://vio-lettres.pogodev.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">vio-lettres.pogodev.com</a>
              </p>
            </motion.div>

            {/* Service 2 */}
            <motion.div
              className="bg-card p-6 rounded-xl shadow-sm border border-border"
              variants={fadeInUp}
            >
              <div className="text-accent flex row gap-4 items-center min-h-[64px] mb-4">
                <ShoppingBag className="h-8 w-8 flex-shrink-0" />
                <h4 className="text-lg font-semibold text-foreground">
                  E-commerce sur-mesure
                </h4>
              </div>
              <p className="text-muted-foreground">
                Boutiques en ligne sécurisées avec paiement Stripe. Conçues pour vendre
                efficacement tout en restant rapides.
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                Exemple : <a href="https://alto-lille.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">alto-lille.fr</a>
              </p>
            </motion.div>

            {/* Service 3 */}
            <motion.div
              className="bg-card p-6 rounded-xl shadow-sm border border-border"
              variants={fadeInUp}
            >
              <div className="text-accent flex row gap-4 items-center min-h-[64px] mb-4">
                <Box className="h-8 w-8 flex-shrink-0" />
                <h4 className="text-lg font-semibold text-foreground">
                  Visualisations 3D interactives et ludiques
                </h4>
              </div>
              <p className="text-muted-foreground">
                Scènes 3D pour valoriser un produit ou un concept (Three.js, React Three Fiber).
                Utilisé sur Alto Lille pour présenter leur lampe phare.
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                Exemple : <a href="https://alto-lille.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">alto-lille.fr</a>
              </p>
            </motion.div>
          </motion.div>

          <motion.h3
            className="text-xl font-semibold mb-8 mt-12 text-center"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
          >
            🔧 Options techniques & avancées
          </motion.h3>

          {/* Section IA centrée */}
          <motion.div
            className="max-w-4xl mx-auto mb-12"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
              <div className="text-accent flex row gap-4 items-center mb-6">
                <Bot className="h-8 w-8 flex-shrink-0" />
                <h4 className="text-2xl font-semibold text-foreground">
                  APIs & Automatisations (IA incluse)
                </h4>
              </div>
              <p className="text-muted-foreground mb-4 text-lg">
                Intégration d'APIs — y compris LLM — si ça résout un problème réel.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Exemple concret : prototype d'application immersive augmentée par IA
                (génération de contenu dynamique, expérience narrative type AI Dungeon).
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm font-medium text-foreground mb-3">⚠️ Transparence sur l'IA :</p>
                <p className="text-sm text-muted-foreground mb-3">
                  L'IA est un outil puissant, mais pas sans risques : biais algorithmiques,
                  hallucinations, consommation énergétique, dépendance aux modèles propriétaires.
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  Je l'utilise quand le bénéfice est clair : automatisation de tâches répétitives,
                  gain de temps sur le développement, ou pour des projets de recherche scientifique,
                  artistique ou philosophique qui ont du sens. Pas pour le buzz marketing.
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="italic">Bilan :</span> L'impact environnemental de l'IA est complexe à évaluer. D'un côté, les data centers consomment de l'électricité pour l'entraînement et l'inférence des modèles. De l'autre, l'IA permet un travail plus performant et propre sur le long terme : code de meilleure qualité, moins d'erreurs, révisions plus efficaces. L'IA fait désormais partie intégrante du métier de développeur moderne. La question n'est plus de savoir si on l'utilise, mais comment on l'utilise de manière responsable. Je reste transparent sur mes usages et leurs limites : ni solution miracle, ni catastrophe, mais un outil professionnel que j'utilise avec prudence et discernement.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section Dashboards avec images */}
          <motion.div
            className="max-w-6xl mx-auto mb-16"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
              <div className="text-accent flex row gap-4 items-center mb-6">
                <LayoutDashboard
                  className="h-8 w-8 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <h4 className="text-2xl font-semibold text-foreground">
                  Interface de gestion sur-mesure
                </h4>
              </div>
              <p className="text-muted-foreground mb-8 text-lg max-w-4xl">
                Une interface pour prendre le contrôle de votre site : modifier vos textes, changer vos images, gérer vos produits ou vos commandes, sans dépendre de personne. Je construis l'outil qui correspond à votre façon de travailler, pas l'inverse. Selon vos besoins et votre budget, on choisit ensemble la meilleure approche : solution sur-mesure (comme l'interface créée pour l'artisan d'Alto Lille), système de gestion de contenu (CMS), ou outil no-code si c'est ce avec quoi vous désirez travailler — je suis formé et exercé également sur ces technologies. Dans tous les cas, qualité d'utilisation professionnelle garantie. Vous comprenez ce que vous faites, vous gardez le contrôle.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ImageModal 
                  src="/images/dashboard-placeholder-1.avif"
                  alt="Dashboard d'administration Alto Lille - Interface de gestion des produits"
                  className="group"
                >
                  <div className="aspect-[16/10] bg-muted rounded-xl overflow-hidden shadow-lg border-2 border-border hover:border-accent/50 transition-all duration-300">
                    <img
                      src="/images/dashboard-placeholder-1.avif"
                      alt="Dashboard admin exemple 1"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </ImageModal>
                
                <ImageModal 
                  src="/images/dashboard-placeholder-2.avif"
                  alt="Dashboard d'administration Alto Lille - Interface de gestion des commandes"
                  className="group"
                >
                  <div className="aspect-[16/10] bg-muted rounded-xl overflow-hidden shadow-lg border-2 border-border hover:border-accent/50 transition-all duration-300">
                    <img
                      src="/images/dashboard-placeholder-2.avif"
                      alt="Dashboard admin exemple 2"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </ImageModal>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground italic">
                  ✨ Cliquez sur les images pour les voir en grand • Exemple : interface de gestion créée pour
                  l'artisan d'Alto Lille, qui gère sa boutique en ligne en toute autonomie
                </p>
              </div>
            </div>
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
              className="bg-accent/10 border-2 border-accent/30 p-8 rounded-xl"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
              }}
            >
              <div>
                <h4 className="text-xl font-bold mb-3 text-foreground">
                  Mes principes
                </h4>
                <p className="text-accent text-lg font-bold mb-4">
                  Sobriété · Performance · Accessibilité
                </p>
                <p className="text-muted-foreground mb-3">
                  Code lisible et maintenable. Pas de dépendances inutiles. Pas de tracking
                  par défaut.
                </p>
                <p className="text-foreground font-medium mb-2">Un site sobre, c'est :</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Plus rapide</li>
                  <li>Moins cher à héberger</li>
                  <li>Accessible sur vieux matériel et connexions faibles</li>
                  <li>Moins énergivore</li>
                  <li>Moins de failles de sécurité</li>
                  <li>Facile à maintenir</li>
                </ul>
                <p className="text-foreground font-medium mt-4 italic">
                  La sobriété n'est pas qu'une question d'éthique. C'est souvent la solution
                  la plus rentable.
                </p>
              </div>
            </motion.div>

            {/* Offer 2 - Approche */}
            <motion.div
              className="bg-accent/10 border-2 border-accent/30 p-8 rounded-xl"
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
              }}
            >
              <div>
                <h4 className="text-xl font-bold mb-3 text-foreground">
                  Façon de travailler
                </h4>
                <p className="text-accent text-lg font-bold mb-4">
                  Du besoin réel à la solution adaptée
                </p>
                <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                  <li>
                    On discute de ce dont vous avez vraiment besoin (pas seulement ce que vous pensez
                    vouloir, ou de ce que j'ai envie de vendre, non : on prend le temps de réfléchir ensemble au besoin réel).
                  </li>
                  <li>
                    Je vous propose la solution la plus adaptée, et je vous montre un prototype dans l'heure suivant l'appel.
                  </li>
                  <li>
                    Vous décidez de la suite.
                  </li>
                </ol>
                <p className="text-foreground font-medium mt-4">
                  Pas de bullshit. Pas de vente forcée de technologies à la mode.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mb-16 overflow-hidden"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.8 }}
          >
            <div className="bg-gradient-to-br from-accent/20 via-accent/10 to-transparent p-12 rounded-2xl border-2 border-accent/30 shadow-lg">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-3xl font-bold mb-4 text-foreground">
                  Prêt à démarrer votre projet ?
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Discutons de vos besoins. Je vous propose un prototype dans l'heure
                  qui suit notre premier échange.
                </p>
                <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all">
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
              </div>
            </div>
          </motion.div>

          {/* Hosting info */}
          <motion.div
            className="bg-card p-8 rounded-xl shadow-sm mb-16 border border-border"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.9 }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center text-foreground">
              <Server className="h-6 w-6 mr-2 text-accent" />
              Hébergement & accompagnement
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                <div>
                  Choix de l'hébergement adapté.
                </div>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                <div>
                  Accompagnement choix du domaine (vous restez propriétaire, abonnement annuel
                  ~10-100€/an). Vérifier prix et dispo sur{" "}
                  <a
                    href="https://www.namecheap.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Namecheap
                  </a>
                  .
                </div>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                <div>
                  Formation offerte sur les outils pour vous rendre autonome si besoin.
                </div>
              </li>
            </ul>
          </motion.div>

          {/* SEO & Modern Referencing */}
          <motion.div
            className="bg-card p-8 rounded-xl shadow-sm border border-border"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 1.0 }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center text-foreground">
              <Search className="h-6 w-6 mr-2 text-accent" />
              Référencement & visibilité
            </h3>

            <p className="mb-6 text-muted-foreground">
              Chaque projet est optimisé pour le référencement dès la conception :
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Zap className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">
                      SEO technique
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Structure HTML sémantique, Core Web Vitals optimisés,
                      métadonnées complètes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Smartphone className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">
                      Mobile-first
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Google privilégie les sites mobiles performants.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <LineChart className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">
                      Analytics respectueux
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Plausible ou Matomo (alternatives à Google Analytics).
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">
                      Optimisation locale ou globale
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Selon votre cible.
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
