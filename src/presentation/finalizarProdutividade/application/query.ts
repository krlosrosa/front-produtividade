import { GetProdutividadeInfoResult } from "@/domain/get-info-produtividade";
import { makeRemoteGetProdutividadeInfo } from "@/main/factories/usecases/remote-get-produtividade-info";
import { useStoreProdutividade } from "@/presentation/addProdutividade/components/atom";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useStoreFinalizarProdutividade } from "../atom";


export const useFinalizarProdutividadeQuery = () => {
  const { data: session } = useSession();
  const { processo } = useStoreProdutividade();
    const { demanda } = useStoreFinalizarProdutividade();


  const { data, isError, isLoading } = useQuery<GetProdutividadeInfoResult>({
    queryKey: ["produtividade", processo.processo, demanda.idPallet, demanda.transporte],
    queryFn: async () => {
      if (
        !session?.user.accessToken ||
        !processo.processo ||
        !demanda.idPallet ||
        !demanda.transporte
      ) {
        throw new Error("Dados necessários não disponíveis");
      }

      const httpRepository = makeRemoteGetProdutividadeInfo(
        processo.processo as "SEPARACAO" | "CARREGAMENTO",
        demanda.idPallet,
        demanda.transporte,
        session.user.accessToken
      );

      return httpRepository.getProdutividadeInfo({
        idPallet: demanda.idPallet,
        processo: processo.processo,
        transporte: demanda.transporte,
      });
    },
    enabled:
      !!session?.user.accessToken &&
      !!processo.dataRegistro &&
      !!demanda.idPallet &&
      !!demanda.transporte,
  });

  return { data, isError, isLoading };
};
