import { User } from "@/presentation/types/type-users";
import {
  Formulario,
  Processo,
  Resumo,
} from "@/presentation/types/types-produtividade";
import { create } from "zustand";

function calcularResumo(formularios: Formulario[]): Resumo {
  return formularios.reduce<Resumo>(
    (acc, curr) => ({
      caixas: acc.caixas + curr.quantidadeCaixa,
      unidades: acc.unidades + curr.quantidadeUnidade,
      enderecos: acc.enderecos + curr.linhasPickingVisitadas,
    }),
    { caixas: 0, unidades: 0, enderecos: 0 }
  );
}

type Store = {
  formulario: Formulario;
  formularios: Formulario[];
  resumo: Resumo;
  user: User;
  processo: Processo;
  setFormulario: (formulario: Partial<Formulario>) => void;
  adicionarFormulario: () => void;
  reset: () => void;
  removerFormulario: (index: number) => void;
  setUser: (user: User) => void;
  setProcesso: (processo: Processo) => void;
  resetForm: () => void;
};

export const useStoreProdutividade = create<Store>((set, get) => ({
  formulario: {
    empresa: "",
    idPallet: "",
    linhasPickingVisitadas: 0,
    quantidadeCaixa: 0,
    quantidadeUnidade: 0,
    transporte: "",
  },
  processo: {
    processo: "",
  },
  resumo: {
    caixas: 0,
    enderecos: 0,
    unidades: 0,
  },
  user: {
    id: "",
    name: "",
  },
  formularios: [],
  setFormulario: (formulario) =>
    set((state) => ({
      formulario: {
        ...state.formulario,
        ...formulario,
      },
    })),
  adicionarFormulario: () => {
    const { formularios, formulario } = get();
    const novosFormularios = [...formularios, formulario];
    return set({
      formularios: novosFormularios,
      resumo: calcularResumo(novosFormularios),
    });
  },
  reset: () =>
    set((state) => ({
      formulario: {
        empresa: state.formulario.empresa,
        idPallet: "",
        linhasPickingVisitadas: 0,
        quantidadeCaixa: 0,
        quantidadeUnidade: 0,
        transporte: state.formulario.transporte,
      },
    })),
  resetForm: () =>
    set(() => ({
      formularios: [],
      formulario: {
        empresa: "",
        idPallet: "",
        linhasPickingVisitadas: 0,
        quantidadeCaixa: 0,
        quantidadeUnidade: 0,
        transporte: "",
      },
      resumo: {
        caixas: 0,
        enderecos: 0,
        unidades: 0,
      },
    })),
  removerFormulario: (index) => {
    const novosFormularios = get().formularios.filter((_, i) => i !== index);
    return set({
      formularios: novosFormularios,
      resumo: calcularResumo(novosFormularios),
    });
  },
  setUser: (user: User) => set({ user }),
  setProcesso: (processo: Processo) => set({ processo }),
}));
