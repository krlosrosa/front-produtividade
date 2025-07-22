import { create } from "zustand";
import {
  DemandaSelecionada,
  Processo,
  ProdutividadeItemType,
  QuantidadeProdutividadeAcc,
} from "../types/produtividade";
import { calcularResumo } from "@/utils/calcularResumo";

export const useProdutividadeStore = create<
  ProdutividadeState &
    ProdutividadeActions &
    ModalState &
    ModalActions &
    TabActions &
    TabState &
    UserState &
    UserActions &
    ProcessoState &
    ProcessoActions &
    DemandaSelecionadaState &
    DemandaSelecionadaAction
>((set, get) => ({
  // Estados iniciais
  isModalAddProdutividadeOpen: false,
  tabSelect: "produtividade",
  itensProdutividade: [],
  quantidadeAcumulada: {
    caixas: 0,
    enderecos: 0,
    unidades: 0,
  },
  user: {
    id: "",
    name: "",
  },
  userFiltro: "",
  processo: {
    processo: "",
  },
  demanda: {
    idPallet: "",
    transporte: "",
  },

  // Ações
  toggleProdutividadeModal: () =>
    set((state) => ({
      isModalAddProdutividadeOpen: !state.isModalAddProdutividadeOpen,
    })),

  setTabSelect: (tab) => set({ tabSelect: tab }),
  resetTabSelect: () => set({ tabSelect: "produtividade" }),
  addItemProdutividade: (item) =>
    set((state) => {
      const novosItens = [...state.itensProdutividade, { ...item }];
      return {
        itensProdutividade: novosItens,
        quantidadeAcumulada: calcularResumo(novosItens), // Usa o novo array já atualizado
      };
    }),
  removeItemProdutividade: (index) =>
    set((state) => {
      const novosItens = state.itensProdutividade.filter((_, i) => i !== index);
      return {
        itensProdutividade: novosItens,
        quantidadeAcumulada: calcularResumo(novosItens), // Usa o novo array já filtrado
      };
    }),
  setUser: (user) =>
    set(() => ({
      user: {
        id: user.id,
        name: user.name,
      },
    })),
  resetUser: () => set(() => ({ user: { id: "", name: "" } })),
  setUserFiltro: (user) => set(() => ({ userFiltro: user })),
  setProcesso: (processo: Processo) => set({ processo }),
  resetProdutividade: () =>
    set(() => ({
      itensProdutividade: [],
      quantidadeAcumulada: { caixas: 0, enderecos: 0, unidades: 0 },
    })),

  setdemanda: (demanda: DemandaSelecionada) => set({ demanda }),
  setDemandaOnChange: (params) =>
    set((state) => ({
      demanda: {
        ...state.demanda,
        ...params,
      },
    })),
}));

//    const novosFormularios = get().formularios.filter((_, i) => i !== index);

type TabState = {
  tabSelect: string;
};

type UserType = {
  id: string;
  name: string;
};

type DemandaSelecionadaState = {
  demanda: DemandaSelecionada;
};

type DemandaSelecionadaAction = {
  setdemanda: (user: DemandaSelecionada) => void;
  setDemandaOnChange: (params: Partial<DemandaSelecionada>) => void;
};

type UserState = {
  user: UserType;
  userFiltro: string;
};

type UserActions = {
  setUser: (user: UserType) => void;
  resetUser: () => void;
  setUserFiltro: (user: string) => void;
};

type ProcessoState = {
  processo: Processo;
};

type ProcessoActions = {
  setProcesso: (processo: Processo) => void;
};

type TabActions = {
  setTabSelect: (tab: string) => void;
  resetTabSelect: () => void; // Adicionei uma ação para resetar
};

type ProdutividadeState = {
  itensProdutividade: ProdutividadeItemType[];
  quantidadeAcumulada: QuantidadeProdutividadeAcc;
};
type ProdutividadeActions = {
  addItemProdutividade: (item: ProdutividadeItemType) => void;
  removeItemProdutividade: (index: number) => void;
  resetProdutividade: () => void;
};
type ModalState = {
  isModalAddProdutividadeOpen: boolean;
};
type ModalActions = {
  toggleProdutividadeModal: () => void; // opcional
};
