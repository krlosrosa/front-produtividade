import { create } from "zustand";

type Store = {
  demanda: Demanda;
  setdemanda: (user: Demanda) => void;
  setDemandaOnChange: (params: Partial<Demanda>) => void;
};

export const useStoreFinalizarProdutividade = create<Store>((set, get) => ({
  demanda: {
    idPallet: "",
    transporte: "",
  },
  setdemanda: (demanda: Demanda) => set({ demanda }),
  setDemandaOnChange: (params) =>
    set((state) => ({
      demanda: {
        ...state.demanda,
        ...params,
      },
    })),
}));

export type Demanda = {
  idPallet: string;
  transporte: string;
};
