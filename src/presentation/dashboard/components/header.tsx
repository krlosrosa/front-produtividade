"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Clock, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStatusCenterQuery } from "../application/use-status-center-query";
import AddProductivityWorkflow from "./AddProductivityWorkflow";
import FinalizarProdutividadePage from "./finalizarTransporte";
import AddPauseButton from "./pausa/AddPausa";
import { ConfirmationDialogFinalizar } from "./pausa/components/finalizarPausaAll";
import { ConfirmationDialog } from "./pausa/components/addPausaAll";

export default function HeaderDashboard() {
  const router = useRouter();
  const { data, isLoading } = useStatusCenterQuery();

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard de Produtividade
        </h1>
        <p className="text-muted-foreground">
          Visão geral dos processos logísticos
        </p>
        {data && <Badge variant="destructive">Em Pausa</Badge>}
      </div>

      <div className="flex gap-2 w-full md:w-auto items-center">
        <AddProductivityWorkflow />
        <FinalizarProdutividadePage />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <AddPauseButton>
              <DropdownMenuItem
                className="gap-2 cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                <Clock className="h-4 w-4" />
                Adicionar Pausa
              </DropdownMenuItem>
            </AddPauseButton>

            <DropdownMenuSeparator />

            {data ? (
              <DropdownMenuItem
                className="gap-2 cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                <ConfirmationDialogFinalizar />
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className="gap-2 cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                <ConfirmationDialog />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
