import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Building2,
  Truck,
  Hash,
  Package,
  Box,
  BarChart3,
  Plus,
  RotateCcw,
  Snowflake,
} from "lucide-react";
import {
  ProdutividadeFormType,
  ProdutividadeItemType,
} from "@/presentation/produtividade/dashboard/types/produtividade";
import { useProdutividadeStore } from "@/presentation/produtividade/dashboard/store/useProdutividadeStore";

export default function CadastroManualProdutividade() {
  const { addItemProdutividade } = useProdutividadeStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProdutividadeFormType>({
    mode: "onChange",
    defaultValues: {
      empresa: "",
      transporte: "",
      idPallet: "",
      quantidadeCaixa: "",
      quantidadeUnidade: "",
      linhasPickingVisitadas: "",
      segmento: "REFRIGERADO",
    },
  });

  const onSubmit = async (data: unknown) => {
    addItemProdutividade(data as ProdutividadeItemType);
    reset();
  };

  const handleReset = () => {
    reset();
  };

  const validateNumber = (value: string) => {
    const num = Number(value);
    if (isNaN(num)) return "Digite um número válido";
    if (num < 0) return "Valor não pode ser negativo";
    return true;
  };

  return (
    <Card className="border-0 shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          {/* Seção: Informações Gerais */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="empresa"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Building2 className="w-3.5 h-3.5 text-gray-400" />
                  Empresa *
                </Label>
                <select
                  id="empresa"
                  {...register("empresa", {
                    required: "Selecione uma empresa",
                  })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Selecione uma empresa</option>
                  <option value="LDB">LDB</option>
                  <option value="DPA">DPA</option>
                  <option value="ITB">ITB</option>
                </select>
                {errors.empresa && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.empresa.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="transporte"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Truck className="w-3.5 h-3.5 text-gray-400" />
                  Transporte *
                </Label>
                <Input
                  id="transporte"
                  {...register("transporte", { required: "Campo obrigatório" })}
                  placeholder="Digite o tipo de transporte"
                  className="h-10 focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {errors.transporte && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.transporte.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="idPallet"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Hash className="w-3.5 h-3.5 text-gray-400" />
                  ID do Pallet *
                </Label>
                <Input
                  id="idPallet"
                  {...register("idPallet", { required: "Campo obrigatório" })}
                  placeholder="Digite a identificação do pallet"
                  className="h-10 focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {errors.idPallet && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.idPallet.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="segmento"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Snowflake className="w-3.5 h-3.5 text-blue-400" />
                  Segmento *
                </Label>
                <select
                  id="segmento"
                  {...register("segmento", {
                    required: "Selecione um segmento",
                  })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="REFRIGERADO">REFRIGERADO</option>
                  <option value="SECO">SECO</option>
                </select>
                {errors.segmento && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.segmento.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Seção: Quantidades */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 border-b pb-2">
              <Package className="w-4 h-4 text-green-600" />
              Quantidades *
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="quantidadeCaixa"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Box className="w-3.5 h-3.5 text-blue-500" />
                  Caixas *
                </Label>
                <div className="relative">
                  <Input
                    id="quantidadeCaixa"
                    type="number"
                    min="0"
                    placeholder="0"
                    {...register("quantidadeCaixa", {
                      required: "Campo obrigatório",
                      valueAsNumber: true,
                      validate: validateNumber
                    })}
                    className="h-10 focus:ring-2 focus:ring-blue-500 transition-all pr-8"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                    cx
                  </div>
                </div>
                {errors.quantidadeCaixa && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.quantidadeCaixa.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="quantidadeUnidade"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Package className="w-3.5 h-3.5 text-green-500" />
                  Unidades *
                </Label>
                <div className="relative">
                  <Input
                    id="quantidadeUnidade"
                    type="number"
                    min="0"
                    placeholder="0"
                    {...register("quantidadeUnidade", {
                      required: "Campo obrigatório",
                      valueAsNumber: true,
                      validate: validateNumber
                    })}
                    className="h-10 focus:ring-2 focus:ring-green-500 transition-all pr-8"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                    un
                  </div>
                </div>
                {errors.quantidadeUnidade && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.quantidadeUnidade.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="linhasPickingVisitadas"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-purple-500" />
                  Linhas *
                </Label>
                <div className="relative">
                  <Input
                    id="linhasPickingVisitadas"
                    type="number"
                    min="0"
                    placeholder="0"
                    {...register("linhasPickingVisitadas", {
                      required: "Campo obrigatório",
                      valueAsNumber: true,
                      validate: validateNumber
                    })}
                    className="h-10 focus:ring-2 focus:ring-purple-500 transition-all pr-8"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                    ln
                  </div>
                </div>
                {errors.linhasPickingVisitadas && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.linhasPickingVisitadas.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="flex-1 h-11 text-sm font-medium"
              disabled={isSubmitting}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Limpar
            </Button>

            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="flex-1 h-11 text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Salvando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Adicionar Registro
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
