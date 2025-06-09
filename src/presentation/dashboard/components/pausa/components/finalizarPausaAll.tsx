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
import { Loader2 } from "lucide-react";
import { useProdutividadeStore } from "@/presentation/dashboard/store/useProdutividadeStore";
import { useEffect, useState } from "react";
import { useFinalizarPausaAll } from "@/presentation/dashboard/application/useFinalizarPausaAll";

export function ConfirmationDialogFinalizar() {
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const { processo } = useProdutividadeStore();
  const { mutateAsync, isPending } = useFinalizarPausaAll();

  async function finalizarPausa() {
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
        <Button>Finalizar Pausa geral</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza?</DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. Finalizará a pausa para todos os
            funcionários que estão em processo de {processo.processo}.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            disabled={isPending}
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            disabled={isPending}
            onClick={finalizarPausa}
            variant="default"
            className="min-w-24"
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
