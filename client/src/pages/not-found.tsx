import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  // Fonction pour revenir à l'accueil qui respecte le hash routing
  const handleGoHome = () => {
    // Utiliser un chemin de base vide puisqu'on est sur le domaine racine
    const basePath = "";
    window.location.href = `${basePath}/#/`;

    // Nettoyer les variables de session pour éviter des problèmes futurs
    sessionStorage.removeItem("redirect");
    sessionStorage.removeItem("notFoundUrl");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <Card className="w-full max-w-md mx-4 border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center mb-6">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <h1 className="text-3xl font-bold">Page non trouvée</h1>
            <p className="mt-4 text-muted-foreground">
              La page que vous recherchez n'existe pas ou a été déplacée.
            </p>
          </div>

          <div className="flex justify-center mt-6">
            <Button onClick={handleGoHome}>Retour à l'accueil</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
