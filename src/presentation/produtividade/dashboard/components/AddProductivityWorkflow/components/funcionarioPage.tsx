"use client";
import { Button } from "@/components/ui/button";
import { useProdutividadeStore } from "@/presentation/produtividade/dashboard/store/useProdutividadeStore";
import { ChevronLeft, RotateCcw } from "lucide-react";
import BuscarFuncionario from "@/presentation/produtividade/dashboard/components/AddProductivityWorkflow/components/buscarFuncionario";
import ListaDeFuncionarios from "@/presentation/produtividade/dashboard/components/AddProductivityWorkflow/components/listaFuncionarios";
import { CadastroDeFuncionarioModal } from "./cadastroFuncionario";
import { useState } from "react";

export default function FuncionarioPageUSer() {
  const { setTabSelect, resetUser } = useProdutividadeStore();

  return (
    <div className="h-full p-4 bg-gray-50">
      <div className="space-y-3 h-full flex flex-col">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-gray-600 hover:text-gray-900 px-2"
            onClick={() => setTabSelect("produtividade")}
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div className="flex gap-2">
            <Button
              onClick={resetUser}
              variant="outline"
              size="sm"
              className="gap-1 px-3"
            >
              <RotateCcw className="w-3 h-3" />
              Limpar
            </Button>
            <CadastroDeFuncionarioModal />
          </div>
        </div>
        <div className="flex gap-4 flex-1 min-h-0">
          <div className="w-1/2">
            <BuscarFuncionario />
          </div>
          <ListaDeFuncionarios />
        </div>
      </div>
    </div>
  );
}
