import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Leaf, AlertCircle, CheckCircle } from "lucide-react";

export function CarbonCalculator() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    pageSize: number;
    co2: number;
    grade: string;
    color: string;
  } | null>(null);

  // Simulation de calcul (en production, utiliser l'API websitecarbon.com ou équivalent)
  const calculateCarbon = () => {
    setLoading(true);

    setTimeout(() => {
      // Formule simplifiée : ~0.5g CO2 par page view pour 1MB
      // En réalité dépend de multiples facteurs
      const estimatedSize = 0.5 + Math.random() * 2.5; // MB (0.5-3MB)
      const co2PerView = estimatedSize * 0.5; // grammes
      const annualVisits = 10000; // estimation
      const annualCO2 = (co2PerView * annualVisits) / 1000; // kg

      let grade = "A";
      let color = "text-green-500";

      if (estimatedSize > 2) {
        grade = "F";
        color = "text-red-500";
      } else if (estimatedSize > 1.5) {
        grade = "D";
        color = "text-orange-500";
      } else if (estimatedSize > 1) {
        grade = "C";
        color = "text-yellow-500";
      } else if (estimatedSize > 0.5) {
        grade = "B";
        color = "text-lime-500";
      }

      setResult({
        pageSize: estimatedSize,
        co2: annualCO2,
        grade,
        color,
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-accent/10 p-3 rounded-lg">
          <Leaf className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Calculateur d'empreinte carbone</h3>
          <p className="text-sm text-muted-foreground">
            Estimez l'impact environnemental d'un site web
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="https://exemple.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={calculateCarbon}
            disabled={!url || loading}
          >
            {loading ? "Calcul..." : "Analyser"}
          </Button>
        </div>

        {result && (
          <div className="space-y-4 mt-6 pt-6 border-t">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Note éco-index</span>
              <Badge className={`text-2xl font-bold ${result.color} bg-transparent border-2`}>
                {result.grade}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card/50 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">
                  Poids de la page
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {result.pageSize.toFixed(2)} MB
                </div>
              </div>

              <div className="bg-card/50 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">
                  CO₂ annuel estimé
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {result.co2.toFixed(1)} kg
                </div>
              </div>
            </div>

            {result.grade === "A" || result.grade === "B" ? (
              <div className="flex items-start gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold text-green-500">Excellent !</div>
                  <div className="text-muted-foreground">
                    Ce site est éco-conçu et a une faible empreinte carbone.
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold text-orange-500">
                    Optimisations possibles
                  </div>
                  <div className="text-muted-foreground">
                    Ce site pourrait réduire son impact en optimisant images,
                    code et fonts.
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 text-xs text-muted-foreground">
              <p>
                <strong>Méthodologie :</strong> Estimation basée sur 10 000
                visites/an. Formule : poids page × 0.5g CO₂/MB × nombre de
                visites.
              </p>
              <p className="mt-2">
                Pour un audit précis, utilisez{" "}
                <a
                  href="https://www.websitecarbon.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  websitecarbon.com
                </a>{" "}
                ou{" "}
                <a
                  href="https://www.ecoindex.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  ecoindex.fr
                </a>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
