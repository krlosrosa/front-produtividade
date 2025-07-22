"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Package, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { useProdutividadeStore } from "../dashboard/store/useProdutividadeStore";

export default function ProcessSelectionPage() {
  const { setProcesso, processo } = useProdutividadeStore();
  const [dataProcesso, setDataProcesso] = useState<Date | undefined>(undefined); // Alterado para undefined por padrão
  const { push } = useRouter();

  function redirectToProcess(value: string) {
    setProcesso({
      processo: value,
      dataRegistro: dataProcesso,
    });
  }

  function handleContinue() {
    if (processo && dataProcesso) {
      setProcesso({
        processo: processo.processo.toUpperCase(),
        dataRegistro: dataProcesso,
      });
      push("/dash");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Selecione o Tipo de Processo
          </CardTitle>
          <CardDescription className="text-center">
            Escolha entre Separação ou Carregamento para continuar
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Seletor de Data */}
          <div className="space-y-2">
            <Label className="text-lg font-medium">Data do Processo</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataProcesso ? (
                    format(dataProcesso, "PPP", { locale: ptBR })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dataProcesso}
                  onSelect={setDataProcesso} // Simplificado pois já estamos tipando corretamente
                  initialFocus
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Restante do seu código permanece igual */}
          <RadioGroup className="grid gap-4">
            <div>
              <RadioGroupItem
                onClick={() => redirectToProcess("Separacao")}
                value="separation"
                id="separation"
                className="peer sr-only"
              />
              <Label
                htmlFor="separation"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="flex items-center gap-3">
                  <Package className="h-6 w-6 text-primary" />
                  <span className="text-lg font-semibold">Separação</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground text-center">
                  Processo de separação de itens para preparação de pedidos
                </p>
              </Label>
            </div>

            <div>
              <RadioGroupItem
                onClick={() => redirectToProcess("Carregamento")}
                value="loading"
                id="loading"
                className="peer sr-only"
              />
              <Label
                htmlFor="loading"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="flex items-center gap-3">
                  <Truck className="h-6 w-6 text-primary" />
                  <span className="text-lg font-semibold">Carregamento</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground text-center">
                  Processo de carregamento de mercadorias para transporte
                </p>
              </Label>
            </div>
          </RadioGroup>

          <Button
            onClick={handleContinue}
            disabled={processo.processo === "" || !dataProcesso}
            className="w-full mt-4"
          >
            Continuar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
