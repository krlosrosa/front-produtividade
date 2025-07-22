import {
  ProdutividadeFormType,
  ProdutividadeItemType,
} from "@/presentation/produtividade/dashboard/types/produtividade";

export function parseCadastroRapido(input: string): ProdutividadeItemType {
  if (input.includes("ç")) {
    const [
      transporte = "",
      idPallet = "",
      quantidadeCaixa = "",
      quantidadeUnidade = "",
      linhasPickingVisitadas = "",
      segmento = "",
      empresa = "",
      processo = "",
    ] = input.split("ç").map((s) => s.trim());

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
