import { differenceInMinutes } from "date-fns";

  export const calcularProdutividade = (item: any) => {
    const horaInicio = new Date(item.horaInicio);
    const horaFim = item.horaFim ? new Date(item.horaFim) : new Date();

    // Calcula a diferença em minutos
    const diferencaMinutos = differenceInMinutes(horaFim, horaInicio);

    // Converte minutos para horas (com pelo menos 1 minuto para evitar divisão por zero)
    const horasTrabalhadas = Math.max(1, diferencaMinutos) / 60;

    // Calcula a produtividade (caixas por hora) permitindo frações
    const produtividade = item.caixas / horasTrabalhadas;

    // Arredonda para 1 casa decimal
    return Math.round(produtividade * 10) / 10;
  };