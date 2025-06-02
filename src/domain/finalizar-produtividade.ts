export interface FinalizarProdutividade {
  finalizarProdutividade: () => Promise<boolean>;
}

export type FinalizarProdutividadeInfoParams = {
  processo: string;
  idPallet: string;
  transporte: string;
};
