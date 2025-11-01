import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Leaf,
  Zap,
  Code2,
  Image as ImageIcon,
  Database,
  Globe,
  Settings,
  TrendingDown,
  Award,
  BookOpen,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CarbonCalculator } from "@/components/CarbonCalculator";

export default function EcoConception() {
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
    <div className="min-h-screen bg-background" ref={sectionRef}>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-accent/10 p-4 rounded-full">
                <Leaf className="h-12 w-12 text-accent" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              L'éco-conception web : pourquoi ça marche (et pourquoi c'est rentable)
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
              Créer des sites performants, sobres et accessibles. Pas par militantisme,
              mais parce que les chiffres parlent d'eux-mêmes : ça coûte moins cher,
              ça charge plus vite, et ça convertit mieux.
            </p>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Voici comment ça marche, avec des données vérifiables.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pourquoi l'éco-conception */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="text-3xl font-bold mb-8 text-foreground"
              variants={fadeInUp}
            >
              Pourquoi s'en préoccuper ?
            </motion.h2>

            <motion.div className="grid md:grid-cols-3 gap-6 mb-8" variants={staggerContainer}>
              <motion.div variants={fadeInUp}>
                <Card className="p-6 h-full border-border">
                  <TrendingDown className="h-8 w-8 text-accent mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Impact environnemental mesurable</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Le numérique représente 4% des émissions mondiales de CO₂ (source : The Shift
                    Project, 2019). C'est plus que l'aviation civile.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Chaque octet transféré consomme de l'énergie (serveur + réseau + terminal).
                    Moins il y en a, moins ça coûte — en euros et en CO₂.
                  </p>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="p-6 h-full border-border">
                  <Zap className="h-8 w-8 text-accent mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Performance = argent</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Un site éco-conçu charge 2 à 3 fois plus vite (mesures Lighthouse).
                  </p>
                  <p className="text-muted-foreground text-sm font-medium mb-2">Impact direct :</p>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>+1s de temps de chargement = -7% de conversions (Akamai)</li>
                    <li>Google pénalise les sites lents dans le ranking SEO</li>
                    <li>Serveurs moins puissants = facture d'hébergement réduite</li>
                  </ul>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="p-6 h-full border-border">
                  <Award className="h-8 w-8 text-accent mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Accessibilité = inclusivité</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Sites légers = utilisables sur connexions faibles (3G, zones rurales) et
                    vieux appareils (smartphones 2016-2018).
                  </p>
                  <p className="text-muted-foreground text-sm">
                    En France, 13% de la population n'a pas accès au haut débit (ARCEP, 2023).
                    Un site de 5 Mo est inutilisable pour ces profils. Un site de 500 Ko, oui.
                  </p>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Principes clés */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            className="text-3xl font-bold mb-8 text-foreground"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <BookOpen className="inline h-8 w-8 mr-3 text-accent" />
            Les 6 piliers de l'éco-conception
          </motion.h2>

          <motion.div
            className="space-y-6"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* 1. Optimisation des images */}
            <motion.div variants={fadeInUp}>
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <ImageIcon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      1. Optimisation des images
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Les images = 50% du poids d'une page en moyenne (HTTPArchive, 2024).
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          Formats modernes
                        </Badge>
                        <span className="text-muted-foreground">
                          WebP (-30%), AVIF (-50% vs JPEG)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          Compression
                        </Badge>
                        <span className="text-muted-foreground">
                          Qualité 80-85% (perte imperceptible à l'œil)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          Lazy loading
                        </Badge>
                        <span className="text-muted-foreground">
                          Charger seulement au scroll
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          Dimensions adaptées
                        </Badge>
                        <span className="text-muted-foreground">
                          Pas d'image 4K pour un thumbnail 300px
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-accent mt-3 font-medium">
                      Résultat mesuré sur Alto Lille : -93% de poids images (3.4 Mo → 224 Ko AVIF).
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* 2. Minification du code */}
            <motion.div variants={fadeInUp}>
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Code2 className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      2. Code sobre et minifié
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Éviter le code mort, supprimer les dépendances inutiles.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          Tree-shaking
                        </Badge>
                        <span className="text-muted-foreground">
                          Supprimer le code non utilisé (-40% bundle JS moyen)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          Code-splitting
                        </Badge>
                        <span className="text-muted-foreground">
                          Charger uniquement le nécessaire (import() dynamique)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          Audit régulier
                        </Badge>
                        <span className="text-muted-foreground">
                          bundlephobia.com pour mesurer le poids des packages npm
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 italic">
                      Exemple concret : une bibliothèque JS de 200 Ko pour afficher un bouton ?
                      Non merci. Un composant custom de 2 Ko fait le job.
                    </p>
                    <p className="text-xs text-accent mt-2 font-medium">
                      Résultat mesuré : bundle JS initial de 872 Ko → 424 Ko après optimisation
                      (-51% via lazy-loading Three.js et suppression de dépendances inutiles).
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* 3. Fonts */}
            <motion.div variants={fadeInUp}>
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Settings className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      3. Typographie optimisée
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Les fonts Google peuvent peser 200-400 Ko par famille (2 familles = 600 Ko).
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          Variable fonts
                        </Badge>
                        <span className="text-muted-foreground">
                          1 seule font = tous les poids (400 à 700) → -60%
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          Subsetting
                        </Badge>
                        <span className="text-muted-foreground">
                          Charger uniquement les caractères latin (pas cyrillique/chinois)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          display=swap
                        </Badge>
                        <span className="text-muted-foreground">
                          Afficher le texte immédiatement (pas de FOIT)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          Auto-hébergement
                        </Badge>
                        <span className="text-muted-foreground">
                          Évite les requêtes externes Google Fonts (DNS + HTTP)
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-accent mt-3 font-medium">
                      Résultat : Inter auto-hébergée = 344 Ko pour tous les poids vs ~500 Ko via Google.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* 4. Hébergement vert */}
            <motion.div variants={fadeInUp}>
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Database className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      4. Hébergement responsable
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Le choix de l'hébergeur a un impact direct sur les
                      émissions.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          Énergie verte
                        </Badge>
                        <span className="text-muted-foreground">
                          Datacenters alimentés aux énergies renouvelables
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          Proximité
                        </Badge>
                        <span className="text-muted-foreground">
                          Hébergement proche des utilisateurs (CDN)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          Mutualisé
                        </Badge>
                        <span className="text-muted-foreground">
                          VPS partagé plutôt que serveur dédié si possible
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* 5. Performance */}
            <motion.div variants={fadeInUp}>
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      5. Core Web Vitals
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Mesures objectives de l'expérience utilisateur.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          LCP
                        </Badge>
                        <span className="text-muted-foreground">
                          Largest Contentful Paint &lt; 2.5s : affichage contenu principal
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          FID
                        </Badge>
                        <span className="text-muted-foreground">
                          First Input Delay &lt; 100ms : réactivité aux interactions
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          CLS
                        </Badge>
                        <span className="text-muted-foreground">
                          Cumulative Layout Shift &lt; 0.1 : stabilité visuelle (pas de décalage)
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Ces métriques impactent directement le SEO depuis 2021 (Google Page Experience).
                    </p>
                    <p className="text-xs text-accent mt-2 font-medium">
                      Résultat Alto Lille : 100/100 sur Lighthouse (Performance + Accessibilité + SEO).
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* 6. Accessibilité */}
            <motion.div variants={fadeInUp}>
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Globe className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      6. Accessibilité & sobriété
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Un site accessible est un site sobre par nature.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          Sémantique HTML
                        </Badge>
                        <span className="text-muted-foreground">
                          Utiliser les bonnes balises (nav, main, article)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          prefers-reduced-motion
                        </Badge>
                        <span className="text-muted-foreground">
                          Respecter les préférences utilisateur
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="bg-accent/10">
                          Contraste
                        </Badge>
                        <span className="text-muted-foreground">
                          WCAG AAA minimum (ratio 7:1)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ROI de l'éco-conception */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="text-3xl font-bold mb-8 text-foreground"
              variants={fadeInUp}
            >
              ROI de l'éco-conception
            </motion.h2>

            <motion.div variants={fadeInUp}>
              <Card className="p-6 border-border mb-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Investissement : optimisation initiale (~10-20h de développement)
                </h3>

                <p className="text-foreground font-medium mb-3">Retours mesurables :</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Hébergement</strong> : serveur 2x moins puissant → -50% facture mensuelle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>SEO</strong> : meilleur ranking Google → +trafic organique gratuit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Conversion</strong> : -1s chargement → +7% conversions (Akamai)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Maintenance</strong> : code simple → -temps debug → -coût évolution</span>
                  </li>
                </ul>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-6 border-accent/30 bg-accent/5">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Exemple chiffré (site e-commerce 10k visiteurs/mois)
                </h3>

                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <p className="font-medium text-muted-foreground mb-2">Avant :</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Serveur 40€/mois</li>
                      <li>• Taux rebond 60%</li>
                      <li>• SEO page 3</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-accent mb-2">Après :</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Serveur 20€/mois</li>
                      <li>• Taux rebond 45%</li>
                      <li>• SEO page 1</li>
                    </ul>
                  </div>
                </div>

                <p className="text-accent font-bold text-lg">
                  → ROI en 3-6 mois selon trafic.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Calculateur carbone */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            className="text-3xl font-bold mb-8 text-center text-foreground"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Testez l'empreinte carbone d'un site
          </motion.h2>
          <CarbonCalculator />
        </div>
      </section>

      {/* Outils & Ressources */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            className="text-3xl font-bold mb-8 text-foreground"
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Outils d'audit recommandés
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeInUp}>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Lighthouse</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Audit de performance, accessibilité et SEO intégré à Chrome
                  DevTools.
                </p>
                <Badge variant="outline">Google</Badge>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">WebsiteCarbon</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Calculateur d'empreinte carbone pour sites web.
                </p>
                <Badge variant="outline">websitecarbon.com</Badge>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">EcoIndex</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Note environnementale de A à G pour sites web (GreenIT.fr).
                </p>
                <Badge variant="outline">ecoindex.fr</Badge>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">bundlephobia</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Analyse le poids et les performances des packages npm.
                </p>
                <Badge variant="outline">bundlephobia.com</Badge>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Prêt à optimiser votre projet ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Je vous accompagne dans la création d'un site performant et sobre.
              <br />
              <span className="text-foreground font-medium">Avec des métriques, pas des promesses.</span>
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
            >
              Demander un audit gratuit
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
