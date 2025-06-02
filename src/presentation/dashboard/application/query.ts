import { GetProdutividadeResult } from "@/domain/get-produtividade";
import { makeRemoteAddAccount } from "@/main/factories/usecases/remote-get-produtividade";
import { useStoreProdutividade } from "@/presentation/addProdutividade/components/atom";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useProdutividadeQuery = () => {
    const { data: session } = useSession();
    const { processo } = useStoreProdutividade();
    
    const { data, isError, isLoading, error } = useQuery<GetProdutividadeResult[]>({
      queryKey: ["produtividade", processo.dataRegistro, processo.processo], // Adicione dependências aqui
      queryFn: () => {
        if (!session?.user.center || !processo.dataRegistro || !session?.user.accessToken || !processo.processo) {
          throw new Error("Dados necessários não disponíveis");
        }
        
        const httpRepository = makeRemoteAddAccount(
          session.user.center,
          processo.dataRegistro,
          processo.processo as 'SEPARACAO' | 'CARREGAMENTO',
          session.user.accessToken
        );
        
        return httpRepository.getProdutividade({
          centerId: session.user.center,
          data: processo.dataRegistro,
          processo: processo.processo,
        });
      },
      enabled: !!session?.user.center && !!processo.dataRegistro // Só executa quando os dados necessários estão disponíveis
    });
    
    return { data, isError, isLoading, error };
};