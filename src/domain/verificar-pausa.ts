export interface VerificarPausa {
  verificarPausa: () => Promise<boolean>;
}

export type VerificarPausaParams = {
  processo: string
  centerId:string
  data: Date
}
