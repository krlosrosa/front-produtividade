import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProdutividadeStore } from "@/presentation/produtividade/dashboard/store/useProdutividadeStore";
import { ProdutividadeItemType } from "@/presentation/produtividade/dashboard/types/produtividade";

export default function ListaItensProdutividadeForm() {
  const { itensProdutividade, removeItemProdutividade } = useProdutividadeStore();

  return (
    <Card className="w-full">
      <CardHeader className="p-3 pb-1">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold leading-none tracking-tight">
            Registros
            <span className="text-muted-foreground ml-1 font-normal">
              ({itensProdutividade.length})
            </span>
          </h3>
        </div>
      </CardHeader>

      <ScrollArea className="h-[180px]">
        <CardContent className="p-1">
          {itensProdutividade.length > 0 ? (
            <div className="space-y-1">
              {itensProdutividade.map((item: ProdutividadeItemType, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded text-xs transition-colors"
                >
                  {/* Informações principais */}
                  <div className="flex-1 min-w-0 flex items-center gap-2 overflow-hidden">
                    <p className="font-medium truncate min-w-[80px]">
                      {item.empresa || (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </p>

                    <span className="text-muted-foreground truncate min-w-[60px]">
                      {item.transporte || "-"}
                    </span>

                    {item.idPallet && (
                      <Badge
                        variant="secondary"
                        className="font-mono text-xs py-0 px-1.5"
                      >
                        #{item.idPallet}
                      </Badge>
                    )}
                  </div>

                  {/* Valores */}
                  <div className="flex gap-1 shrink-0">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 px-1.5 py-0 h-5"
                    >
                      {item.quantidadeCaixa || "0"}cx
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 px-1.5 py-0 h-5"
                    >
                      {item.quantidadeUnidade || "0"}un
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-700 px-1.5 py-0 h-5"
                    >
                      {item.linhasPickingVisitadas || "0"}ln
                    </Badge>
                  </div>

                  {/* Ação */}
                  <Button
                    variant="ghost"
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItemProdutividade(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-sm text-muted-foreground">
              Nenhum registro encontrado
            </div>
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
