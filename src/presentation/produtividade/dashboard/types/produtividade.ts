export type ProdutividadeType = {
  id: number;
  transporte: string;
  empresa: "DPA" | "ITB" | "LDB";
  processo: "SEPARACAO" | "CARREGAMENTO";
  caixas: number;
  unidade: number;
  visitado: number;
  horaInicio: Date;
  horaFim: Date | null;
  inicioPausa: Date | null;
  terminoPause: Date | null;
  centerId: string;
  userId: string;
  dataRegistro: Date;
  funcionarioId: string;
  segmento: "SECO" | "REFRIGERADO";
};

export type ProdutividadeItemType = {
  empresa: string;
  idPallet: string;
  processo: string;
  linhasPickingVisitadas: number;
  quantidadeCaixa: number;
  quantidadeUnidade: number;
  idDemanda?: number;
  transporte: string;
  segmento: "SECO" | "REFRIGERADO";
};

export type ProdutividadeFormType = {
  empresa: string;
  transporte: string;
  idPallet: string;
  quantidadeCaixa: string;
  quantidadeUnidade: string;
  linhasPickingVisitadas: string;
  segmento: "SECO" | "REFRIGERADO";
};


export type QuantidadeProdutividadeAcc = {
  caixas: number;
  unidades: number;
  enderecos: number;
};

export type Processo = {
  processo: string
  dataRegistro?: Date
}

export type DemandaSelecionada = {
  idPallet: string;
  transporte: string;
};