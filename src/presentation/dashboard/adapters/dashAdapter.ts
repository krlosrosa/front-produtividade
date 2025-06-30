// services/dashAdapter.ts
import { GetProdutividadeResult } from "@/domain/get-produtividade";
import { DashType, ListItens } from "../types/dashType";

export const adaptProdutividadeToDash = (
  backendData: GetProdutividadeResult[]
): DashType => {
  const listItens: ListItens[] = backendData.map((item) => ({
    transporte: item.transporte,
    id: item.id,
    empresa: item.empresa,
    funcionarioId: item.funcionarioId.replace("func_", ""),
    nomeFuncionario: item.nomeFuncionario.replace("func_", ""),
    horarioInicio: new Date(item.horaInicio),
    horarioTermino: item.horaFim ? new Date(item.horaFim) : undefined,
    caixas: item.caixas || 0,
    unidade: item.unidade || 0,
    visitas: item.visitado || 0,
    produtividade: item.produtividade,
    status: !!item.horaFim, // true se concluído
    processo: item.processo
  }));

  return {
    totalProcess: backendData.length,
    emAndamento: backendData.filter((item) => !item.horaFim).length,
    concluido: backendData.filter((item) => item.horaFim).length,
    totalCaixas: backendData.reduce((sum, item) => sum + (item.caixas || 0), 0),
    listItens,
  };
};
