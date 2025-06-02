import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Demanda } from "../atom";
import { Dispatch, SetStateAction, useState } from "react";
import { parseCadastroRapido } from "@/utils/cadastrorapido";

type Props = {
  demanda: Demanda;
  setDemandaOnChange: (params: Partial<Demanda>) => void;
};

export default function FuncionarioCadastro({
  demanda,
  setDemandaOnChange,
}: Props) {
  const [infoQrCode, setInfoQrCode] = useState("");
  function handleCadastroRapido() {
    const info = parseCadastroRapido(infoQrCode);
    setDemandaOnChange({
      idPallet: info.idPallet,
      transporte: info.transporte,
    });
  }
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Finalizar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Cadastro Rápido</Label>
          <div className="flex gap-2">
            <Input
              value={infoQrCode}
              onChange={(e) => setInfoQrCode(e.target.value)}
              placeholder="ID_PALLET,TRANSPORTE"
              className="flex-1"
            />
            <Button onClick={handleCadastroRapido} size="sm">
              OK
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <Label>ID Pallet</Label>
            <Input
              value={demanda.idPallet}
              onChange={(e) => setDemandaOnChange({ idPallet: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <Label>Transporte</Label>
            <Input
              value={demanda.transporte}
              onChange={(e) =>
                setDemandaOnChange({ transporte: e.target.value })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
