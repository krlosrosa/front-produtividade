export type Formulario = {
  transporte: string;
  idPallet: string;
  quantidadeCaixa: number;
  quantidadeUnidade: number;
  linhasPickingVisitadas: number;
  empresa: string;
  segmento: string
};

export type Resumo = {
  caixas: number;
  unidades: number;
  enderecos: number;
};

export type Usuario = {
  id: string;
  nome: string;
  matricula: string;
};

export type Processo = {
  processo: string
  dataRegistro?: Date
}