import { Badge } from "@/components/ui/badge";
import { GetProdutividadeInfoResult } from "@/domain/get-info-produtividade";

type Props = {
  data: GetProdutividadeInfoResult | undefined;
};

export default function ResumoTransporte({ data }: Props) {
  return (
    <div>
      {data && (
        <div className="space-y-3 p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">Transporte #{data.transporte}</h3>
              {/*<p className="text-sm text-muted-foreground">
                Iniciado em {data.horaInicio.toDateString()} às{" "}
                {data.horaInicio.toDateString()}
              </p>*/}
            </div>
            <Badge variant="secondary">ID: {data.id}</Badge>
          </div>

          <div className="grid grid-cols-3 gap-3 text-sm mt-2">
            <div>
              <p className="text-muted-foreground">Centro</p>
              <p>{data.centerId}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Funcionário</p>
              <p>#{data.funcionarioId}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Caixas</p>
              <p>{data.caixas}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Unidades</p>
              <p>{data.unidade}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Endereços</p>
              <p>{data.visitado}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Produtividade</p>
              <p className="font-medium text-green-600">{data.produtividade}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
