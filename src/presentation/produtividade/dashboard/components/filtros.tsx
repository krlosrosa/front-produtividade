import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setFiltrar: Dispatch<
    SetStateAction<{
      estado: string;
      filtro: string;
    }>
  >;
  filtrar: {
    estado: string;
    filtro: string;
  };
};

export default function FiltrosDashboard({ setFiltrar, filtrar }: Props) {
  const handleEstadoChange = (estado: string) => {
    setFiltrar((prev) => ({ ...prev, estado }));
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={filtrar.filtro}
              onChange={(e) =>
                setFiltrar((prev) => ({ ...prev, filtro: e.target.value }))
              }
              placeholder="Buscar processo, operador, etc..."
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEstadoChange("all")}
              className={`px-4 py-2 text-xs rounded-md ${
                filtrar.estado === "all"
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => handleEstadoChange("progress")}
              className={`px-4 py-2 text-xs rounded-md ${
                filtrar.estado === "progress"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              Em andamento
            </button>
            <button
              onClick={() => handleEstadoChange("completed")}
              className={`px-4 py-2 text-xs rounded-md ${
                filtrar.estado === "completed"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              Concluído
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
