"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { parseCadastroRapido } from "@/utils/cadastrorapido";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProdutividadeStore } from "@/presentation/dashboard/store/useProdutividadeStore";

export default function CadastroRapidoProdutividade() {
  const [cadastroRapido, setCadastroRapido] = useState("");
  const { addItemProdutividade } = useProdutividadeStore();
  const [isLoading, setIsLoading] = useState(false);

  async function fastCreate() {
    if (!cadastroRapido || isLoading) return;
    setIsLoading(true);
    try {
      const retorno = parseCadastroRapido(cadastroRapido);
      addItemProdutividade({ ...retorno });
      setCadastroRapido("");
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault(); // Previne o comportamento padrão do Tab/Enter
      fastCreate();
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          Cadastro Rápido
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <div className="flex flex-col gap-2">
          <Input
            value={cadastroRapido}
            onChange={(e) => setCadastroRapido(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="empresa;transporte;idPallet;qtdCaixa;qtdUnidade;linhas"
            className="flex-1 h-8 text-sm"
          />
          <Button
            onClick={fastCreate}
            size="sm"
            className="h-8 gap-1"
            disabled={!cadastroRapido || isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Processar
              </span>
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          empresa;transporte;idPallet;quantidadeCaixa;quqnatidadeUnidade;linhas
        </p>
        <p className="text-xs text-muted-foreground">
          Separe os valores por ponto e vírgula (;)
        </p>
      </CardContent>
    </Card>
  );
}
