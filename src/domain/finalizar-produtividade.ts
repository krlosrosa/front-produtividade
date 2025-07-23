export interface FinalizarProdutividade {
  finalizarProdutividade: (params?: FinalizarProdutividadeInfoParamsObservacao) => Promise<boolean>;
}

export type FinalizarProdutividadeInfoParams = {
  processo: string;
  idPallet: string;
  transporte: string;
  observacao?: FinalizarProdutividadeInfoParamsObservacao;
};

export type FinalizarProdutividadeInfoParamsObservacao = {
  observacao?: {
    informacao: string;
  }
};
