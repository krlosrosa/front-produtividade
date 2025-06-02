'use client'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, subDays } from "date-fns";

// Dados mockados baseados no seu schema
const mockFuncionarios = [
  { id: "1", name: "João Silva", caixas: 2450, unidades: 18900, processos: 42, eficiencia: 88 },
  { id: "2", name: "Maria Santos", caixas: 1980, unidades: 15400, processos: 38, eficiencia: 92 },
  { id: "3", name: "Carlos Oliveira", caixas: 3120, unidades: 24300, processos: 51, eficiencia: 85 },
  { id: "4", name: "Ana Costa", caixas: 1760, unidades: 13200, processos: 35, eficiencia: 95 },
];

const mockCentros = [
  { centerId: "CENTRO-01", description: "Armazém Principal", state: "SP", produtividade: 92 },
  { centerId: "CENTRO-02", description: "Armazém Secundário", state: "RJ", produtividade: 85 },
];

const produtividadeDiaria = Array.from({ length: 7 }).map((_, i) => ({
  date: format(subDays(new Date(), 6 - i), "dd/MM"),
  caixas: Math.floor(Math.random() * 1000) + 500,
  unidades: Math.floor(Math.random() * 8000) + 4000,
}));

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard de Produtividade</h1>
      
      {/* Cards com métricas gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total de Caixas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9,310</div>
            <p className="text-sm text-muted-foreground">+12% em relação à semana passada</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total de Unidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">71,800</div>
            <p className="text-sm text-muted-foreground">+8% em relação à semana passada</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processos Concluídos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">166</div>
            <p className="text-sm text-muted-foreground">5 em andamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eficiência Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90%</div>
            <Progress value={90} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de produtividade */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Produtividade Diária</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={produtividadeDiaria}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="caixas" fill="#8884d8" name="Caixas" />
                <Bar dataKey="unidades" fill="#82ca9d" name="Unidades" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de funcionários */}
      <Card>
        <CardHeader>
          <CardTitle>Ranking de Funcionários</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Funcionário</TableHead>
                <TableHead className="text-right">Caixas</TableHead>
                <TableHead className="text-right">Unidades</TableHead>
                <TableHead className="text-right">Processos</TableHead>
                <TableHead className="text-right">Eficiência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFuncionarios.map((func) => (
                <TableRow key={func.id}>
                  <TableCell>{func.name}</TableCell>
                  <TableCell className="text-right">{func.caixas.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{func.unidades.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{func.processos}</TableCell>
                  <TableCell className="text-right">
                    <Progress value={func.eficiencia} className="h-2 w-[100px] inline-block" />
                    <span className="ml-2">{func.eficiencia}%</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Status dos centros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockCentros.map((centro) => (
          <Card key={centro.centerId}>
            <CardHeader>
              <CardTitle>{centro.description}</CardTitle>
              <p className="text-sm text-muted-foreground">{centro.centerId} - {centro.state}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Produtividade</span>
                  <span>{centro.produtividade}%</span>
                </div>
                <Progress value={centro.produtividade} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}