export interface GetProdutividadeInfo {
  getProdutividadeInfo: (
    params: GetProdutividadeInfoParams
  ) => Promise<GetProdutividadeInfoResult>;
}

export type GetProdutividadeInfoParams = {
  processo: string;
  idPallet: string;
  transporte: string;
};

export type GetProdutividadeInfoResult = {
  id: number;
  transporte: string;
  empresa: string;
  processo: string;
  caixas: number;
  unidade: number;
  visitado: number;
  horaInicio: Date;
  horaFim?: Date | null;
  inicioPausa?: Date | null;
  terminoPause?: Date | null;
  centerId: string;
  userId: string;
  dataRegistro: Date;
  funcionarioId: string;
  produtividade: number;
};
