import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStoreProdutividade } from "../atom";

export default function Resumo() {
  const { resumo } = useStoreProdutividade();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-1">
          <CardDescription>Total Caixas</CardDescription>
          <CardTitle className="text-2xl">{resumo.caixas || 0}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-1">
          <CardDescription>Total Unidades</CardDescription>
          <CardTitle className="text-2xl">{resumo.unidades || 0}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-1">
          <CardDescription>Endereços Visitados</CardDescription>
          <CardTitle className="text-2xl">{resumo.enderecos || 0}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
