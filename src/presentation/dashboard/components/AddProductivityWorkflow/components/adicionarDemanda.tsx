import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { useAddProdutividadeMutation } from "@/presentation/dashboard/application/useProdutividade-mutation";
import { useProdutividadeStore } from "@/presentation/dashboard/store/useProdutividadeStore";

export default function AdicionarDemandaButton() {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { itensProdutividade, quantidadeAcumulada, user, processo } = useProdutividadeStore()
  const { mutate, isPending } = useAddProdutividadeMutation()

  const openConfirmationDialog = () => setIsConfirmationOpen(true);
  const closeConfirmationDialog = () => setIsConfirmationOpen(false);

  const handleConfirm = async () => {
      mutate({
        caixas: quantidadeAcumulada.caixas,
        unidade: quantidadeAcumulada.unidades,
        visitado: quantidadeAcumulada.unidades,
        empresa: itensProdutividade[0].empresa as  "LDB" | "ITB" | "DPA",
        funcionarioId: user.id,
        segmento: itensProdutividade[0].segmento,
        items: itensProdutividade,
        horaInicio: new Date(),
        transporte: itensProdutividade[0].transporte,
        processo: processo.processo as "CONFERENCIA" | "SEPARACAO",
        dataRegistro: processo.dataRegistro as Date
      })

      closeConfirmationDialog();
  }

  return (
    <>
      <Button
        onClick={openConfirmationDialog}
        className="w-full bg-green-600 hover:bg-green-700 h-9 text-sm"
      >
        <Plus className="w-3 h-3 mr-1" />
        Adicionar Demanda
      </Button>

      <Dialog open={isConfirmationOpen} onOpenChange={closeConfirmationDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Cadastro</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja cadastrar esta nova demanda?
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <p className="text-sm text-muted-foreground">
              Esta ação irá criar uma nova demanda no sistema e não poderá ser
              desfeita.
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={closeConfirmationDialog}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              className="bg-green-600 hover:bg-green-700"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cadastrando...
                </>
              ) : (
                "Confirmar Cadastro"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
