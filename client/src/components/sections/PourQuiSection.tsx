import { motion } from "framer-motion";
import { useState } from "react";
import { Users, Palette, Building2, Wrench, Code } from "lucide-react";

interface Profile {
  id: string;
  icon: typeof Users;
  title: string;
  subtitle: string;
  description: string[];
  color: string;
}

const profiles: Profile[] = [
  {
    id: "creators",
    icon: Palette,
    title: "Créateurs, artistes, youtubeurs",
    subtitle: "Votre espace, vos règles",
    description: [
      "Imaginons ensemble les expériences web de demain."
    ],
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: "media",
    icon: Building2,
    title: "Médias, associations, coopératives, startups",
    subtitle: "Des outils qui grandissent avec vous",
    description: [
      "Des outils ouverts qui grandissent avec vous : publication claire, contributions simples pour l'équipe, données chez vous (ou chez moi).",
      "Pas de verrouillage, pas de dépendance. Je vous forme et vous accompagne si nécessaire."
    ],
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: "artisans",
    icon: Wrench,
    title: "Artisans, commerçants, indépendants",
    subtitle: "Simple, fiable, autonome",
    description: [
      "Un site clair pour montrer votre travail, prendre des rendez-vous et, si besoin, vendre.",
      "Imaginé avec vous, guidé par mon expertise : je vous donne toutes les clés pour comprendre ce que le numérique peut faire pour vous, et comment bien faire les choses."
    ],
    color: "from-orange-500/20 to-yellow-500/20"
  },
  {
    id: "tech",
    icon: Code,
    title: "Équipes tech",
    subtitle: "Code propre, collaboration sereine",
    description: [
      "Je m'intègre à vos outils, je privilégie la simplicité et la performance, j'explique mes choix et je laisse un code propre et maintenable.",
      "Communication claire, collaboration sereine."
    ],
    color: "from-green-500/20 to-emerald-500/20"
  }
];

export function PourQuiSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div id="pour-qui" className="mb-16">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
          Pour qui ?
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          Pour celles et ceux qui veulent <span className="text-cyan-400">reprendre la main</span> sur leur présence en ligne, avec des solutions cohérentes, utiles, belles (oui, artistiques) et écoconçues — des solutions qui vous appartiennent.
        </p>
      </motion.div>

      {/* Desktop: Simple card list */}
      <div className="hidden md:block max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {profiles.map((profile, index) => {
            const Icon = profile.icon;
            const isSelected = selectedIndex === index;

            return (
              <motion.button
                key={profile.id}
                className={`p-6 rounded-2xl border-2 transition-all duration-500 text-center ${
                  isSelected
                    ? 'border-accent bg-gradient-to-br ' + profile.color + ' shadow-xl scale-105'
                    : 'border-border/30 bg-card/40 hover:border-accent/40 hover:shadow-lg'
                }`}
                onClick={() => setSelectedIndex(index)}
                whileHover={{ y: -4 }}
                aria-label={`Sélectionner ${profile.title}`}
              >
                <Icon className={`w-12 h-12 mx-auto mb-4 transition-colors duration-500 ${
                  isSelected ? 'text-accent' : 'text-muted-foreground'
                }`} />
                <h3 className={`text-base font-semibold mb-2 leading-tight transition-colors duration-500 ${
                  isSelected ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {profile.title}
                </h3>
                <p className={`text-sm transition-colors duration-500 ${
                  isSelected ? 'text-foreground font-medium' : 'text-muted-foreground'
                }`}>
                  {profile.subtitle}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Description panel */}
        <motion.div
          className="max-w-3xl mx-auto"
          key={selectedIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-card/60 backdrop-blur-md border-2 border-border/40 rounded-2xl p-8 shadow-xl">
            {profiles[selectedIndex].description.map((paragraph, i) => (
              <motion.p
                key={i}
                className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 last:mb-0"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mobile: Elegant vertical list */}
      <div className="md:hidden space-y-4 px-2">
        {profiles.map((profile, index) => {
          const Icon = profile.icon;
          const isActive = selectedIndex === index;

          return (
            <motion.button
              key={profile.id}
              className={`w-full text-left transition-all duration-500 ${
                isActive ? '' : 'opacity-60'
              }`}
              onClick={() => setSelectedIndex(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              aria-label={`Sélectionner ${profile.title}`}
            >
              <div className="flex items-start gap-3 mb-2">
                <Icon className={`w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 mt-1 transition-colors duration-300 ${
                  isActive ? 'text-accent' : 'text-muted-foreground'
                }`} />
                <div className="flex-1 min-w-0">
                  <h3 className={`text-base sm:text-lg font-semibold mb-1 leading-tight transition-colors duration-300 break-words ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {profile.title}
                  </h3>
                  <p className={`text-sm font-medium mb-2 transition-colors duration-300 ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {profile.subtitle}
                  </p>
                </div>
              </div>

              <motion.div
                initial={false}
                animate={{
                  height: isActive ? 'auto' : 0,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="overflow-hidden"
              >
                <div className="pl-8 sm:pl-12 space-y-2 pb-4 border-l-2 border-accent/20 ml-3 sm:ml-4">
                  {profile.description.map((paragraph, i) => (
                    <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom message */}
      <motion.div
        className="mt-12 md:mt-20 max-w-3xl mx-auto text-center space-y-4 md:space-y-6 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-lg md:text-xl font-semibold text-foreground">En bref</h3>

        <div className="space-y-3 md:space-y-4">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Des solutions qui vous coûtent moins de <span className="text-blue-400 font-semibold">temps</span>, <span className="text-green-400 font-semibold">d'argent</span> et <span className="text-teal-400 font-semibold">d'énergie</span> à faire vivre.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            <span className="text-teal-400 font-medium">Rapides</span> sur mobile, <span className="text-green-400 font-medium">respectueuses</span> des données, <span className="text-blue-400 font-medium">accessibles</span> à tous.
          </p>
        </div>

        <p className="text-base md:text-lg text-foreground font-semibold leading-relaxed pt-3 md:pt-4">
          Gardez les <span className="text-orange-400">clés</span> (domaine, code, contenus) — et un site où l'on a <span className="text-amber-400">plaisir</span> à revenir.
        </p>
      </motion.div>
    </div>
  );
}
