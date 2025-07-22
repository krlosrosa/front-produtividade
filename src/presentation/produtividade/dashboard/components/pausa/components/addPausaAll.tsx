// components/ConfirmationDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react"; // Importando ícone de loading
import { useProdutividadeStore } from "@/presentation/produtividade/dashboard/store/useProdutividadeStore";
import { useAddPausaAll } from "@/presentation/produtividade/dashboard/application/useAddPausaAll";


export function ConfirmationDialog() {
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const { processo } = useProdutividadeStore();
  const { mutateAsync, isPending } = useAddPausaAll();

  async function addPausa() {
    await mutateAsync();
    setOpen(false);
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Adicionar Pausa geral</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza?</DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. Adicionar pausa para todos os
            funcionários que estão em processo de {processo.processo}.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" disabled={isPending}>
            Cancelar
          </Button>
          <Button
            disabled={isPending}
            onClick={addPausa}
            variant="default"
            className="min-w-24" // Garante que o botão não mude muito de tamanho
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              "Confirmar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
