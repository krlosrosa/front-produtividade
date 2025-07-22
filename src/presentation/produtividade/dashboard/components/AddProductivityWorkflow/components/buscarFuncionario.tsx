import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, UserCheck } from "lucide-react";
import AdicionarDemandaButton from "./adicionarDemanda";
import { KeyboardEvent, useMemo } from "react";
import { useProdutividadeStore } from "@/presentation/produtividade/dashboard/store/useProdutividadeStore";
import { useFuncionariosQuery } from "@/presentation/produtividade/dashboard/application/useFuncionarioQuery";

export default function BuscarFuncionario() {
  const { data = [] } = useFuncionariosQuery(); // Valor padrão para data
  const { user, setUser, userFiltro, setUserFiltro } = useProdutividadeStore();


  const usuariosFiltrados = useMemo(() => {
    const termoBusca = userFiltro?.toLowerCase();
    if (!termoBusca || termoBusca.length <= 2) return data;
    
    return data.filter((usuario) => 
      usuario.id.toLowerCase().includes(termoBusca) ||
      usuario.name.toLowerCase().includes(termoBusca)
    );
  }, [data, userFiltro]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === "Tab") && usuariosFiltrados.length > 0) {
      e.preventDefault();
      setUser({ ...usuariosFiltrados[0] });
    }
  };

  const handleBuscarClick = () => {
    if (usuariosFiltrados.length > 0) {
      setUser({ ...usuariosFiltrados[0] });
    }
  };
  return (
    <Card className="h-full">
      <CardHeader className="pb-3 pt-4">
        <CardTitle className="text-base flex items-center gap-2">
          <Search className="w-4 h-4 text-blue-600" />
          Buscar Funcionário
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        {/* Selected User */}
        {user.id && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-center gap-2 mb-1">
              <UserCheck className="w-3 h-3 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                Selecionado:
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              <Badge variant="secondary" className="bg-white text-xs h-5">
                {user.id}
              </Badge>
              <Badge variant="secondary" className="bg-white text-xs h-5">
                {user.name}
              </Badge>
            </div>
          </div>
        )}

        {/* Search Input */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
            <Input
              onChange={(e) => setUserFiltro(e.target.value)}
              onKeyDown={handleKeyDown}
              value={userFiltro}
              placeholder="ID ou nome do usuário"
              className="pl-8 h-9 text-sm"
            />
          </div>
          <Button size="sm" className="w-full h-8 text-sm">
            <Search className="w-3 h-3 mr-1" />
            Buscar
          </Button>
        </div>
      </CardContent>

      <CardFooter className="pt-0 px-4 pb-4">
        <AdicionarDemandaButton />
      </CardFooter>
    </Card>
  );
}
