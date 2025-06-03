'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useStoreProdutividade } from "../atom";
import { parseCadastroRapido } from "@/utils/cadastrorapido";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CadastroRapido() {
const [cadastroRapido, setCadastroRapido] = useState("");
  const { setFormulario, adicionarFormulario, reset } = useStoreProdutividade();

  function fastCreate() {
    const retorno = parseCadastroRapido(cadastroRapido);
    console.log(retorno)
    setFormulario({ ...retorno });
    adicionarFormulario()
    reset()
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastro Rápido</CardTitle>  
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            value={cadastroRapido}
            onChange={(e) => setCadastroRapido(e.target.value)}
            placeholder="empresa;transporte;processo;idPallet;qtdCaixa;qtdUnidade;linhas"
            className="flex-1"
          />
          <Button onClick={fastCreate}>Processar</Button>
        </div>
      </CardContent>
    </Card>
  );
}
