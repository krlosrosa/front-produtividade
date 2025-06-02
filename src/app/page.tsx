import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileTextIcon, RocketIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema de Medição de Produtividade
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gerencie e analise a produtividade da sua equipe de forma eficiente
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <RocketIcon className="w-10 h-10 mb-4 text-blue-600" />
              <CardTitle>Cadastro de Produtividade</CardTitle>
              <CardDescription>
                Registre as métricas de produtividade diária da equipe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <a href="/processo">Acessar Cadastro</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileTextIcon className="w-10 h-10 mb-4 text-green-600" />
              <CardTitle>Exportar Relatório</CardTitle>
              <CardDescription>
                Gere relatórios para análise de desempenho
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" asChild>
                <a href="/exportar">Gerar Relatório</a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
