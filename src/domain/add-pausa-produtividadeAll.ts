export interface AddPausaAll {
  addPausaAll: () => Promise<boolean>;
}

export type AddPausaAllParams = {
  processo: string
  centerId:string
  data: Date
}
