import { ProdutividadeFormType, ProdutividadeItemType } from "@/presentation/dashboard/types/produtividade";

export function parseCadastroRapido(input: string): ProdutividadeItemType {
  const [
    transporte = "",
    idPallet = "",
    quantidadeCaixa = "",
    quantidadeUnidade = "",
    linhasPickingVisitadas = "",
    segmento = "",
    empresa = "",
    processo = "",
  ] = input.split(";").map((s) => s.trim());

  return {
    empresa,
    transporte,
    idPallet,
    quantidadeCaixa: parseInt(quantidadeCaixa),
    quantidadeUnidade: parseInt(quantidadeUnidade),
    linhasPickingVisitadas: parseInt(linhasPickingVisitadas),
    processo: processo,
    segmento: segmento as "SECO" | "REFRIGERADO",
  };
}
