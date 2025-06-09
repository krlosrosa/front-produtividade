import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useProdutividadeStore } from "../store/useProdutividadeStore";
import { makeCreateFuncionario } from "@/main/factories/usecases/remote-create-funcionario";
import { CriarFunctionarioParams } from "@/domain/add-funcionario";

export const useAddFuncionarioMutation = () => {
  // Sempre chamar os Hooks na mesma ordem
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const {
    resetUser,
    toggleProdutividadeModal,
    setTabSelect,
    resetProdutividade,
    setUserFiltro,
  } = useProdutividadeStore();

  const mutationFn = async (params: CriarFunctionarioParams) => {
    if (!session?.user.accessToken || !session.user.center) {
      throw new Error("Access token não disponível");
    }
    return makeCreateFuncionario(session.user.accessToken).criarFuncionario(
      params
    );
  };

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      toast.success("Funcionário cadastrado com sucesso", {
        position: "bottom-right",
      });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      toast.error(`Erro ao cadastrar funcionário`);
    },
  });
};
