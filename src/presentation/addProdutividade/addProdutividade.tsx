"use client";

import CadastroRapido from "./components/produtividade/cadastroRapido";
import FormCadastro from "./components/produtividade/formCadastro";
import Resumo from "./components/produtividade/resumo";
import ListaItensCadastrados from "./components/produtividade/listaItensCadastrados";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import PageUser from "./components/user/userPage";
import { useStoreProdutividade } from "./components/atom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AddProdutividade() {
  const { formularios } = useStoreProdutividade();
  const [tabSelect, setTabSelect] = useState("produtitividade")



  return (
    <div className="flex w-full flex-col">
      <Tabs value={tabSelect} className="w-full">      
        <TabsContent value="produtitividade">
          <div className="bg-muted/40 p-4 md:p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Header com título e descrição */}
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-primary">
                  Cadastro de Produtividade
                </h2>
              </div>
              
              {/* Grid layout para organização */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Primeira coluna */}
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <CadastroRapido />
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <FormCadastro />
                  </div>
                </div>
                
                {/* Segunda coluna */}
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <Resumo />
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <ListaItensCadastrados />
                  </div>
                </div>
              </div>
              
              {/* Botão de ação fixo na parte inferior */}
              <div className="sticky bottom-4 z-10 flex justify-end mt-6">
                <Button 
                  disabled={formularios.length === 0}
                  onClick={() => setTabSelect("usuario")}
                  className="w-full md:w-auto px-8 py-4 text-lg shadow-lg"
                >
                  Selecionar funcionário
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="usuario">
          <PageUser setTabSelect={setTabSelect} />
        </TabsContent>
      </Tabs>
    </div>
  );
}