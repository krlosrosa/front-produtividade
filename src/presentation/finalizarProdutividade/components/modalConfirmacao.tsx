import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dispatch, SetStateAction } from "react";

type Props = {
  showConfirmation: boolean;
  setShowConfirmation: Dispatch<SetStateAction<boolean>>;
  transporte?: string;
  handleAddProdutividade: () => Promise<void>;
  isPending: boolean;
};

export default function ModaConfirmacao({
  showConfirmation,
  setShowConfirmation,
  transporte,
  handleAddProdutividade,
  isPending,
}: Props) {
  return (
    <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Finalização</AlertDialogTitle>
          <AlertDialogDescription>
            Você está prestes a finalizar a produtividade do transporte #
            {transporte}. Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleAddProdutividade}
            disabled={isPending}
          >
            {isPending ? "Finalizando..." : "Confirmar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
