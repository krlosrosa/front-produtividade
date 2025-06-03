export interface AddProdutividade {
  addProdutividade: (params: AddProdutividadeParams) => Promise<boolean>;
}

export type AddProdutividadeParams = {
    funcionarioId: string; 
    dataRegistro: Date; 
    horaInicio: Date; 
    transporte: string; 
    caixas: number; 
    unidade: number; 
    visitado: number; 
    processo: "CONFERENCIA" | "SEPARACAO"; 
    empresa: "LDB" | "ITB" | "DPA"; 
    items: ItensProdutividade[];
    segmento: string;
  };

type ItensProdutividade = {
  transporte: string;
  idPallet: string;
  quantidadeCaixa: number;
  quantidadeUnidade: number;
  linhasPickingVisitadas: number;
  empresa: string;
};
