'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useEffect } from "react";
import { parseCadastroRapido } from "@/utils/cadastrorapido";
import { Demanda } from "../../finalizarProdutividade/atom";
import { format } from "date-fns";
import { useFinalizarProdutividadeQuery } from "@/presentation/finalizarProdutividade/application/query";
import { useAddPausaProdutividade } from "../application/mutation";

type Props = {
  demanda: Demanda;
  setDemandaOnChange: (params: Partial<Demanda>) => void;
  infoQrCode: string;
  setInfoQrCode: Dispatch<SetStateAction<string>>;
};

export default function FormCadastroPausa({
  demanda,
  setDemandaOnChange,
  infoQrCode,
  setInfoQrCode,
}: Props) {
  const { data } = useFinalizarProdutividadeQuery();
  const { mutateAsync } = useAddPausaProdutividade();

  useEffect(()=>{
    setDemandaOnChange({
      idPallet:"",
      transporte: ""
    })
    setInfoQrCode("")
  },[])

  const handleCadastroRapido = () => {
    const info = parseCadastroRapido(infoQrCode);
    setDemandaOnChange({
      idPallet: info.idPallet,
      transporte: info.transporte,
    });
  };

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
          onClick={() => mutateAsync(data?.id as number)}
          disabled={!!data?.horaFim || !!data?.terminoPause}
        >
          {data?.inicioPausa? "Finalizar Pausa" : "Adicionar Pausa"}
        </Button>
      </Card>
    </div>
  );
}
