import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { makeRemoteFinalizarProdutividade } from "@/main/factories/usecases/remote-finalizar-produtividade";
import { useProdutividadeStore } from "@/presentation/produtividade/dashboard/store/useProdutividadeStore";

export const useFinalizarProdutividadeMutation = () => {
  // Sempre chamar os Hooks na mesma ordem
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { processo, demanda } = useProdutividadeStore();

  const mutationFn = async () => {
    if (
      !session?.user.accessToken ||
      !session.user.center ||
      !demanda.idPallet ||
      !demanda.transporte
    ) {
      throw new Error("Access token não disponível");
    }
    return makeRemoteFinalizarProdutividade(
      processo.processo as "SEPARACAO" | "CARREGAMENTO",
      demanda.idPallet,
      demanda.transporte,
      session.user.accessToken
    ).finalizarProdutividade();
  };

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      toast.success("Produtividade Finalizada com sucesso");
      queryClient.invalidateQueries({ queryKey: ["produtividade"] });
    },
    onError: (error) => {
      toast.error("Erro ao cadastrar produtividade");
    },
  });
};
