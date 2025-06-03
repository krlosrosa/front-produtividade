"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useStoreProdutividade } from "../atom";
import { QuickRegisterModal } from "./components/cadastroUsuario";
import { ChevronLeft, Search } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
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
import { useUsersQuery } from "./application/query";
import { useAddProdutividade } from "../../application/mudation";

type Props = {
  setTabSelect: Dispatch<SetStateAction<string>>;
};

export default function PageUser({ setTabSelect }: Props) {
  const { data } = useUsersQuery();
  const { user, setUser, processo, formularios, resumo } =
    useStoreProdutividade();
  const [valor, setValor] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mutate = useAddProdutividade();

  // Filtra os usuários localmente baseado no filtroBusca
  const usuariosFiltrados = data?.filter((usuario) => {
    const termoBusca = valor.toLowerCase();
    return (
      usuario.id.toLowerCase().includes(termoBusca) ||
      usuario.name.toLowerCase().includes(termoBusca)
    );
  });

  console.log(formularios)

  async function handleAddProdutividade() {
    mutate.mutateAsync({
      horaInicio: new Date(),
      processo: processo.processo as "SEPARACAO" | "CONFERENCIA",
      transporte: formularios[0].transporte,
      empresa: formularios[0].empresa as "LDB" | "ITB" | "DPA",
      caixas: resumo.caixas,
      unidade: resumo.unidades,
      visitado: resumo.enderecos,
      items: formularios,
      dataRegistro: processo.dataRegistro as Date,
      funcionarioId: user.id,
      segmento: formularios[0].segmento
    });
  }

  const openConfirmationDialog = () => {
    if (user.id) {
      setShowConfirmation(true);
    } else {
      toast.warning("Selecione um usuário antes de continuar");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl space-y-6">
      {/* Modal de Confirmação */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Adição de Demanda</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a adicionar uma nova demanda para o funcionário{" "}
              <strong>{user.name}</strong> (ID: {user.id}). Esta ação registrará
              todas as informações do processo atual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAddProdutividade}
              disabled={isLoading}
            >
              {isLoading ? "Registrando..." : "Confirmar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Botão de voltar no topo */}
      <Button
        variant="ghost"
        className="gap-2 pl-0"
        onClick={() => setTabSelect("produtitividade")}
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar para Produtividade
      </Button>

      {/* Card de busca */}
      <Card>
        <CardContent className="space-y-4">
          {user.id && (
            <div className="space-y-2">
              <div className="flex flex-wrap bg-blue-100 rounded-md justify-center items-center gap-2">
                <span className="font-medium">Usuário Selecionado:</span>
                <Badge variant="outline">ID: {user.id}</Badge>
                <Badge variant="outline">{user.name}</Badge>
              </div>
              <Separator />
            </div>
          )}

          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                onChange={(e) => setValor(e.target.value)}
                value={valor}
                placeholder="Informe o ID ou nome do usuário"
                className="flex-1"
              />
              <Button className="whitespace-nowrap">Buscar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card de resultados */}
      {data && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-lg">Resultados da Busca</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {usuariosFiltrados?.length ? (
                usuariosFiltrados.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 border rounded-lg hover:bg-accent/50 transition-colors ${
                      user.id === item.id ? "bg-primary/10 border-primary" : ""
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ID: {item.id}
                        </p>
                      </div>
                      <Button
                        onClick={() => setUser(item)}
                        variant={user.id === item.id ? "default" : "outline"}
                        size="sm"
                      >
                        {user.id === item.id ? "Selecionado" : "Selecionar"}
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  Nenhum usuário encontrado
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rodapé com ações */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between sticky bottom-6 bg-background p-3 rounded-lg shadow-lg border">
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => setTabSelect("produtitividade")}
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar
        </Button>

        <div className="flex gap-3">
          <Button
            onClick={() => setUser({ id: "", name: "" })}
            variant="secondary"
            className="flex-1"
          >
            Limpar Seleção
          </Button>
          <QuickRegisterModal />
          <Button
            onClick={openConfirmationDialog}
            className="flex-1 bg-green-600 hover:bg-green-700"
            disabled={!user.id}
          >
            Adicionar Demanda
          </Button>
        </div>
      </div>
    </div>
  );
}
