import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GetProdutividadeResult } from "@/domain/get-produtividade";
import { format } from "date-fns";
import { Gauge } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  data: GetProdutividadeResult[];
  filtrar: {
    estado: string;
    filtro: string;
  };
  setFiltrar: Dispatch<
    SetStateAction<{
      estado: string;
      filtro: string;
    }>
  >;
};

export default function ListCardProdutividadeDash({ data, filtrar }: Props) {
  const itensFiltrados = data.filter((item) => {
    // Filtro por texto (busca)
    const filtroTexto =
      filtrar.filtro.length <= 2 ||
      item.transporte.includes(filtrar.filtro) ||
      item.funcionarioId.includes(filtrar.filtro) ||
      item.nomeFuncionario.toUpperCase().includes(filtrar.filtro.toUpperCase())

    // Filtro por estado
    let filtroEstado = true;
    switch (filtrar.estado) {
      case "progress":
        filtroEstado = !item.horaFim; // Em andamento = sem horaFim
        break;
      case "completed":
        filtroEstado = !!item.horaFim; // Concluído = com horaFim
        break;
      case "all":
      default:
        filtroEstado = true; // Todos = sem filtro
    }

    return filtroTexto && filtroEstado;
  });

  return (
    <div className="space-y-2">
      {itensFiltrados.map((item, index) => (
        <Card
          key={index}
          className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          {/* Layout Desktop */}
          <div className="hidden sm:flex items-start justify-between gap-4">
            {/* Coluna Esquerda - Informações principais */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium truncate">#{item.transporte}</h3>
                <Badge variant="outline" className="text-xs">
                  {item.empresa}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {item.id}
                </Badge>
                <Badge
                  variant={
                    item.processo === "Separação" ? "default" : "secondary"
                  }
                  className="text-xs"
                >
                  {item.processo}
                </Badge>
              </div>

              <div className="mt-1 flex items-center gap-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {format(new Date(item.horaInicio), "HH:mm")}
                  {item.horaFim &&
                    ` → ${format(new Date(item.horaFim), "HH:mm")}`}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-xs">
                  {item.funcionarioId.replace("func_", "")}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-xs">
                  {item.nomeFuncionario.replace("func_", "")}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-xs">
                  {item.observacao?.informacao}
                </span>
              </div>
            </div>

            {/* Coluna Direita - Métricas numéricas */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Caixas
                </p>
                <p className="font-medium">{item.caixas || 0}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Unid.
                </p>
                <p className="font-medium">{item.unidade || 0}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Vis.</p>
                <p className="font-medium">{item.visitado || 0}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Produt.
                </p>
                <p className="font-medium flex items-center gap-1">
                  <Gauge className="h-4 w-4 text-green-500" />
                  {item.produtividade}/h
                </p>
              </div>
              <Badge
                variant={item.horaFim ? "default" : "outline"}
                className="h-6 px-2 text-xs"
              >
                {item.horaFim ? "✓" : "⌛"}
              </Badge>
            </div>
          </div>

          {/* Layout Mobile */}
          <div className="sm:hidden space-y-3">
            {/* Header com título e status */}
            <div className="flex items-center justify-between">
              <h3 className="font-medium">#{item.transporte}</h3>
              <Badge
                variant={item.horaFim ? "default" : "outline"}
                className="h-6 px-2 text-xs"
              >
                {item.horaFim ? "✓" : "⌛"}
              </Badge>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">
                {item.empresa}
              </Badge>
              <Badge
                variant={
                  item.processo === "Separação" ? "default" : "secondary"
                }
                className="text-xs"
              >
                {item.processo}
              </Badge>
            </div>

            {/* Horário e funcionário */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                {format(new Date(item.horaInicio), "HH:mm")}
                {item.horaFim &&
                  ` → ${format(new Date(item.horaFim), "HH:mm")}`}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                {item.funcionarioId.replace("func_", "")}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                {item.nomeFuncionario.replace("func_", "")}
              </span>
            </div>

            {/* Métricas em grid 2x2 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Caixas:
                </span>
                <span className="font-medium">{item.caixas || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Unidades:
                </span>
                <span className="font-medium">{item.unidade || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Visitados:
                </span>
                <span className="font-medium">{item.visitado || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Produtividade:
                </span>
                <span className="font-medium flex items-center gap-1">
                  <Gauge className="h-3 w-3 text-green-500" />
                  {item.produtividade}/h
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
