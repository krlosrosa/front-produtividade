import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { GetProdutividadeResult } from "@/domain/get-produtividade";
import { Boxes, CheckCheck, Loader, Package } from "lucide-react";
import { DashType } from "../types/dashType";

type Props = {
  data: DashType;
  filtrar: {
    estado: string;
    filtro: string;
  };
};

export default function StatusDashBoard({ data, filtrar }: Props) {

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
            {data.totalProcess}
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
            {data.emAndamento}
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
            {data.concluido}
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
          <div className="text-xl font-bold text-violet-800">{data.totalCaixas}</div>
        </CardContent>
      </Card>
    </div>
  );
}