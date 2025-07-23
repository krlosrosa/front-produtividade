"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle } from "lucide-react";
import ResumoTransporte from "./components/resumoTransporte";
import FuncionarioCadastro from "./components/formularioFinalizacao";
import { useFinalizarProdutividadeMutation } from "../../application/useFinalizarProdutividadeMutation";
import { useProdutividadeStore } from "../../store/useProdutividadeStore";
import { useBuscarInfoProdutividadeQuery } from "../../application/useBuscarInfoProdutividade";
import { useStatusCenterQuery } from "../../application/use-status-center-query";
import { Input } from "@/components/ui/input";

export default function FinalizarProdutividadePage() {
  const { demanda, setDemandaOnChange } = useProdutividadeStore();
    const { data: statusPausa } = useStatusCenterQuery();

  const [infoQrCode, setInfoQrCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [observacao, setObservacao] = useState("");
  const { data } = useBuscarInfoProdutividadeQuery();
  const { mutateAsync, isPending } = useFinalizarProdutividadeMutation();

  const handleAddProdutividade = async () => {
    await mutateAsync({
      observacao: {
        informacao: observacao,
      },
    });
    setInfoQrCode("");
    setDemandaOnChange({
      idPallet: "",
      transporte: "",
    });
  };

  const openConfirmationDialog = () => {
    if (data) {
      setShowConfirmation(true);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4 p-4">
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Finalização</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a finalizar a produtividade do transporte #
              {data?.transporte}. Esta ação não pode ser desfeita.
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
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={statusPausa} variant="outline" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Finalizar
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Finalizar Demanda</DialogTitle>
          {/* Resumo do Transporte */}
          <ResumoTransporte data={data} />
          {/* Resumo de cadastro */}
          <FuncionarioCadastro
            observacao={observacao}
            setObservacao={setObservacao}
            setInfoQrCode={setInfoQrCode}
            infoQrCode={infoQrCode}
            demanda={demanda}
            setDemandaOnChange={setDemandaOnChange}
          />
          <Button
            className="w-full"
            onClick={openConfirmationDialog}
            disabled={
              isLoading ||
              data === undefined ||
            (data.horaInicio !== null && data?.horaFim !== null)||
              (data?.inicioPausa !== null &&
                data?.inicioPausa !== undefined &&
                (data?.terminoPause === null ||
                  data?.terminoPause === undefined))
            }
          >
            {isLoading ? "Processando..." : "Finalizar Produtividade"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
