import { GetFuncionariosByCenterResult } from "@/domain/get-funcionarios-by-center";
import { GetProdutividadeResult } from "@/domain/get-produtividade";
import { makeRemoteGetFuncionario } from "@/main/factories/usecases/remote-get-funcionario";
import { useStoreProdutividade } from "@/presentation/addProdutividade/components/atom";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useUsersQuery = () => {
    const { data: session } = useSession();
    const { processo } = useStoreProdutividade();
    
    const { data, isError, isLoading } = useQuery<GetFuncionariosByCenterResult[]>({
      queryKey: ["users", session?.user.center], // Adicione dependências aqui
      queryFn: () => {
        if (!session?.user.center) {
          throw new Error("Dados necessários não disponíveis");
        }
        
        const httpRepository = makeRemoteGetFuncionario(
          session.user.center,
          session.user.accessToken
        );
        
        return httpRepository.getFuncionarios({
          centerId: session.user.center,
        });
      },
      enabled: !!session?.user.center // Só executa quando os dados necessários estão disponíveis
    });
    
    return { data, isError, isLoading };
};