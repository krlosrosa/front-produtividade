"use client"

import { useCadastroItemStore } from "@/features/mapa/store/cadastroItemStore"
import { useConfigImpressaoStore } from "@/features/mapa/store/configImpressaoStore"
import { useRemessaStore } from "@/features/mapa/store/remessasStore"
import { processarDadosAjustes } from "../utils/ajustesUtils"
import { TabelaPallets } from "./components/TabelaPallets"

export default function PalletsPage() {
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

  // Filtrar apenas grupos que contêm "Pallets Completos"
  const palletsCompletos = dataProcessada.filter(grupo => 
    grupo.chave.includes("Pallets Completos")
  )

  return <TabelaPallets palletsCompletos={palletsCompletos} />
} 