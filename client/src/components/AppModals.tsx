import { ProjectModal } from "@/components/ProjectModal";
import { useModals } from "@/contexts/ModalsContext";

export function AppModals() {
  const {
    selectedProject,
    isProjectModalOpen,
    setIsProjectModalOpen,
  } = useModals();

  return (
    <>
      {/* Modal de projet */}
      <ProjectModal
        project={selectedProject}
        open={isProjectModalOpen}
        onOpenChange={setIsProjectModalOpen}
      />
    </>
  );
}
