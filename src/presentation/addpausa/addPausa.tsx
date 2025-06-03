import { ReactNode, useState } from "react";
import FormCadastroPausa from "./components/formCadastroPausa";
import { useStoreFinalizarProdutividade } from "../finalizarProdutividade/atom";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useFinalizarProdutividadeQuery } from "../finalizarProdutividade/application/query";

type Props = {
  children: ReactNode;
};

export default function AddPauseButton({ children }: Props) {
  const [infoQrCode, setInfoQrCode] = useState("");
  const { demanda, setDemandaOnChange } = useStoreFinalizarProdutividade();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>
          Adicionar Pausa
        </DialogTitle>
        <FormCadastroPausa
          infoQrCode={infoQrCode}
          demanda={demanda}
          setDemandaOnChange={setDemandaOnChange}
          setInfoQrCode={setInfoQrCode}
        />
      </DialogContent>
    </Dialog>
  );
}
