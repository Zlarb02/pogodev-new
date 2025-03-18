import React from "react";
import { ProjectModal } from "@/components/ProjectModal";
import { RedeploymentModal } from "@/components/RedeploymentModal";
import { useModals } from "@/contexts/ModalsContext";

export function AppModals() {
  const {
    selectedProject,
    isProjectModalOpen,
    setIsProjectModalOpen,
    isRedeploymentModalOpen,
    setIsRedeploymentModalOpen,
    redeployingProject,
  } = useModals();

  return (
    <>
      {/* Modal de projet */}
      <ProjectModal
        project={selectedProject}
        open={isProjectModalOpen}
        onOpenChange={setIsProjectModalOpen}
      />

      {/* Modal de redéploiement */}
      <RedeploymentModal
        open={isRedeploymentModalOpen}
        onOpenChange={setIsRedeploymentModalOpen}
        projectTitle={redeployingProject}
      />
    </>
  );
}
