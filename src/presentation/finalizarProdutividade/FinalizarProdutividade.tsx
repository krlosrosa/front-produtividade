"use client";
import { useStoreFinalizarProdutividade } from "./atom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFinalizarProdutividadeQuery } from "./application/query";
import { useFinalizarProdutividade } from "./application/mutation";
import ModaConfirmacao from "./components/modalConfirmacao";
import ResumoTransporte from "./components/resumoTransporte";
import FuncionarioCadastro from "./components/formularioCadastro";

export default function FinalizarProdutividade() {
  const { demanda, setDemandaOnChange } = useStoreFinalizarProdutividade();

  const [cadastroRapido, setCadastroRapido] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { data } = useFinalizarProdutividadeQuery();
  const { mutateAsync, isPending } = useFinalizarProdutividade();

  const handleAddProdutividade = async () => {
    mutateAsync();
  };

  const openConfirmationDialog = () => {
    if (data) {
      setShowConfirmation(true);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4 p-4">
      {/* Modal de Confirmação */}
      <ModaConfirmacao
        handleAddProdutividade={handleAddProdutividade}
        isPending={isPending}
        setShowConfirmation={setShowConfirmation}
        showConfirmation={showConfirmation}
        transporte={data?.transporte}
      />
      {/* Resumo do Transporte */}
      <ResumoTransporte data={data} />
      {/* Resumo de cadastro */}
      <FuncionarioCadastro
        demanda={demanda}
        setDemandaOnChange={setDemandaOnChange}
      />
      <Button
        className="w-full"
        onClick={openConfirmationDialog}
        disabled={isLoading || data === undefined}
      >
        {isLoading ? "Processando..." : "Finalizar Produtividade"}
      </Button>
    </div>
  );
}
