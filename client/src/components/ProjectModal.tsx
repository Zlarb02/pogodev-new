import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useModals } from "@/contexts/ModalsContext";

export type ProjectType = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  context?: string;
  image: string;
  url: string;
  githubUrl?: string;
  technologies?: string[];
};

interface ProjectModalProps {
  project: ProjectType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({
  project,
  open,
  onOpenChange,
}: ProjectModalProps) {
  // Utiliser le contexte pour accéder aux fonctions et état du contexte
  const { handleVisitSite, setIsRedeploymentModalOpen, setRedeployingProject } =
    useModals();

  // État pour le lazy loading de l'image (économie de 7 MB de bande passante)
  const [imageSrc, setImageSrc] = useState<string>("");

  // Charger l'image uniquement quand la modale s'ouvre
  useEffect(() => {
    if (open && project) {
      // Précharger l'image uniquement quand la modale s'ouvre
      const img = new Image();
      img.src = project.image;
      img.onload = () => setImageSrc(project.image);
    } else {
      // Réinitialiser quand la modale se ferme pour libérer la mémoire
      setImageSrc("");
    }
  }, [open, project]);

  if (!project) return null;

  // Liste des projets qui nécessitent la modal de redéploiement
  const needsRedeploymentModal = ["shop", "groove", "scene"];

  // Fonction pour gérer le clic sur le bouton "Voir le site"
  const handleVisitClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Toujours prévenir le comportement par défaut pour avoir un contrôle total
    e.preventDefault();

    if (needsRedeploymentModal.includes(project.id)) {
      // Si c'est un projet qui nécessite redéploiement, afficher la modal de redéploiement
      setRedeployingProject(project.title);
      setIsRedeploymentModalOpen(true);

      // Fermer la modal de projet
      onOpenChange(false);
    } else {
      // Pour les autres projets (anais, violette, mirojo), ouvrir directement le site
      window.open(project.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-accent font-medium">
            Projet démonstrateur
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={project.title}
              loading="lazy"
              className="w-full h-auto rounded-lg shadow-md object-cover max-h-[300px]"
            />
          ) : (
            <div className="w-full h-[300px] rounded-lg shadow-md bg-muted animate-pulse flex items-center justify-center">
              <p className="text-muted-foreground">Chargement de l'image...</p>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground mb-4">{project.description}</p>

            {project.longDescription && (
              <p className="text-muted-foreground mb-4">
                {project.longDescription}
              </p>
            )}
          </div>

          {project.context && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Contexte</h3>
              <p className="text-muted-foreground">{project.context}</p>
            </div>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-muted/60 text-muted-foreground"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button asChild className="flex items-center gap-2">
              <a
                href={project.url}
                onClick={handleVisitClick}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                Voir le site
              </a>
            </Button>

            {project.githubUrl && (
              <Button
                variant="outline"
                asChild
                className="flex items-center gap-2"
              >
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  Code source
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
