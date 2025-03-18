import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface RedeploymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectTitle: string;
}

export function RedeploymentModal({
  open,
  onOpenChange,
  projectTitle,
}: RedeploymentModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Clock className="h-5 w-5 text-accent" />
            Site en cours de redéploiement
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-2">
            Le site{" "}
            <span className="font-semibold text-accent">{projectTitle}</span>{" "}
            est actuellement en cours de redéploiement et sera disponible très
            prochainement.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 text-center text-muted-foreground text-sm">
          <p>
            Merci de votre compréhension et n'hésitez pas à revenir plus tard
            pour découvrir ce projet !
          </p>
        </div>
        <div className="flex justify-center mt-4">
          <Button onClick={() => onOpenChange(false)}>Compris</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
