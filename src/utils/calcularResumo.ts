import {
  ProdutividadeItemType,
  QuantidadeProdutividadeAcc,
} from "@/presentation/dashboard/types/produtividade";

export function calcularResumo(
  formularios: ProdutividadeItemType[]
): QuantidadeProdutividadeAcc {
  return formularios.reduce<QuantidadeProdutividadeAcc>(
    (acc, curr) => ({
      caixas: acc.caixas + (curr.quantidadeCaixa ?? 0),
      unidades: acc.unidades + (curr.quantidadeUnidade ?? 0),
      enderecos: acc.enderecos + (curr.linhasPickingVisitadas ?? 0),
    }),
    { caixas: 0, unidades: 0, enderecos: 0 }
  );
}
