import { AddProdutividadeParams } from "@/domain/add-produtividade";
import { makeRemoteAddProdutividade } from "@/main/factories/usecases/remote-add-produtividade";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useProdutividadeStore } from "../store/useProdutividadeStore";

export const useAddProdutividadeMutation = () => {
  // Sempre chamar os Hooks na mesma ordem
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { resetUser, toggleProdutividadeModal, setTabSelect, resetProdutividade, setUserFiltro } = useProdutividadeStore();

  const mutationFn = async (params: AddProdutividadeParams) => {
    if (!session?.user.accessToken || !session.user.center) {
      throw new Error("Access token não disponível");
    }
    return makeRemoteAddProdutividade(
      session.user.center,
      session.user.accessToken
    ).addProdutividade(params);
  };

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      toast.success("Produtividade cadastrada com sucesso", {
        position: "bottom-right"
      });
      resetUser();
      setTabSelect("produtividade")
      resetProdutividade()
      setUserFiltro("")
      toggleProdutividadeModal()
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["produtividade"],
      });
      queryClient.invalidateQueries({
        queryKey: ["statusCenter"],
      });
    },
    onError: (error) => {
      toast.error(`Erro ao cadastrar produtividade ${JSON.stringify(error)}`);
    },
  });
};
