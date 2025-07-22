"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Users,
  Truck,
  Calendar,
  Package,
  FileText,
  Plus,
  X,
  Printer,
  Save,
  Palette,
  Package2,
  CalendarDays,
  Layers,
  Router
} from "lucide-react"

import { useConfigImpressaoStore } from "@/features/mapa/store/configImpressaoStore"
import { useRouter } from "next/navigation"
import { UploadClientesSegregados } from "./components/UploadClientesSegregados"

type TipoAgrupamento = "codCliente" | "transporte"
type GrupoTransporte = {
  id: string
  transportes: string[]
  nome?: string
}
type ConfiguracaoFolha = "mesma" | "separada" | "ambos"

export default function ConfigPage() {

  // Estados do store
  const {
    tipoAgrupamento,
    clientesSegregar,
    grupoTransporte,
    grupoCliente,
    percentualMinimo,
    percentualMaximo,
    quebraPallet,
    percentualQuebra,
    palletsFull,
    unidades,
    exibirRangeData,
    converterCaixasParaPallet,
    segregarProdutoFIFO,
    faixasFIFO,
    setTipoAgrupamento,
    adicionarCliente,
    removerCliente,
    adicionarGrupoTransporte,
    removerGrupoTransporte,
    adicionarTransporteAoGrupo,
    removerTransporteDoGrupo,
    adicionarGrupoCliente,
    removerGrupoCliente,
    adicionarClienteAoGrupo,
    removerClienteDoGrupo,
    setPercentualMinimo,
    setPercentualMaximo,
    setQuebraPallet,
    setPercentualQuebra,
    setPalletsFull,
    setUnidades,
    setExibirRangeData,
    setConverterCaixasParaPallet,
    setSegregarProdutoFIFO,
    setFaixasFIFO,
    adicionarFaixaFIFO,
    removerFaixaFIFO,
  } = useConfigImpressaoStore()

  // Estados locais para inputs
  const [novoCliente, setNovoCliente] = useState("")
  const [novoGrupo, setNovoGrupo] = useState("")
  const [novoTransporte, setNovoTransporte] = useState("")
  const [novoClienteGrupo, setNovoClienteGrupo] = useState("")
  const [grupoSelecionado, setGrupoSelecionado] = useState("")
  const [grupoClienteSelecionado, setGrupoClienteSelecionado] = useState("")
  const router = useRouter()

  const handleAdicionarCliente = () => {
    if (novoCliente) {
      adicionarCliente(novoCliente)
      setNovoCliente("")
    }
  }

  const handleAdicionarGrupo = () => {
    if (novoGrupo) {
      adicionarGrupoTransporte(novoGrupo)
      setNovoGrupo("")
    }
  }

  const handleAdicionarGrupoCliente = () => {
    if (novoGrupo) {
      adicionarGrupoCliente(novoGrupo)
      setNovoGrupo("")
    }
  }

  const handleAdicionarTransporte = () => {
    if (novoTransporte && grupoSelecionado) {
      adicionarTransporteAoGrupo(grupoSelecionado, novoTransporte)
      setNovoTransporte("")
    }
  }

  const handleAdicionarClienteGrupo = () => {
    if (novoClienteGrupo && grupoClienteSelecionado) {
      adicionarClienteAoGrupo(grupoClienteSelecionado, novoClienteGrupo)
      setNovoClienteGrupo("")
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Configuração de Impressão</h1>
          <p className="text-muted-foreground">
            Configure as opções de impressão dos mapas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
          <Button onClick={() => {
            router.push("/mapa/impressao")
          }} size="sm">
            <Printer className="w-4 h-4 mr-2" />
            Imprimir
          </Button>
        </div>
      </div>

      <Tabs defaultValue="agrupamento" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="agrupamento">Agrupamento</TabsTrigger>
          <TabsTrigger value="datas">Percentuais</TabsTrigger>
          <TabsTrigger value="quebra">Quebra de Pallet</TabsTrigger>
          <TabsTrigger value="folhas">Parâmetros</TabsTrigger>
        </TabsList>

        <TabsContent value="agrupamento" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="w-4 h-4" />
                Tipo de Agrupamento
              </CardTitle>
              <CardDescription>
                Defina como os dados serão agrupados na impressão
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="cliente"
                  name="agrupamento"
                  value="codCliente"
                  checked={tipoAgrupamento === "codCliente"}
                  onChange={(e) => setTipoAgrupamento(e.target.value as TipoAgrupamento)}
                  className="w-4 h-4"
                />
                <Label htmlFor="cliente" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Por Cliente
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="transporte"
                  name="agrupamento"
                  value="transporte"
                  checked={tipoAgrupamento === "transporte"}
                  onChange={(e) => setTipoAgrupamento(e.target.value as TipoAgrupamento)}
                  className="w-4 h-4"
                />
                <Label htmlFor="transporte" className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Por Transporte
                </Label>
              </div>
            </CardContent>
          </Card>

          {tipoAgrupamento === "transporte" && (
            <div className="space-y-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    Segregação de Clientes
                  </CardTitle>
                  <CardDescription>
                    Defina quais clientes devem ser segregados
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <UploadClientesSegregados />

                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-border"></div>
                    <span className="text-xs text-muted-foreground">ou</span>
                    <div className="flex-1 h-px bg-border"></div>
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite o código do cliente"
                      value={novoCliente}
                      onChange={(e) => setNovoCliente(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAdicionarCliente()}
                      className="h-9"
                    />
                    <Button onClick={handleAdicionarCliente} size="sm" className="h-9">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {clientesSegregar.map((cliente) => (
                      <Badge key={cliente} variant="secondary" className="flex items-center gap-1 text-xs">
                        {cliente}
                        <button
                          onClick={() => removerCliente(cliente)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Truck className="w-4 h-4 text-green-600" />
                    </div>
                    Agrupamento de Transportes
                  </CardTitle>
                  <CardDescription>
                    Agrupe transportes específicos para impressão
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nome do grupo"
                      value={novoGrupo}
                      onChange={(e) => setNovoGrupo(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAdicionarGrupo()}
                      className="h-9"
                    />
                    <Button onClick={handleAdicionarGrupo} size="sm" className="h-9">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {grupoTransporte.map((grupo) => (
                      <div key={grupo.id} className="border rounded-lg p-3 bg-muted/30">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="p-1 bg-green-100 rounded">
                              <Package className="w-3 h-3 text-green-600" />
                            </div>
                            <h4 className="font-medium text-sm">{grupo.nome || `Grupo ${grupo.id}`}</h4>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removerGrupoTransporte(grupo.id)}
                            className="h-7 w-7 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>

                        <div className="flex gap-2 mb-2">
                          <Input
                            placeholder="Código do transporte"
                            value={grupoSelecionado === grupo.id ? novoTransporte : ""}
                            onChange={(e) => {
                              setNovoTransporte(e.target.value)
                              setGrupoSelecionado(grupo.id)
                            }}
                            onKeyDown={(e) => e.key === "Enter" && handleAdicionarTransporte()}
                            className="h-8 text-sm"
                          />
                          <Button
                            onClick={handleAdicionarTransporte}
                            size="sm"
                            disabled={grupoSelecionado !== grupo.id}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {grupo.transportes.map((transporte) => (
                            <Badge key={transporte} variant="outline" className="flex items-center gap-1 text-xs">
                              {transporte}
                              <button
                                onClick={() => removerTransporteDoGrupo(grupo.id, transporte)}
                                className="ml-1 hover:text-destructive"
                              >
                                <X className="w-2 h-2" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {tipoAgrupamento === "codCliente" && (
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  Agrupamento de Clientes
                </CardTitle>
                <CardDescription>
                  Agrupe clientes específicos para impressão
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Nome do grupo"
                    value={novoGrupo}
                    onChange={(e) => setNovoGrupo(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdicionarGrupoCliente()}
                    className="h-9"
                  />
                  <Button onClick={handleAdicionarGrupoCliente} size="sm" className="h-9">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {grupoCliente.map((grupo) => (
                    <div key={grupo.id} className="border rounded-lg p-3 bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-purple-100 rounded">
                            <Users className="w-3 h-3 text-purple-600" />
                          </div>
                          <h4 className="font-medium text-sm">{grupo.nome || `Grupo ${grupo.id}`}</h4>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removerGrupoCliente(grupo.id)}
                          className="h-7 w-7 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Código do cliente"
                          value={grupoClienteSelecionado === grupo.id ? novoClienteGrupo : ""}
                          onChange={(e) => {
                            setNovoClienteGrupo(e.target.value)
                            setGrupoClienteSelecionado(grupo.id)
                          }}
                          onKeyDown={(e) => e.key === "Enter" && handleAdicionarClienteGrupo()}
                          className="h-8 text-sm"
                        />
                        <Button
                          onClick={handleAdicionarClienteGrupo}
                          size="sm"
                          disabled={grupoClienteSelecionado !== grupo.id}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {grupo.transportes.map((cliente) => (
                          <Badge key={cliente} variant="outline" className="flex items-center gap-1 text-xs">
                            {cliente}
                            <button
                              onClick={() => removerClienteDoGrupo(grupo.id, cliente)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="w-2 h-2" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="datas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Range de Data por Fabricação
              </CardTitle>
              <CardDescription>
                Defina a margem de datas baseada na fabricação dos produtos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Como funciona:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• <strong>Produtos Verdes:</strong> Aplica o cálculo reduzindo/aumentando a data de fabricação conforme o percentual definido</li>
                  <li>• <strong>Outras Faixas:</strong> Exibe a data de fabricação real do produto</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="percentualMinimo">Percentual Mínimo (%)</Label>
                  <Input
                    id="percentualMinimo"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Ex: 10"
                    value={percentualMinimo}
                    onChange={(e) => setPercentualMinimo(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Reduz a data de fabricação em X% para produtos verdes
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="percentualMaximo">Percentual Máximo (%)</Label>
                  <Input
                    id="percentualMaximo"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Ex: 20"
                    value={percentualMaximo}
                    onChange={(e) => setPercentualMaximo(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Aumenta a data de fabricação em X% para produtos verdes
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-800">
                  <strong>Exemplo:</strong> Se um produto verde tem fabricação em 15/01/2024 e você define 10% mínimo e 20% máximo,
                  o range será de 05/01/2024 a 18/01/2024.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quebra" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Quebra de Pallet por Altura Padrão
              </CardTitle>
              <CardDescription>
                Configure a quebra automática baseada na altura padrão do pallet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Como funciona:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• <strong>Cálculo:</strong> Quantidade de caixas ÷ Capacidade do pallet = Altura padrão</li>
                  <li>• <strong>Quebra:</strong> Quando a altura atual atinge X% da altura padrão, inicia nova separação</li>
                  <li>• <strong>Benefício:</strong> Permite distribuir um mapa muito grande para vários separadores</li>
                </ul>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="quebraPallet"
                  checked={quebraPallet}
                  onCheckedChange={setQuebraPallet}
                />
                <Label htmlFor="quebraPallet" className="font-medium">
                  Ativar quebra automática de pallet
                </Label>
              </div>

              {quebraPallet && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="percentualQuebra">Percentual de Quebra (%)</Label>
                    <Input
                      id="percentualQuebra"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Ex: 80"
                      value={percentualQuebra}
                      onChange={(e) => setPercentualQuebra(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Quebra o pallet quando atingir X% da altura padrão calculada
                    </p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-sm text-amber-800">
                      <strong>Exemplo:</strong> Se um pallet tem capacidade para 100 caixas e você tem 75 caixas (75% da altura padrão),
                      com percentual de 80%, o sistema iniciará uma nova separação.
                    </p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h5 className="font-medium text-green-900 mb-1">Fórmula de Cálculo:</h5>
                    <p className="text-sm text-green-800">
                      <strong>Altura Padrão =</strong> (Quantidade de Caixas ÷ Capacidade do Pallet) × 100%<br />
                      <strong>Quebra =</strong> Quando altura atual ≥ Percentual definido
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="folhas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Parâmetros do Mapa de Separação
              </CardTitle>
              <CardDescription>
                Defina quais informações serão exibidas no mapa de separação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Como funciona:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• <strong>Mesma folha:</strong> Exibe a informação junto com os demais dados</li>
                  <li>• <strong>Folha separada:</strong> Cria uma seção específica para essa informação</li>
                  <li>• <strong>Ambos:</strong> Exibe tanto na folha principal quanto em seção separada</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Package2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-medium text-blue-900">Pallets Full</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="palletsMesma"
                        name="palletsFull"
                        value="mesma"
                        checked={palletsFull === "mesma"}
                        onChange={(e) => setPalletsFull(e.target.value as ConfiguracaoFolha)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="palletsMesma" className="text-sm">Mesma folha</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="palletsSeparada"
                        name="palletsFull"
                        value="separada"
                        checked={palletsFull === "separada"}
                        onChange={(e) => setPalletsFull(e.target.value as ConfiguracaoFolha)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="palletsSeparada" className="text-sm">Folha separada</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="palletsAmbos"
                        name="palletsFull"
                        value="ambos"
                        checked={palletsFull === "ambos"}
                        onChange={(e) => setPalletsFull(e.target.value as ConfiguracaoFolha)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="palletsAmbos" className="text-sm">Ambos</Label>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-gradient-to-br from-green-50 to-emerald-50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Layers className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="font-medium text-green-900">Unidades</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="unidadesMesma"
                        name="unidades"
                        value="mesma"
                        checked={unidades === "mesma"}
                        onChange={(e) => setUnidades(e.target.value as ConfiguracaoFolha)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="unidadesMesma" className="text-sm">Mesma folha</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="unidadesSeparada"
                        name="unidades"
                        value="separada"
                        checked={unidades === "separada"}
                        onChange={(e) => setUnidades(e.target.value as ConfiguracaoFolha)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="unidadesSeparada" className="text-sm">Folha separada</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="unidadesAmbos"
                        name="unidades"
                        value="ambos"
                        checked={unidades === "ambos"}
                        onChange={(e) => setUnidades(e.target.value as ConfiguracaoFolha)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="unidadesAmbos" className="text-sm">Ambos</Label>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-gradient-to-br from-amber-50 to-orange-50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <CalendarDays className="w-5 h-5 text-amber-600" />
                    </div>
                    <h4 className="font-medium text-amber-900">Range de Data</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="exibirRangeData"
                        checked={exibirRangeData}
                        onCheckedChange={setExibirRangeData}
                      />
                      <Label htmlFor="exibirRangeData" className="text-sm">
                        Exibir no mapa
                      </Label>
                    </div>
                    {exibirRangeData && (
                      <div className="bg-amber-100 border border-amber-200 rounded-lg p-2">
                        <p className="text-xs text-amber-800">
                          <strong>Info:</strong> Usa os percentuais da aba "Percentuais"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-gradient-to-br from-purple-50 to-violet-50 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-purple-200 rounded-lg">
                    <Router className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-purple-900">Segregação FIFO</h4>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="segregarProdutoFIFO"
                    checked={segregarProdutoFIFO}
                    onCheckedChange={setSegregarProdutoFIFO}
                  />
                  <Label htmlFor="segregarProdutoFIFO" className="text-sm">
                    Segregar produtos em faixa em mapa separado
                  </Label>
                </div>
                
                {segregarProdutoFIFO && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-purple-900">
                        Selecione as faixas para separar:
                      </Label>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {["Vermelha", "Laranja", "Amarela"].map((faixa) => (
                          <div key={faixa} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`faixa-${faixa}`}
                              checked={faixasFIFO.includes(faixa)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  adicionarFaixaFIFO(faixa)
                                } else {
                                  removerFaixaFIFO(faixa)
                                }
                              }}
                              className="w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500"
                            />
                            <Label 
                              htmlFor={`faixa-${faixa}`} 
                              className="text-sm cursor-pointer"
                            >
                              {faixa}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {faixasFIFO.length > 0 && (
                      <div className="bg-purple-100 border border-purple-200 rounded-lg p-3">
                        <p className="text-xs text-purple-800 mb-2">
                          <strong>Faixas selecionadas:</strong>
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {faixasFIFO.map((faixa) => (
                            <Badge key={faixa} variant="secondary" className="flex items-center gap-1 text-xs">
                              {faixa}
                              <button
                                onClick={() => removerFaixaFIFO(faixa)}
                                className="ml-1 hover:text-destructive"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground mt-1">
                  Se ativado, produtos que estão nas faixas selecionadas serão separados em um mapa específico, separado dos demais produtos.
                </p>
              </div>

              <div className="border rounded-lg p-4 bg-gradient-to-br from-gray-50 to-gray-100 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-gray-200 rounded-lg">
                    <Package className="w-5 h-5 text-gray-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">Conversão de Caixas</h4>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="converterCaixasParaPallet"
                    checked={converterCaixasParaPallet}
                    onCheckedChange={setConverterCaixasParaPallet}
                  />
                  <Label htmlFor="converterCaixasParaPallet" className="text-sm">
                    Converter caixas para formar pallet (default)
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Se ativado, as caixas serão agrupadas automaticamente para formar pallets completos. Se desativado, a quantidade de caixas será mantida sem conversão.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 