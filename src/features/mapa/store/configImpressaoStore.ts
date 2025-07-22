import { create } from "zustand"
import { persist } from "zustand/middleware"

// Tipos
export type TipoAgrupamento = "codCliente" | "transporte"

export type GrupoTransporte = {
  id: string
  nome: string
  transportes: string[]
}

export type ConfiguracaoFolha = "mesma" | "separada" | "ambos"

// Interface do Store
interface ConfigImpressaoState {
  // Estados de configuração
  tipoAgrupamento: TipoAgrupamento
  clientesSegregar: string[]
  grupoTransporte: GrupoTransporte[]
  grupoCliente: GrupoTransporte[]
  
  // Configurações de percentual
  percentualMinimo: string
  percentualMaximo: string
  
  // Configurações de quebra de pallet
  quebraPallet: boolean
  percentualQuebra: string
  
  // Configurações de folhas
  palletsFull: ConfiguracaoFolha
  unidades: ConfiguracaoFolha
  exibirRangeData: boolean
  converterCaixasParaPallet: boolean
  segregarProdutoFIFO: boolean
  faixasFIFO: string[]
}

interface ConfigImpressaoActions {
  // Ações de agrupamento
  setTipoAgrupamento: (tipo: TipoAgrupamento) => void
  
  // Ações de clientes segregados
  adicionarCliente: (cliente: string) => void
  removerCliente: (cliente: string) => void
  setClientesSegregar: (clientes: string[]) => void
  
  // Ações de grupos de transporte
  adicionarGrupoTransporte: (nome: string) => void
  removerGrupoTransporte: (grupoId: string) => void
  adicionarTransporteAoGrupo: (grupoId: string, transporte: string) => void
  removerTransporteDoGrupo: (grupoId: string, transporte: string) => void
  setGrupoTransporte: (grupos: GrupoTransporte[]) => void
  
  // Ações de grupos de cliente
  adicionarGrupoCliente: (nome: string) => void
  removerGrupoCliente: (grupoId: string) => void
  adicionarClienteAoGrupo: (grupoId: string, cliente: string) => void
  removerClienteDoGrupo: (grupoId: string, cliente: string) => void
  setGrupoCliente: (grupos: GrupoTransporte[]) => void
  
  // Ações de percentual
  setPercentualMinimo: (percentual: string) => void
  setPercentualMaximo: (percentual: string) => void
  
  // Ações de quebra de pallet
  setQuebraPallet: (ativo: boolean) => void
  setPercentualQuebra: (percentual: string) => void
  
  // Ações de configuração de folhas
  setPalletsFull: (config: ConfiguracaoFolha) => void
  setUnidades: (config: ConfiguracaoFolha) => void
  setExibirRangeData: (exibir: boolean) => void
  setConverterCaixasParaPallet: (converter: boolean) => void
  setSegregarProdutoFIFO: (segregar: boolean) => void
  setFaixasFIFO: (faixas: string[]) => void
  adicionarFaixaFIFO: (faixa: string) => void
  removerFaixaFIFO: (faixa: string) => void
  
  // Ações de reset
  resetConfiguracao: () => void
}

type ConfigImpressaoStore = ConfigImpressaoState & ConfigImpressaoActions

// Estado inicial
const initialState: ConfigImpressaoState = {
  tipoAgrupamento: "transporte",
  clientesSegregar: [],
  grupoTransporte: [],
  grupoCliente: [],
  percentualMinimo: "",
  percentualMaximo: "",
  quebraPallet: false,
  percentualQuebra: "",
  palletsFull: "mesma",
  unidades: "mesma",
  exibirRangeData: false,
  converterCaixasParaPallet: true,
  segregarProdutoFIFO: false,
  faixasFIFO: [],
}

// Store
export const useConfigImpressaoStore = create<ConfigImpressaoStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Ações de agrupamento
      setTipoAgrupamento: (tipo) => set({ tipoAgrupamento: tipo }),

      // Ações de clientes segregados
      adicionarCliente: (cliente) => {
        const { clientesSegregar } = get()
        if (!clientesSegregar.includes(cliente)) {
          set({ clientesSegregar: [...clientesSegregar, cliente] })
        }
      },
      
      removerCliente: (cliente) => {
        const { clientesSegregar } = get()
        set({ clientesSegregar: clientesSegregar.filter(c => c !== cliente) })
      },
      
      setClientesSegregar: (clientes) => set({ clientesSegregar: clientes }),

      // Ações de grupos de transporte
      adicionarGrupoTransporte: (nome) => {
        const { grupoTransporte } = get()
        const novoGrupo: GrupoTransporte = {
          id: Date.now().toString(),
          nome: nome,
          transportes: []
        }
        set({ grupoTransporte: [...grupoTransporte, novoGrupo] })
      },
      
      removerGrupoTransporte: (grupoId) => {
        const { grupoTransporte } = get()
        set({ grupoTransporte: grupoTransporte.filter(grupo => grupo.id !== grupoId) })
      },
      
      adicionarTransporteAoGrupo: (grupoId, transporte) => {
        const { grupoTransporte } = get()
        set({
          grupoTransporte: grupoTransporte.map(grupo => 
            grupo.id === grupoId 
              ? { ...grupo, transportes: [...grupo.transportes, transporte] }
              : grupo
          )
        })
      },
      
      removerTransporteDoGrupo: (grupoId, transporte) => {
        const { grupoTransporte } = get()
        set({
          grupoTransporte: grupoTransporte.map(grupo => 
            grupo.id === grupoId 
              ? { ...grupo, transportes: grupo.transportes.filter(t => t !== transporte) }
              : grupo
          )
        })
      },
      
      setGrupoTransporte: (grupos) => set({ grupoTransporte: grupos }),

      // Ações de grupos de cliente
      adicionarGrupoCliente: (nome) => {
        const { grupoCliente } = get()
        const novoGrupo: GrupoTransporte = {
          id: Date.now().toString(),
          nome: nome,
          transportes: []
        }
        set({ grupoCliente: [...grupoCliente, novoGrupo] })
      },
      
      removerGrupoCliente: (grupoId) => {
        const { grupoCliente } = get()
        set({ grupoCliente: grupoCliente.filter(grupo => grupo.id !== grupoId) })
      },
      
      adicionarClienteAoGrupo: (grupoId, cliente) => {
        const { grupoCliente } = get()
        set({
          grupoCliente: grupoCliente.map(grupo => 
            grupo.id === grupoId 
              ? { ...grupo, transportes: [...grupo.transportes, cliente] }
              : grupo
          )
        })
      },
      
      removerClienteDoGrupo: (grupoId, cliente) => {
        const { grupoCliente } = get()
        set({
          grupoCliente: grupoCliente.map(grupo => 
            grupo.id === grupoId 
              ? { ...grupo, transportes: grupo.transportes.filter(c => c !== cliente) }
              : grupo
          )
        })
      },
      
      setGrupoCliente: (grupos) => set({ grupoCliente: grupos }),

      // Ações de percentual
      setPercentualMinimo: (percentual) => set({ percentualMinimo: percentual }),
      setPercentualMaximo: (percentual) => set({ percentualMaximo: percentual }),

      // Ações de quebra de pallet
      setQuebraPallet: (ativo) => set({ quebraPallet: ativo }),
      setPercentualQuebra: (percentual) => set({ percentualQuebra: percentual }),

      // Ações de configuração de folhas
      setPalletsFull: (config) => set({ palletsFull: config }),
      setUnidades: (config) => set({ unidades: config }),
      setExibirRangeData: (exibir) => set({ exibirRangeData: exibir }),
      setConverterCaixasParaPallet: (converter) => set({ converterCaixasParaPallet: converter }),
      setSegregarProdutoFIFO: (segregar) => set({ segregarProdutoFIFO: segregar }),
      setFaixasFIFO: (faixas) => set({ faixasFIFO: faixas }),
      adicionarFaixaFIFO: (faixa) => set({ faixasFIFO: [...get().faixasFIFO, faixa] }),
      removerFaixaFIFO: (faixa) => set({ faixasFIFO: get().faixasFIFO.filter(f => f !== faixa) }),

      // Ações de reset
      resetConfiguracao: () => set(initialState),
    }),
    {
      name: "config-impressao-storage",
      partialize: (state) => ({
        tipoAgrupamento: state.tipoAgrupamento,
        clientesSegregar: state.clientesSegregar,
        grupoTransporte: state.grupoTransporte,
        grupoCliente: state.grupoCliente,
        percentualMinimo: state.percentualMinimo,
        percentualMaximo: state.percentualMaximo,
        quebraPallet: state.quebraPallet,
        percentualQuebra: state.percentualQuebra,
        palletsFull: state.palletsFull,
        unidades: state.unidades,
        exibirRangeData: state.exibirRangeData,
        converterCaixasParaPallet: state.converterCaixasParaPallet,
        segregarProdutoFIFO: state.segregarProdutoFIFO,
        faixasFIFO: state.faixasFIFO,
      }),
    }
  )
) 