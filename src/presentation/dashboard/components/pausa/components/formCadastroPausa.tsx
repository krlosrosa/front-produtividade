"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useEffect, KeyboardEvent } from "react"; // Added KeyboardEvent
import { parseCadastroRapido } from "@/utils/cadastrorapido";
import { format } from "date-fns";
import { DemandaSelecionada } from "@/presentation/dashboard/types/produtividade";
import { useBuscarInfoProdutividadeQuery } from "@/presentation/dashboard/application/useBuscarInfoProdutividade";
import { useAddPausaProdutividade } from "@/presentation/dashboard/application/useCadastroPauseProdutividade";

type Props = {
  demanda: DemandaSelecionada;
  setDemandaOnChange: (params: Partial<DemandaSelecionada>) => void;
  infoQrCode: string;
  setInfoQrCode: Dispatch<SetStateAction<string>>;
};

export default function FormCadastroPausa({
  demanda,
  setDemandaOnChange,
  infoQrCode,
  setInfoQrCode,
}: Props) {
  const { data } = useBuscarInfoProdutividadeQuery();
  const { mutateAsync } = useAddPausaProdutividade();

  useEffect(() => {
    setDemandaOnChange({
      idPallet: "",
      transporte: "",
    });
    setInfoQrCode("");
  }, []);

  const handleCadastroRapido = () => {
    const info = parseCadastroRapido(infoQrCode);
    setDemandaOnChange({
      idPallet: info.idPallet,
      transporte: info.transporte,
    });
  };

  // Added keyboard event handler
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault(); // Prevent default behavior (form submission for Enter, focus change for Tab)
      handleCadastroRapido();
    }
  };

  function buscarInfoUser(){
    mutateAsync(data?.id as number)
  }

  const formatDate = (date: Date | null | undefined) =>
    date ? format(new Date(date), "dd/MM HH:mm") : "-";

  return (
    <div className="space-y-3">
      {data && (
        <Card className="p-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium">#{data.id}</span>
            <span className="text-muted-foreground">{data.centerId}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Transporte</p>
              <p className="truncate">{data.transporte}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Empresa</p>
              <p className="truncate">{data.empresa}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Processo</p>
              <p className="truncate">{data.processo}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Início</p>
              <p>{formatDate(data.horaInicio)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pausa Início</p>
              <p>{formatDate(data.inicioPausa)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pausa Fim</p>
              <p>{formatDate(data.terminoPause)}</p>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-3">
        <div className="space-y-2">
          <Label className="text-xs">Cadastro Rápido</Label>
          <div className="flex gap-2">
            <Input
              value={infoQrCode}
              onChange={(e) => setInfoQrCode(e.target.value)}
              onKeyDown={handleKeyDown} // Added keydown handler
              placeholder="ID_PALLET,TRANSPORTE"
              className="flex-1 h-8 text-sm"
            />
            <Button onClick={handleCadastroRapido} size="sm" className="h-8">
              OK
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="space-y-1">
            <Label className="text-xs">ID Pallet</Label>
            <Input
              value={demanda.idPallet}
              onChange={(e) => setDemandaOnChange({ idPallet: e.target.value })}
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Transporte</Label>
            <Input
              value={demanda.transporte}
              onChange={(e) =>
                setDemandaOnChange({ transporte: e.target.value })
              }
              className="h-8 text-sm"
            />
          </div>
        </div>
        <Button
          onClick={buscarInfoUser}
          disabled={!!data?.horaFim || !!data?.terminoPause}
        >
          {data?.inicioPausa ? "Finalizar Pausa" : "Adicionar Pausa"}
        </Button>
      </Card>
    </div>
  );
}