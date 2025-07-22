"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CalendarIcon, DownloadCloud } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { toast } from "react-toastify";
import { DateRange } from "react-day-picker";
import { useDownloadReport } from "./application/mutation";

type AppDateRange = {
  from: Date;
  to: Date;
};

export default function DatePickerRange() {
  const [date, setDate] = React.useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  // Usando o hook customizado de download
  const { downloadReport, isLoading } = useDownloadReport();

  const handleDownload = () => {
    if (!date.from || !date.to) {
      toast.error("Por favor, selecione um intervalo de datas válido");
      return;
    }
    downloadReport({
      from: date.from,
      to: date.to,
    } as AppDateRange);
  };

  return (
    <Card className="p-6 max-w-md mx-auto mt-10 shadow-lg">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Relatório de Produtividade
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Selecione o período para gerar o relatório
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date-range" className="text-gray-700 font-medium">
            Intervalo de Datas
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date-range"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                      {format(date.to, "dd/MM/yyyy", { locale: ptBR })}
                    </>
                  ) : (
                    format(date.from, "dd/MM/yyyy", { locale: ptBR })
                  )
                ) : (
                  <span className="text-gray-400">Selecione um intervalo</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(range) =>
                  setDate(range || { from: undefined, to: undefined })
                }
                numberOfMonths={2}
                locale={ptBR}
                className="border-0"
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button
          onClick={handleDownload}
          disabled={!date.from || !date.to || isLoading}
          className="w-full bg-primary hover:bg-primary-dark transition-colors"
          size="lg"
        >
          {isLoading ? (
            <span className="animate-pulse">Processando...</span>
          ) : (
            <>
              <DownloadCloud className="mr-2 h-4 w-4" />
              Baixar Relatório
            </>
          )}
        </Button>

        {date.from && date.to && (
          <div className="text-sm text-gray-500 text-center">
            <p>
              Período selecionado: {format(date.from, "PPP", { locale: ptBR })}{" "}
              - {format(date.to, "PPP", { locale: ptBR })}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
