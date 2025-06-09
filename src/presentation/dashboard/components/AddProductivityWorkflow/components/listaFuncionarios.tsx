import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFuncionariosQuery } from "@/presentation/dashboard/application/useFuncionarioQuery";
import { useProdutividadeStore } from "@/presentation/dashboard/store/useProdutividadeStore";
import { User, Users } from "lucide-react";

export default function ListaDeFuncionarios() {
  const { data, isError, isLoading } = useFuncionariosQuery();
  const { user, setUser, userFiltro } = useProdutividadeStore();

  if(isLoading) return <div>Carregando</div>
   if(isError) return <div>Errorks</div>

  // Filtra os usuários localmente baseado no filtroBusca
  const usuariosFiltrados = data?.filter((usuario: any) => {
    const termoBusca = userFiltro?.toLowerCase();
    if (termoBusca?.length > 2) {
      return (
        usuario.id.toLowerCase().includes(termoBusca) ||
        usuario.name.toLowerCase().includes(termoBusca)
      );
    }
    return data;
  });

  return (
    <div className="w-1/2">
      {data && (
        <Card className="h-full">
          <CardHeader className="pb-3 pt-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              Resultados
              {usuariosFiltrados && (
                <Badge variant="outline" className="ml-1 text-xs h-5">
                  {usuariosFiltrados.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[320px]">
              <div className="px-4 pb-4 space-y-2">
                {usuariosFiltrados?.length ? (
                  usuariosFiltrados.map((item: any) => (
                    <div
                      key={item.id}
                      className={`p-3 border rounded-md transition-colors ${
                        user.id === item.id
                          ? "bg-blue-50 border-blue-300"
                          : "hover:bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-6 h-6 rounded-md flex items-center justify-center ${
                              user.id === item.id
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <User className="w-3 h-3" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              ID: {item.id}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => setUser(item)}
                          variant={user.id === item.id ? "default" : "outline"}
                          size="sm"
                          className={`h-7 text-xs px-2 ${
                            user.id === item.id
                              ? "bg-blue-600 hover:bg-blue-700"
                              : ""
                          }`}
                        >
                          {user.id === item.id ? "Selecionado" : "Selecionar"}
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm font-medium">
                      Nenhum usuário encontrado
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Tente ajustar os termos da busca
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
