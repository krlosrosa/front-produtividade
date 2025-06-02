import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStoreProdutividade } from "../atom";
import { Trash2 } from "lucide-react";

export default function ListaItensCadastrados() {
  const { formularios, removerFormulario } = useStoreProdutividade();

  return (
    <Card className="w-full">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Registros</CardTitle>
            <CardDescription className="text-xs">
              {formularios.length} itens
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-2">
        {formularios.length > 0 ? (
          <div className="flex flex-col gap-1">
            {formularios.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md transition-colors"
              >
                <div className="flex items-center gap-4 w-full overflow-x-auto">
                  {/* Empresa */}
                  <div className="min-w-[120px]">
                    <p className="text-sm font-medium truncate">
                      {item.empresa || <span className="text-muted-foreground">-</span>}
                    </p>
                  </div>
                  
                  {/* Transporte */}
                  <div className="min-w-[80px]">
                    <p className="text-xs text-muted-foreground truncate">
                      {item.transporte || '-'}
                    </p>
                  </div>
                  
                  {/* ID Pallet */}
                  {item.idPallet && (
                    <Badge variant="outline" className="text-xs font-mono min-w-[60px] justify-center">
                      #{item.idPallet}
                    </Badge>
                  )}

                  {/* Valores numéricos */}
                  <div className="flex gap-2 ml-auto">
                    <Badge variant="outline" className="text-xs h-6 px-2 bg-blue-50 text-blue-700">
                      {item.quantidadeCaixa || "0"} cx
                    </Badge>
                    <Badge variant="outline" className="text-xs h-6 px-2 bg-green-50 text-green-700">
                      {item.quantidadeUnidade || "0"} un
                    </Badge>
                    <Badge variant="outline" className="text-xs h-6 px-2 bg-purple-50 text-purple-700">
                      {item.linhasPickingVisitadas || "0"} ln
                    </Badge>
                  </div>
                </div>
                
                {/* Botão de exclusão */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 ml-2 text-destructive hover:text-destructive"
                  onClick={() => removerFormulario(index)}
                  title="Excluir"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-sm text-muted-foreground">
            Nenhum registro cadastrado
          </div>
        )}
      </CardContent>
    </Card>
  );
}