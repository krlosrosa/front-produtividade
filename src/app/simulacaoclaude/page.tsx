"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Package,
  Users,
  Clock,
  Truck,
  Target,
  Activity,
} from "lucide-react";

// Dados mockados
const kpiData = {
  totalCaixas: 15420,
  totalUnidades: 89750,
  funcionariosAtivos: 45,
  transportesHoje: 23,
  tempoMedioProcesso: 2.3,
  eficienciaGeral: 87.5,
};

const produtividadeFuncionarios = [
  {
    nome: "João Silva",
    caixas: 156,
    unidades: 890,
    tempo: 2.1,
    eficiencia: 95,
  },
  {
    nome: "Maria Santos",
    caixas: 142,
    unidades: 823,
    tempo: 2.3,
    eficiencia: 92,
  },
  {
    nome: "Pedro Costa",
    caixas: 138,
    unidades: 756,
    tempo: 2.0,
    eficiencia: 89,
  },
  {
    nome: "Ana Oliveira",
    caixas: 134,
    unidades: 721,
    tempo: 2.4,
    eficiencia: 86,
  },
  {
    nome: "Carlos Lima",
    caixas: 128,
    unidades: 698,
    tempo: 2.6,
    eficiencia: 83,
  },
];

const produtividadeCentros = [
  { centro: "SP-001", caixas: 4520, unidades: 28450, eficiencia: 92 },
  { centro: "RJ-002", caixas: 3890, unidades: 22150, eficiencia: 88 },
  { centro: "MG-003", caixas: 3215, unidades: 19820, eficiencia: 85 },
  { centro: "RS-004", caixas: 2890, unidades: 16340, eficiencia: 81 },
  { centro: "PR-005", caixas: 2605, unidades: 14990, eficiencia: 79 },
];

const evolucaoTemporal = [
  { mes: "Jan", caixas: 12500, unidades: 78000, meta: 80000 },
  { mes: "Fev", caixas: 13200, unidades: 82500, meta: 80000 },
  { mes: "Mar", caixas: 14100, unidades: 87200, meta: 85000 },
  { mes: "Abr", caixas: 15420, unidades: 89750, meta: 85000 },
  { mes: "Mai", caixas: 16200, unidades: 92300, meta: 90000 },
];

const distribuicaoEmpresas = [
  { empresa: "Empresa A", value: 35, caixas: 5397 },
  { empresa: "Empresa B", value: 28, caixas: 4318 },
  { empresa: "Empresa C", value: 22, caixas: 3392 },
  { empresa: "Empresa D", value: 15, caixas: 2313 },
];

const produtividadeHoraria = [
  { hora: "06:00", producao: 45 },
  { hora: "08:00", producao: 78 },
  { hora: "10:00", producao: 92 },
  { hora: "12:00", producao: 68 },
  { hora: "14:00", producao: 85 },
  { hora: "16:00", producao: 95 },
  { hora: "18:00", producao: 72 },
  { hora: "20:00", producao: 58 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const KPICard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
}: {
  title: any;
  value: any;
  subtitle: any;
  icon: any;
  trend: any;
  trendValue: any;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
        <span>{subtitle}</span>
        {trend && (
          <div
            className={`flex items-center ${
              trend === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span className="ml-1">{trendValue}</span>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

export default function WarehouseDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard de Produtividade
          </h1>
          <p className="text-gray-600 mt-2">
            Visão geral da operação do armazém - Atualizado em tempo real
          </p>
        </div>

        {/* KPIs principais */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <KPICard
            title="Total de Caixas"
            value={kpiData.totalCaixas.toLocaleString()}
            subtitle="Últimas 24h"
            icon={Package}
            trend="up"
            trendValue="+12.5%"
          />
          <KPICard
            title="Total de Unidades"
            value={kpiData.totalUnidades.toLocaleString()}
            subtitle="Últimas 24h"
            icon={Activity}
            trend="up"
            trendValue="+8.3%"
          />
          <KPICard
            title="Funcionários Ativos"
            value={kpiData.funcionariosAtivos}
            subtitle="Turno atual"
            icon={Users}
            trend="up"
            trendValue="+2"
          />
          <KPICard
            title="Transportes Hoje"
            value={kpiData.transportesHoje}
            subtitle="Processados"
            icon={Truck}
            trend="up"
            trendValue="+15%"
          />
          <KPICard
            title="Tempo Médio"
            value={`${kpiData.tempoMedioProcesso}h`}
            subtitle="Por processo"
            icon={Clock}
            trend="down"
            trendValue="-0.3h"
          />
          <KPICard
            title="Eficiência Geral"
            value={`${kpiData.eficienciaGeral}%`}
            subtitle="Meta: 85%"
            icon={Target}
            trend="up"
            trendValue="+2.5%"
          />
        </div>

        {/* Tabs principais */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="funcionarios">Funcionários</TabsTrigger>
            <TabsTrigger value="centros">Centros</TabsTrigger>
            <TabsTrigger value="temporal">Análise Temporal</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Gráfico de produção por hora */}
              <Card>
                <CardHeader>
                  <CardTitle>Produtividade por Horário</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={produtividadeHoraria}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hora" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="producao"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Distribuição por empresa */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Empresa</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={distribuicaoEmpresas}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ empresa, value }) => `${empresa}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {distribuicaoEmpresas.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="funcionarios" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top 5 Funcionários - Produtividade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {produtividadeFuncionarios.map((funcionario, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0
                              ? "bg-yellow-100 text-yellow-800"
                              : index === 1
                              ? "bg-gray-100 text-gray-800"
                              : index === 2
                              ? "bg-orange-100 text-orange-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{funcionario.nome}</p>
                          <p className="text-sm text-gray-500">
                            {funcionario.caixas} caixas • {funcionario.unidades}{" "}
                            unidades
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {funcionario.tempo}h
                          </p>
                          <p className="text-xs text-gray-500">tempo médio</p>
                        </div>
                        <Badge
                          variant={
                            funcionario.eficiencia >= 90
                              ? "default"
                              : funcionario.eficiencia >= 85
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {funcionario.eficiencia}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="centros" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Produtividade por Centro</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={produtividadeCentros}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="centro" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="caixas" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ranking de Centros</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {produtividadeCentros.map((centro, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{centro.centro}</span>
                          <span className="text-sm text-gray-500">
                            {centro.eficiencia}%
                          </span>
                        </div>
                        <Progress value={centro.eficiencia} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{centro.caixas.toLocaleString()} caixas</span>
                          <span>
                            {centro.unidades.toLocaleString()} unidades
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="temporal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Evolução Mensal - Unidades vs Meta</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={evolucaoTemporal}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="unidades"
                      stroke="#8884d8"
                      strokeWidth={3}
                      name="Produção Real"
                    />
                    <Line
                      type="monotone"
                      dataKey="meta"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Meta"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Janeiro</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-blue-600">78K</div>
                  <p className="text-sm text-gray-500">unidades processadas</p>
                  <Badge variant="destructive" className="mt-2">
                    -2.5% vs meta
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Abril</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-green-600">89.7K</div>
                  <p className="text-sm text-gray-500">unidades processadas</p>
                  <Badge variant="default" className="mt-2">
                    +5.5% vs meta
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Projeção Maio</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    92.3K
                  </div>
                  <p className="text-sm text-gray-500">unidades estimadas</p>
                  <Badge variant="default" className="mt-2">
                    +2.6% vs meta
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
