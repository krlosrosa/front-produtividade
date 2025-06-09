export interface FinalizarPausaAll {
  finalizarPausaAll: () => Promise<boolean>;
}

export type FinalizarPausaAllParams = {
  processo: string
  centerId:string
  data: Date
}
