export function parseCadastroRapido(input: string): CadastroRapido {
  const [empresa = "", transporte = "", processo = "", idPallet = "", quantidadeCaixa = "", quantidadeUnidade = "", linhasPickingVisitadas = ""] = input.split(";").map(s => s.trim());

  return {
    empresa,
    transporte,
    idPallet,
    quantidadeCaixa: parseInt(quantidadeCaixa),
    quantidadeUnidade: parseInt(quantidadeUnidade),
    linhasPickingVisitadas: parseInt(linhasPickingVisitadas),
  };
}

type CadastroRapido = {
  empresa: string;
  transporte: string;
  idPallet: string;
  quantidadeCaixa: number;
  quantidadeUnidade: number;
  linhasPickingVisitadas: number;
};
