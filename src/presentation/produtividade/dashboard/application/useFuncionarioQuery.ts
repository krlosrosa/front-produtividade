//useUsersQuery

import { makeRemoteVerificarPausa } from "@/main/factories/usecases/remote-verificar-pausa";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useProdutividadeStore } from "../store/useProdutividadeStore";
import { makeRemoteGetFuncionario } from "@/main/factories/usecases/remote-get-funcionario";
import { GetFuncionariosByCenterResult } from "@/domain/get-funcionarios-by-center";

export const useFuncionariosQuery = () => {
  const { data: session } = useSession();
  const { processo } = useProdutividadeStore();

  const { data, isError, isLoading } = useQuery<
    GetFuncionariosByCenterResult[]
  >({
    queryKey: ["users"], // Adicione dependências aqui
    queryFn: () => {
      if (
        !session?.user.center ||
        !processo.dataRegistro ||
        !session?.user.accessToken ||
        !processo.processo
      ) {
        throw new Error("Dados necessários não disponíveis");
      }

      return makeRemoteGetFuncionario(
        session.user.center,
        session.user.accessToken
      ).getFuncionarios({ centerId: session.user.center });
    },
    enabled: !!session?.user.center && !!processo.dataRegistro, // Só executa quando os dados necessários estão disponíveis
  });

  return { data, isError, isLoading };
};
