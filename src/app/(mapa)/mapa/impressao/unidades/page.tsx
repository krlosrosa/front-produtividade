"use client"

import { useCadastroItemStore } from "@/features/mapa/store/cadastroItemStore"
import { useConfigImpressaoStore } from "@/features/mapa/store/configImpressaoStore"
import { useRemessaStore } from "@/features/mapa/store/remessasStore"
import { processarDadosAjustes } from "../utils/ajustesUtils"
import { TabelaUnidades } from "./components/TabelaUnidades"

export default function UnidadesPage() {
  const { dataRemessa } = useRemessaStore()
  const { dataCadastroItem } = useCadastroItemStore()
  const { 
    tipoAgrupamento, 
    grupoTransporte, 
    clientesSegregar, 
    grupoCliente, 
    quebraPallet, 
    percentualQuebra,
    palletsFull,
    unidades,
    percentualMinimo,
    percentualMaximo,
    segregarProdutoFIFO,
    faixasFIFO
  } = useConfigImpressaoStore()

  // Processar todos os dados usando a função utilitária
  const dataProcessada = processarDadosAjustes(
    dataRemessa,
    dataCadastroItem,
    tipoAgrupamento,
    grupoTransporte,
    grupoCliente,
    clientesSegregar,
    quebraPallet,
    percentualQuebra,
    palletsFull,
    unidades,
    percentualMinimo,
    percentualMaximo,
    segregarProdutoFIFO,
    faixasFIFO
  )

  // Filtrar apenas grupos que contêm "Unidades"
  const unidadesFiltradas = dataProcessada.filter(grupo => 
    grupo.chave.includes("Unidades")
  )

  return <TabelaUnidades unidades={unidadesFiltradas} />
} 