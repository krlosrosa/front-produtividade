"use client";

import { Button } from "@/components/ui/button";
import AddPauseButton from "@/presentation/addpausa/addPausa";
import FinalizarProdutividade from "@/presentation/finalizarProdutividade/FinalizarProdutividade";
import { CheckCircle, PlusCircle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeaderDashboard() {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard de Produtividade
        </h1>
        <p className="text-muted-foreground">
          Visão geral dos processos logísticos
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto items-center">
        <Button
          onClick={() => router.push("/addprodutividade")}
          className="gap-2 shadow-sm"
        >
          <PlusCircle className="h-4 w-4" />
          Nova Produtividade
        </Button>
        <AddPauseButton>
          <Button variant="outline" className="gap-2">
            <Clock className="h-4 w-4" />
            Adicionar Pausa
          </Button>
        </AddPauseButton>
        <FinalizarProdutividade>
          <Button variant="outline" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Finalizar
          </Button>
        </FinalizarProdutividade>
      </div>
    </div>
  );
}
