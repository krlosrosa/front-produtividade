"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useEffect, KeyboardEvent } from "react"; // Added KeyboardEvent
import { parseCadastroRapido } from "@/utils/cadastrorapido";
import { DemandaSelecionada } from "@/presentation/produtividade/dashboard/types/produtividade";

type Props = {
  demanda: DemandaSelecionada;
  setDemandaOnChange: (params: Partial<DemandaSelecionada>) => void;
  infoQrCode: string;
  setInfoQrCode: Dispatch<SetStateAction<string>>;
  observacao: string;
  setObservacao: Dispatch<SetStateAction<string>>;
};

export default function FuncionarioCadastro({
  demanda,
  setDemandaOnChange,
  infoQrCode,
  setInfoQrCode,
  observacao,
  setObservacao,
}: Props) {
  useEffect(() => {
    setInfoQrCode("");
    setDemandaOnChange({
      idPallet: "",
      transporte: "",
    });
  }, []);

  function handleCadastroRapido() {
    const info = parseCadastroRapido(infoQrCode);
    setDemandaOnChange({
      idPallet: info.idPallet,
      transporte: info.transporte,
    });
  }

  // Added keyboard event handler
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault(); // Prevent default behavior
      handleCadastroRapido();
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Cadastro Rápido</Label>
          <div className="flex gap-2">
            <Input
              value={infoQrCode}
              onChange={(e) => setInfoQrCode(e.target.value)}
              onKeyDown={handleKeyDown} // Added keydown handler
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
        <div className="space-y-1"> 
          <Label>Observação</Label>
          <Input
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}