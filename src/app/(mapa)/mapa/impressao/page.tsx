"use client"

import { useCadastroItemStore } from "@/features/mapa/store/cadastroItemStore"
import { useConfigImpressaoStore } from "@/features/mapa/store/configImpressaoStore"
import { useRemessaStore } from "@/features/mapa/store/remessasStore"
import { processarDadosAjustes } from "./utils/ajustesUtils"
import { TabelaAjustes } from "./components/TabelaAjustes"

export default function AjustesPage() {
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

  return (
    <div className="space-y-6">
      {/* Componente de visualização (não visível na impressão) */}
      <div >
        <TabelaAjustes dataComQuebraPallet={dataProcessada} />
      </div>
    </div>
  )
}