export function parseCadastroRapido(input: string): CadastroRapido {
  const [
    empresa = "",
    transporte = "",
    processo = "",
    idPallet = "",
    quantidadeCaixa = "",
    quantidadeUnidade = "",
    linhasPickingVisitadas = "",
    segmento = "",
    
  ] = input.split(";").map((s) => s.trim());

  return {
    empresa,
    transporte,
    idPallet,
    quantidadeCaixa: parseInt(quantidadeCaixa),
    quantidadeUnidade: parseInt(quantidadeUnidade),
    linhasPickingVisitadas: parseInt(linhasPickingVisitadas),
    segmento: segmento,
  };
}

type CadastroRapido = {
  empresa: string;
  transporte: string;
  idPallet: string;
  quantidadeCaixa: number;
  quantidadeUnidade: number;
  linhasPickingVisitadas: number;
  segmento: string;
};
