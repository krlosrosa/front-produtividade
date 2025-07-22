import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CadastroRapidoProdutividade from "./cadastroRapidoProdutividade";
import CadastroManualProdutividade from "./cadastroManualProdutividade";
import { useProdutividadeStore } from "@/presentation/produtividade/dashboard/store/useProdutividadeStore";

export default function ProdutividadeCadastro() {
    const { setTabSelect, itensProdutividade } =
      useProdutividadeStore();
  
  return (
    <div>
      <div className="">
        <Tabs defaultValue="rapido">
          <TabsList>
            <TabsTrigger value="rapido">Rapido</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>
          <TabsContent value="rapido">
            <CadastroRapidoProdutividade />
          </TabsContent>
          <TabsContent value="manual">
            <CadastroManualProdutividade />
          </TabsContent>
        </Tabs>
        <Button disabled={itensProdutividade.length === 0} onClick={()=> setTabSelect("funcionario")} className="w-full mt-2">Adicionar Funcionário</Button>
      </div>
    </div>
  );
}
