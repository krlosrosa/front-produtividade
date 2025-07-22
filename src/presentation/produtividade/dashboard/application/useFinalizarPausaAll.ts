import { makeRemoteAddPausaAll } from "@/main/factories/usecases/remote-add-pausa-all";
import { makeRemoteFinalizarPausaAll } from "@/main/factories/usecases/remote-finalziar-pausa-all";
import { useProdutividadeStore } from "@/presentation/produtividade/dashboard/store/useProdutividadeStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useFinalizarPausaAll = () => {
  // Sempre chamar os Hooks na mesma ordem
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { setUser, processo } = useProdutividadeStore();

  const mutationFn = async () => {
    if (!session?.user.accessToken || !session.user.center) {
      throw new Error("Access token não disponível");
    }
    return makeRemoteFinalizarPausaAll(
      processo.processo as "SEPARACAO" | "CARREGAMENTO",
      session.user.center,
      processo.dataRegistro as Date,
      session.user.accessToken
    ).finalizarPausaAll();
  };

  return useMutation({
    mutationFn,

    onSuccess: (data) => {
      toast.success("Pausa cadastrada com sucesso");
      queryClient.invalidateQueries({ queryKey: ["statusCenter"] });
    },
    onError: (error) => {
      toast.error("Erro ao cadastrar produtividade");
    },
  });
};
