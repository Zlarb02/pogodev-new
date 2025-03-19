import React, { createContext, useContext, ReactNode, useState } from "react";
import { ProjectType } from "@/components/ProjectModal";

type ModalsContextType = {
  selectedProject: ProjectType | null;
  isProjectModalOpen: boolean;
  isRedeploymentModalOpen: boolean;
  redeployingProject: string;
  projects: ProjectType[]; // Ajout de la liste des projets au contexte
  setIsProjectModalOpen: (open: boolean) => void;
  setIsRedeploymentModalOpen: (open: boolean) => void;
  setRedeployingProject: (title: string) => void; // Ajout de cette fonction
  openProjectModal: (project: ProjectType) => void;
  handleVisitSite: (
    e: React.MouseEvent<HTMLAnchorElement>,
    project: ProjectType
  ) => void;
};

const ModalsContext = createContext<ModalsContextType | undefined>(undefined);

// Liste des projets exclus de la redirection vers la modal de redéploiement
const excludedFromRedeploymentModal = ["anais", "violette", "mirojo"];

export function ModalsProvider({ children }: { children: ReactNode }) {
  // État pour les modals
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isRedeploymentModalOpen, setIsRedeploymentModalOpen] = useState(false);
  const [redeployingProject, setRedeployingProject] = useState<string>("");

  // Liste des projets enrichie avec des détails
  const projects: ProjectType[] = [
    {
      id: "shop",
      title: "E-commerce produits numériques",
      description:
        "Site de vente en ligne pour produits numériques avec paiement sécurisé et téléchargements automatiques.",
      longDescription:
        "Solution e-commerce complète déployée avec Prestashop grâce à Yunohost sur un serveur OVH. Site en cours de redéploiement avec des améliorations.",
      context:
        "Projet personnel pour tester le déploiement d'une boutique en ligne sécurisée et performante.",
      image: "https://i.imgur.com/oqJFeVp.png",
      url: "https://shop.pogodev.com",
      technologies: ["Prestashop", "Yunohost", "OVH", "PHP", "MySQL"],
    },
    {
      id: "anais",
      title: "Site vitrine freelance",
      description:
        "Présentation professionnelle avec portfolio intégré et formulaire de contact pour une vidéaste.",
      longDescription:
        "Site créé rapidement en quelques prompts grâce à l'IA de lovable.dev pour ma sœur Anaïs, vidéaste freelance.",
      context:
        "Projet à développer permettant d'expérimenter la génération rapide de sites web professionnels avec l'aide de l'IA.",
      image: "https://i.imgur.com/ErtS8mL.png",
      url: "https://anais.pogodev.com",
      githubUrl: "https://github.com/Zlarb02/video-eco-creative",
      technologies: ["React", "TailwindCSS", "Lovable.dev AI", "Netlify"],
    },
    {
      id: "scene",
      title: "Portfolio interactif 3D",
      description:
        "Portfolio avec visualisation 3D interactive d'un avatar animé et environnement dynamique.",
      longDescription:
        "Une expérience immersive pour présenter mes projets de jeux vidéo indépendants avec un avatar 3D dans un environnement explorable. Les visiteurs peuvent interagir avec l'environnement et découvrir différents projets de manière ludique.",
      context:
        "Projet expérimental démarré avec Replit pour accélérer le processus de création et explorer les possibilités de Three.js et WebGL dans la présentation de portfolio créatifs.",
      image: "https://i.imgur.com/nxAjahS.gif",
      url: "https://games.pogodev.com",
      githubUrl: "https://github.com/Zlarb02/DevPortfolioShowcase",
      technologies: [
        "Three.js",
        "React Three Fiber",
        "GLSL",
        "Blender",
        "Replit",
      ],
    },
    {
      id: "mirojo",
      title: "Mirojo.app - Application JDR",
      description: "Application web pour jeu de rôle avec intégration IA.",
      longDescription:
        "Mirojo.app est une plateforme web qui permet aux joueurs de JDR de créer des univers entier, générer et gérer des scénarios leurs campagnes. Elle intègre des fonctionnalités IA pour aider les maîtres de jeu à créer rapidement du contenu riche.",
      context:
        "Application React/Supabase en cours de développement. Une landing page réalisée avec Webflow est déjà disponible en ligne, et l'application complète sera bientôt déployée.",
      image:
        "https://cdn.prod.website-files.com/67bdb9c24215a721af4d2bf1/67be47a750c54053e52e5be2_00c38b114f077b8819a5ce847be9f50c_Capture%20d%E2%80%99e%CC%81cran%202025-02-25%20a%CC%80%2023.01.44-p-1080.png",
      url: "https://etiennes-mirojo-landing-page.webflow.io",
      githubUrl: "https://github.com/Zlarb02/last-mirojo",
      technologies: ["React", "Supabase", "OpenAI API", "Webflow"],
    },
    {
      id: "violette",
      title: "Violette - Site vitrine",
      description:
        "Site vitrine entièrement responsive optimisé pour tous types d'appareils et tailles d'écran.",
      longDescription:
        "Un site vitrine simple mais efficace, conçu avec une approche mobile-first et entièrement responsive. Il présente les services et l'identité d'une entreprise avec un design épuré et moderne.",
      context:
        "Site créé pour ma sœur Violette en utilisant l'IA de lovable.dev pour générer rapidement un site professionnel et responsive.",
      image: "https://i.imgur.com/0iTLzLd.png",
      url: "https://violette.pogodev.com",
      githubUrl: "https://github.com/Zlarb02/violette-pogodev",
      technologies: ["HTML5", "CSS3", "JavaScript", "Lovable.dev AI"],
    },
    {
      id: "groove",
      title: "GrooveGather - Plateforme",
      description:
        "Plateforme collaborative pour musiciens permettant le partage et la création de projets communs.",
      longDescription:
        "GrooveGather est une plateforme web qui permet aux musiciens de collaborer à distance sur des projets musicaux. Elle offre des fonctionnalités de partage de fichiers audio, d'édition collaborative et de communication entre artistes.",
      context:
        "Projet de formation à la Wild Code School où j'ai été désigné 'Tech Lead' de mon groupe par le formateur. J'ai travaillé à faire monter en compétences mes camarades tout en donnant le maximum pour obtenir un produit à la hauteur de nos ambitions. Malgré le temps limité et l'apprentissage en cours de route, je suis fier du résultat même si certaines fonctionnalités ne sont pas encore totalement opérationnelles. Ce projet sera redéployé prochainement.",
      image: "https://i.imgur.com/nPrCK8U.png",
      url: "https://groovegather.fr",
      githubUrl: "https://github.com/Zlarb02/GrooveGatherBack",
      technologies: [
        "Angular",
        "Java",
        "Spring",
        "Spring Boot",
        "Docker",
        "GitHub Actions",
        "Portainer",
      ],
    },
  ];

  // Fonction pour ouvrir la modal avec les détails du projet
  const openProjectModal = (project: ProjectType) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  // Fonction pour gérer les clics sur "Voir le site"
  const handleVisitSite = (
    e: React.MouseEvent<HTMLAnchorElement>,
    project: ProjectType
  ) => {
    if (!excludedFromRedeploymentModal.includes(project.id)) {
      e.preventDefault();
      setRedeployingProject(project.title);
      setIsRedeploymentModalOpen(true);
    }
    // Si le projet est exclu, le comportement par défaut du lien fonctionne normalement
  };

  return (
    <ModalsContext.Provider
      value={{
        selectedProject,
        isProjectModalOpen,
        isRedeploymentModalOpen,
        redeployingProject,
        projects, // Exposition de la liste des projets
        setIsProjectModalOpen,
        setIsRedeploymentModalOpen,
        setRedeployingProject, // Exposer cette fonction
        openProjectModal,
        handleVisitSite,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalsContext);
  if (context === undefined) {
    throw new Error("useModals must be used within a ModalsProvider");
  }
  return context;
}
