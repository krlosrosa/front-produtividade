import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { GetProdutividadeResult } from "@/domain/get-produtividade";
import { Boxes, CheckCheck, Loader, Package } from "lucide-react";

type Props = {
  data: GetProdutividadeResult[];
  filtrar: {
    estado: string;
    filtro: string;
  };
};

export default function StatusDashBoard({ data, filtrar }: Props) {
  // Filtra os dados apenas por estado (ignora o filtro de texto)
  const dadosFiltrados = data.filter((item) => {
    switch (filtrar.estado) {
      case "progress":
        return !item.horaFim; // Em andamento = sem horaFim
      case "completed":
        return !!item.horaFim; // Concluído = com horaFim
      case "all":
      default:
        return true; // Todos = sem filtro
    }
  });

  // Calcula métricas totais baseadas nos dados FILTRADOS por estado
  const totalProcessos = dadosFiltrados.length;
  const processosConcluidos = dadosFiltrados.filter((item) => item.horaFim).length;
  const processosEmAndamento = totalProcessos - processosConcluidos;
  const totalCaixas = dadosFiltrados.reduce((sum, item) => sum + (item.caixas || 0), 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Card Total de Processos */}
      <Card className="border border-blue-100 bg-gradient-to-br from-blue-50 to-white hover:shadow-md transition-shadow">
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-1">
            <CardTitle className="text-md font-medium text-blue-600">
              Total de Processos
            </CardTitle>
            <Boxes className="h-8 w-8 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-blue-800">
            {totalProcessos}
          </div>
        </CardContent>
      </Card>

      {/* Card Em Andamento */}
      <Card className="border border-amber-100 bg-gradient-to-br from-amber-50 to-white hover:shadow-md transition-shadow">
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-1">
            <CardTitle className="text-md font-medium text-amber-600">
              Em Andamento
            </CardTitle>
            <Loader className="h-8 w-8 text-amber-400 animate-spin" />
          </div>
          <div className="text-md font-bold text-amber-800">
            {processosEmAndamento}
          </div>
        </CardContent>
      </Card>

      {/* Card Concluídos */}
      <Card className="border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white hover:shadow-md transition-shadow">
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-1">
            <CardTitle className="text-md font-medium text-emerald-600">
              Concluídos
            </CardTitle>
            <CheckCheck className="h-8 w-8 text-emerald-400" />
          </div>
          <div className="text-md font-bold text-emerald-800">
            {processosConcluidos}
          </div>
        </CardContent>
      </Card>

      {/* Card Total de Caixas */}
      <Card className="border border-violet-100 bg-gradient-to-br from-violet-50 to-white hover:shadow-md transition-shadow">
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-1">
            <CardTitle className="text-md font-medium text-violet-600">
              Total de Caixas
            </CardTitle>
            <Package className="h-8 w-8 text-violet-400" />
          </div>
          <div className="text-xl font-bold text-violet-800">{totalCaixas}</div>
        </CardContent>
      </Card>
    </div>
  );
}