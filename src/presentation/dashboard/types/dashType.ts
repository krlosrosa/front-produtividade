export type DashType = {
  totalProcess: number
  emAndamento: number
  concluido: number
  totalCaixas: number
  listItens : ListItens[]
}

export type ListItens = {
  transporte: string
  id: number
  empresa: string
  funcionarioId: string
  nomeFuncionario: string
  horarioInicio: Date
  horarioTermino?: Date
  caixas: number
  unidade: number
  visitas: number
  produtividade: number
  status: boolean
  processo: string
}