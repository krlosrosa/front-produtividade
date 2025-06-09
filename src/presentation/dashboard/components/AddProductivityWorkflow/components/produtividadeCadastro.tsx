import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CadastroRapidoProdutividade from "./cadastroRapidoProdutividade";
import CadastroManualProdutividade from "./cadastroManualProdutividade";
import { useProdutividadeStore } from "@/presentation/dashboard/store/useProdutividadeStore";

export default function ProdutividadeCadastro() {
    const { setTabSelect } =
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
        <Button onClick={()=> setTabSelect("funcionario")} className="w-full mt-2">Adicionar Funcionário</Button>
      </div>
    </div>
  );
}
