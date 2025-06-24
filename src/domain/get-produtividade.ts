export interface GetProdutividade {
  getProdutividade: (params: GetProdutividadeParams) => Promise<GetProdutividadeResult[]>;
}

export type GetProdutividadeParams = {
    centerId: string;
    data: Date;
    processo: string
  };

export type GetProdutividadeResult = {
    id: number;
    transporte: string;
    empresa: string;
    processo: string;
    caixas: number;
    unidade: number;
    visitado: number;
    horaInicio: Date;
    horaFim?: Date | null;
    centerId: string;
    userId: string;
    dataRegistro: Date;
    funcionarioId: string;
    produtividade: number;
    nomeFuncionario: string;
};
