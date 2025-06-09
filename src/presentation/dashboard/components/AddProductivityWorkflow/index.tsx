import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { useProdutividadeStore } from "../../store/useProdutividadeStore";
import { useStatusCenterQuery } from "../../application/use-status-center-query";
import { PlusCircle } from "lucide-react";
import ProdutividadeCadastro from "./components/produtividadeCadastro";
import ItensAcumulados from "./components/itensAcumulados";
import ListaItensProdutividadeForm from "./components/listaItems";
import FuncionarioPageUSer from "./components/funcionarioPage";

export default function AddProductivityWorkflow() {
  const { isModalAddProdutividadeOpen, toggleProdutividadeModal, setTabSelect, tabSelect } =
    useProdutividadeStore();

  const { data, isLoading } = useStatusCenterQuery();

  if (isLoading) return <div>Carregando...</div>;

  useEffect(() => {
    setTabSelect("produtividade");
  }, []);

  return (
    <div>
      <Dialog
        open={isModalAddProdutividadeOpen}
        onOpenChange={toggleProdutividadeModal}
      >
        <DialogTrigger asChild>
          <Button disabled={data}>
            <PlusCircle className="h-4 w-4" />
            Adicionar Produtividade
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-11/12">
          <DialogTitle>Nova Produtividade</DialogTitle>
          <Tabs value={tabSelect}>
            <TabsContent value="produtividade">
              <div className="bg-white p-4 rounded-lg shadow flex gap-2">
                <ProdutividadeCadastro />
                <div className="space-y-6 flex-1">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <ItensAcumulados />
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <ListaItensProdutividadeForm />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent className="" value="funcionario">
              <FuncionarioPageUSer />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
