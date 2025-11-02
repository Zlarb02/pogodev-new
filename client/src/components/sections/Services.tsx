import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  ShoppingBag,
  Gift,
  Bot,
  Clock,
  Server,
  LayoutDashboard,
  Database,
  Workflow,
  CheckCheck,
  Box,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
                <Sparkles className="h-8 w-8 flex-shrink-0" />
                <h4 className="text-lg font-semibold text-foreground">
                  Pages jolies, rapides et pas chères
                </h4>
              </div>
              <p className="text-muted-foreground">
                Écoconçues pour durer. Livrées très vite.
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

          {/* Encadré Tarif et devis */}
          <motion.div
            id="tarifs"
            className="bg-accent/10 border-2 border-accent/30 p-8 rounded-xl mb-16"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <Server className="h-8 w-8 text-accent flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Tarif et devis
                </h3>
                <p className="text-muted-foreground mb-4">
                  <span className="font-medium text-foreground">Hébergement gratuit</span> sous pogodev.com (comme{" "}
                  <a href="https://vio-lettres.pogodev.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    vio-lettres.pogodev.com
                  </a>
                  ), ou bien vous choisissez votre propre nom de domaine et je me charge de tout.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-start mb-4">
                  <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    <a
                      href="https://www.namecheap.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Vérifier prix et disponibilité
                    </a>
                  </Button>
                </div>
                <p className="text-foreground font-semibold mb-2">
                  Pas de prix affiché ? C'est que ça doit être cher !
                </p>
                <p className="text-muted-foreground mb-3">
                  Pas du tout, j'ai peu de frais et je peux vous assurer que mes prix sont compétitifs.
                  Je fixe un prix pour chaque projet car chaque projet est différent.
                </p>
                <p className="text-foreground font-medium">
                  N'hésitez pas à demander combien ça coûte, promis je ne mords pas et ça ne me dérange pas de vous conseiller gratuitement rapidement sur un projet ou de lever un doute si vous avez une question.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.h3
            className="text-xl font-semibold mb-8 mt-12 text-center"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
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

          {/* Section Dashboards */}
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
              <p className="text-muted-foreground text-lg max-w-4xl">
                Une interface pour prendre le contrôle de votre site : modifier vos textes, changer vos images, gérer vos produits ou vos commandes, sans dépendre de personne. Je construis l'outil qui correspond à votre façon de travailler, pas l'inverse. Selon vos besoins et votre budget, on choisit ensemble la meilleure approche : solution sur-mesure (comme l'interface créée pour l'artisan d'Alto Lille), système de gestion de contenu (CMS), ou outil no-code si c'est ce avec quoi vous désirez travailler — je suis formé et exercé également sur ces technologies. Dans tous les cas, qualité d'utilisation professionnelle garantie. Vous comprenez ce que vous faites, vous gardez le contrôle.
              </p>
            </div>
          </motion.div>

          {/* Principes */}
          <motion.div
            className="bg-accent/10 border-2 border-accent/30 p-8 rounded-xl mb-16"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6 } },
            }}
          >
            <div>
              <h4 className="text-xl font-bold mb-3 text-foreground">
                Mes principes
              </h4>
              <p className="text-accent text-lg font-bold mb-4">
                Sobriété · Performance · Accessibilité · Transparence
              </p>
              <p className="text-muted-foreground mb-3">
                Code lisible et maintenable. Pas de dépendances inutiles. Pas de tracking
                par défaut. Je travaille principalement en code ouvert publiquement.
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
                    href="#process"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("process")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Comment ça marche
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

        </div>
      </div>
    </section>
  );
}
