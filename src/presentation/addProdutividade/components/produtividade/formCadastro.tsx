import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStoreProdutividade } from "../atom";

export default function FormCadastro() {
  const { setFormulario, adicionarFormulario, formulario, reset } =
    useStoreProdutividade();

  function handle() {
    adicionarFormulario();
    reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulário Detalhado</CardTitle>
        <CardDescription>Preencha todos os campos necessários</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-xs">
          <div className="space-y-2">
            <Label htmlFor="empresa">Empresa</Label>
            <Input
              id="empresa"
              value={formulario.empresa}
              onChange={(e) => setFormulario({ empresa: e.target.value })}
              placeholder="Nome da empresa"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="transporte">Transporte</Label>
            <Input
              id="transporte"
              value={formulario.transporte}
              onChange={(e) => setFormulario({ transporte: e.target.value })}
              placeholder="Tipo de transporte"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="idPallet">ID Pallet</Label>
            <Input
              id="idPallet"
              value={formulario.idPallet}
              onChange={(e) => setFormulario({ idPallet: e.target.value })}
              placeholder="Identificação do pallet"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantidadeCaixa">Quantidade de Caixas</Label>
            <Input
              id="quantidadeCaixa"
              value={formulario.quantidadeCaixa}
              onChange={(e) =>
                setFormulario({
                  quantidadeCaixa: parseInt(e.target.value) || 0,
                })
              }
              type="number"
              placeholder="Número de caixas"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantidadeUnidad">Quantidade de Unidades</Label>
            <Input
              id="quantidadeUnidad"
              value={formulario.quantidadeUnidade}
              onChange={(e) =>
                setFormulario({
                  quantidadeUnidade: parseInt(e.target.value) || 0,
                })
              }
              type="number"
              placeholder="Número de unidades"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linhasPickingVisitadas">
              Linhas Picking Visitadas
            </Label>
            <Input
              id="linhasPickingVisitadas"
              value={formulario.linhasPickingVisitadas}
              onChange={(e) =>
                setFormulario({
                  linhasPickingVisitadas: parseInt(e.target.value) || 0,
                })
              }
              type="number"
              placeholder="Número de linhas visitadas"
            />
          </div>

        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handle} className="w-full md:w-auto">
          Adicionar Registro
        </Button>
      </CardFooter>
    </Card>
  );
}
