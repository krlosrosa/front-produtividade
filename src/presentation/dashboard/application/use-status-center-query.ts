import { makeRemoteVerificarPausa } from "@/main/factories/usecases/remote-verificar-pausa";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useProdutividadeStore } from "../store/useProdutividadeStore";

export const useStatusCenterQuery = () => {
  const { data: session } = useSession();
  const { processo } = useProdutividadeStore();

  const { data, isError, isLoading } = useQuery<boolean>({
    queryKey: ["statusCenter", processo.dataRegistro, processo.processo], // Adicione dependências aqui
    queryFn: () => {
      if (
        !session?.user.center ||
        !processo.dataRegistro ||
        !session?.user.accessToken ||
        !processo.processo
      ) {
        throw new Error("Dados necessários não disponíveis");
      }

      return makeRemoteVerificarPausa(
        processo.processo as "SEPARACAO" | "CARREGAMENTO",
        session.user.center,
        processo.dataRegistro,
        session.user.accessToken
      ).verificarPausa();
    },
    enabled: !!session?.user.center && !!processo.dataRegistro, // Só executa quando os dados necessários estão disponíveis
  });

  return { data, isError, isLoading };
};
