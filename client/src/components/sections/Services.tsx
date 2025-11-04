import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  ShoppingBag,
  Bot,
  LayoutDashboard,
  CheckCheck,
  Box,
  Sparkles,
  Palette,
  Building2,
  Wrench,
  Code,
  ReceiptEuro,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageModal } from "@/components/ui/image-modal";

export function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

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
            Des sites <span className="text-cyan-400">rapides</span>, légers, faciles à maintenir. Une approche sobre et pragmatique,
            parce que c'est souvent la plus <span className="text-amber-400">rentable</span> et la plus <span className="text-green-400">durable</span>.
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

          {/* Encadré Tarifs et devis */}
          <motion.div
            id="tarifs"
            className="bg-muted/20 border-2 border-accent/30 p-8 rounded-xl mb-16"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <ReceiptEuro className="h-8 w-8 text-accent flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-6 text-foreground">
                  Tarifs et devis
                </h3>
                
                {/* Hébergement */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-foreground mb-3">
                    Hébergement
                  </h4>
                  <p className="text-muted-foreground mb-3">
                    <span className="font-semibold text-green-400">Inclus gratuitement</span> sur un sous-domaine pogodev.com
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Exemple : <a href="https://vio-lettres.pogodev.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">vio-lettres.pogodev.com</a>
                  </p>
                  <p className="text-muted-foreground mb-3">
                    <span className="font-semibold text-foreground">Votre propre nom de domaine ?</span> Pas de souci.
                  </p>
                  <Button asChild variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    <a
                      href="https://www.namecheap.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Vérifier disponibilité et prix →
                    </a>
                  </Button>
                </div>

                {/* Prix juste */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    Prix juste
                  </h4>
                  <p className="text-muted-foreground mb-2">
                    Pas de grille figée : chaque projet est différent. Je propose un prix clair et un périmètre précis, sans surprise.
                  </p>
                  <p className="text-muted-foreground">
                    Structure légère, solutions sobres. Réduire les coûts ça veut aussi dire réduire le prix.
                  </p>
                </div>

                {/* Posez la question */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    Posez la question
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    Demandez combien ça coûte : je réponds vite et je peux vous conseiller gratuitement pour éclairer votre choix.
                  </p>
                  <Button asChild size="lg" className="shadow-md">
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      On en parle ? 👋
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.h3
            className="text-2xl md:text-3xl font-bold text-center mb-12 mt-16 font-['Poppins'] text-foreground"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
          >
            En option
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {/* Section IA */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-card p-8 rounded-xl shadow-sm border border-border h-full">
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
                  Exemple concret : <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      // Ouvrir directement la modal du projet Mirojo
                      window.dispatchEvent(new CustomEvent('openProjectModal', { 
                        detail: { projectId: 'mirojo' } 
                      }));
                    }}
                    className="text-accent hover:underline font-medium cursor-pointer"
                  >
                    prototype d'application immersive augmentée par IA
                  </a> (génération de contenu dynamique, expérience narrative type AI Dungeon).
                </p>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm font-medium text-foreground mb-3">💬 Un mot sur l'IA</p>
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
                    <span className="italic">Bilan :</span> L'impact environnemental de l'IA est complexe à évaluer. D'un côté, les data centers consomment de l'électricité pour l'entraînement et l'inférence des modèles. De l'autre, l'IA permet un travail plus performant et propre sur le long terme : code de meilleure qualité, moins d'erreurs, révisions plus efficaces. L'IA fait désormais partie intégrante du métier de développeur. La question n'est plus de savoir si on l'utilise, mais comment on l'utilise de manière responsable. Je reste transparent sur mes usages et leurs limites : ni solution miracle, ni catastrophe, mais un outil professionnel que j'utilise avec prudence et discernement.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Section Dashboards */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-card p-8 rounded-xl shadow-sm border border-border h-full">
              <div className="text-accent flex row gap-4 items-center mb-6">
                <LayoutDashboard
                  className="h-8 w-8 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <h4 className="text-2xl font-semibold text-foreground">
                  Interface de gestion sur-mesure
                </h4>
              </div>
              
              {/* Introduction avec mise en valeur */}
              <div className="space-y-5 mb-10 max-w-4xl">
                <p className="text-lg text-foreground/90 leading-relaxed">
                  Une interface pour piloter votre site — modifier vos textes, changer vos images, gérer produits et commandes — <span className="text-green-400">sans dépendre de personne</span>.
                </p>
                
                <p className="text-base text-muted-foreground leading-relaxed">
                  J'adapte l'outil à votre manière de travailler, pas l'inverse.
                </p>
              </div>

              {/* Exemple d'interface */}
              <div className="bg-accent/5 border border-accent/20 rounded-2xl p-4 md:p-6 mb-10">
                <p className="text-sm md:text-base text-foreground font-medium mb-4 text-center">
                  📸 Exemple d'interface créée pour <a href="https://alto-lille.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-semibold">alto-lille.fr</a> — Touchez pour agrandir
                </p>
                <div className="max-w-3xl mx-auto">
                  <div className="space-y-3">
                    <ImageModal
                      src="/images/alto-gestion-textes.webp"
                      alt="Interface de gestion des textes et traductions pour Alto Lille"
                    >
                      <div className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-border hover:border-accent/50 transition-all duration-300 shadow-lg hover:shadow-2xl active:scale-95">
                        <img
                          src="/images/alto-gestion-textes.webp"
                          alt="Interface de gestion des textes et traductions pour Alto Lille"
                          className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Badge permanent sur mobile */}
                        <div className="absolute top-3 right-3 bg-accent/90 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                          </svg>
                          Agrandir
                        </div>
                        {/* Overlay desktop uniquement */}
                        <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end justify-center pb-6">
                          <span className="text-white font-medium text-sm flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                            </svg>
                            Cliquer pour agrandir
                          </span>
                        </div>
                      </div>
                    </ImageModal>
                    <p className="text-xs md:text-sm text-muted-foreground text-center font-medium">
                      🌐 Gestion des textes et traductions
                    </p>
                  </div>
                </div>
              </div>

                {/* Texte subtil sans hiérarchisation */}
                <div className="space-y-5 max-w-4xl text-base text-muted-foreground leading-relaxed">
                  <p>
                    Selon vos besoins et votre budget, on choisit ensemble la meilleure approche : 100% code sur-mesure (comme l'interface créée pour l'artisan d'Alto Lille), CMS, ou no-code si vous préférez — je suis formé et exercé sur ces technologies.
                  </p>
                  
                  <p>
                    Dans tous les cas, qualité d'usage professionnelle : vous comprenez ce que vous faites et <span className="text-green-400">vous gardez le contrôle</span>.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* S ection Pour Qui */}
          <motion.div
            id="pour-qui"
            className="mb-15 -mx-4 px-4 py-12 bg-muted/10"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
              Pour qui ?
            </h3>
            <p className="text-lg text-center mb-12 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Pour celles et ceux qui veulent <span className="text-cyan-400">reprendre la main</span> sur leur présence en ligne, avec des solutions cohérentes, utiles, belles (oui, artistiques) et <span className="text-green-400">écoconçues</span> — des solutions qui vous appartiennent.
            </p>

            {/* Profils en grille compacte */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* Créateurs */}
              <motion.div
                className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-xl border-2 border-accent/30"
                variants={fadeInUp}
              >
                <div className="flex items-start gap-4 mb-3">
                  <Palette className="w-8 h-8 text-accent flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-1">
                      Créateurs et artistes
                    </h4>
                    <p className="text-sm font-medium text-foreground/80 mb-2">
                      Vous désirez créer un espace en ligne unique qui vous ressemble et vous rend service ?
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-2">
                  Portfolio, expérience interactive pédagogique et ludique, campagne de dons... L'imagination est la limite.
                </p>
                <p className="text-foreground/90 text-sm font-medium italic">
                  Imaginons ensemble les expériences web de demain.
                </p>
              </motion.div>

              {/* Médias */}
              <motion.div
                className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-xl border-2 border-accent/30"
                variants={fadeInUp}
              >
                <div className="flex items-start gap-4 mb-3">
                  <Building2 className="w-8 h-8 text-accent flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-1">
                      Médias, associations, coopératives, startups
                    </h4>
                    <p className="text-sm font-medium text-foreground/80 mb-2">
                      Des outils qui grandissent avec vous
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-2">
                  Des outils ouverts qui grandissent avec vous : publication claire, contributions simples pour l'équipe, données chez vous (ou chez moi).
                </p>
                <p className="text-muted-foreground text-sm">
                  Pas de verrouillage, pas de dépendance. Je vous forme et vous accompagne si nécessaire.
                </p>
              </motion.div>

              {/* Artisans */}
              <motion.div
                className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 p-6 rounded-xl border-2 border-accent/30"
                variants={fadeInUp}
              >
                <div className="flex items-start gap-4 mb-3">
                  <Wrench className="w-8 h-8 text-accent flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-1">
                      Artisans, commerçants, indépendants
                    </h4>
                    <p className="text-sm font-medium text-foreground/80 mb-2">
                      Simple, fiable, autonome
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-2">
                  Un site clair pour montrer votre travail, prendre des rendez-vous 📅 et, si besoin, vendre 🛒.
                </p>
                <p className="text-muted-foreground text-sm">
                  Imaginé avec vous, guidé par mon expertise : je vous donne toutes les clés 🔑 pour comprendre ce que le numérique peut faire pour vous, et comment bien faire les choses.
                </p>
              </motion.div>

              {/* Équipes tech */}
              <motion.div
                className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-xl border-2 border-accent/30"
                variants={fadeInUp}
              >
                <div className="flex items-start gap-4 mb-3">
                  <Code className="w-8 h-8 text-accent flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-1">
                      Équipes tech
                    </h4>
                    <p className="text-sm font-medium text-foreground/80 mb-2">
                      Code propre, collaboration sereine
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-2">
                  Je m'intègre à vos équipes et m'adapte à votre stack, j'explique mes choix et je laisse un code propre et maintenable.
                </p>
                <p className="text-muted-foreground text-sm">
                  Communication claire, collaboration sereine 🤝.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Principes */}
          <motion.div
            className="bg-muted/20 border-2 border-accent/30 p-8 rounded-xl mb-16"
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
                Sobriété · Accessibilité · Transparence
              </p>
              <p className="text-muted-foreground mb-3">
                Code lisible et maintenable. Pas de dépendances inutiles. Pas de tracking
                par défaut. Je travaille principalement en code ouvert publiquement.
              </p>
              <p className="text-foreground font-medium mb-2">Un site sobre, c'est :</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Moins cher à héberger</li>
                <li>Moins cher à maintenir</li>
                <li>Accessible sur vieux matériel et connexions faibles</li>
                <li>Moins énergivore</li>
                <li>Moins de failles de sécurité</li>
                <li>Facile à maintenir</li>
                <li>Un contrôle total du design, des données et de l'expérience avec une compréhension profonde du web <span className="text-red-400">♥</span></li>
              </ul>
              <p className="text-foreground font-medium mt-4 italic">
                La sobriété n'est pas qu'une question d'éthique. C'est souvent le choix le plus <span className="text-amber-400">malin</span> !
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
