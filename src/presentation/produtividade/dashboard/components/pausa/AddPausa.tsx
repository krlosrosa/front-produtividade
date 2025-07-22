import { ReactNode, useState } from "react";
import FormCadastroPausa from "./components/formCadastroPausa";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useProdutividadeStore } from "../../store/useProdutividadeStore";

type Props = {
  children: ReactNode;
};

export default function AddPauseButton({ children }: Props) {
  const [infoQrCode, setInfoQrCode] = useState("");
  const { demanda, setDemandaOnChange } = useProdutividadeStore();

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
