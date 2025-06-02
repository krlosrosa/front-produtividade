import { AddProdutividadeParams } from "@/domain/add-produtividade";
import { makeRemoteAddProdutividade } from "@/main/factories/usecases/remote-add-produtividade";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useStoreProdutividade } from "../components/atom";

export const useAddProdutividade = () => {
  // Sempre chamar os Hooks na mesma ordem
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { reset, setUser, resetForm } = useStoreProdutividade()

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
      toast.success("Produtividade cadastrada com sucesso");
      push("/dash");
      reset()
      setUser({
        id: '',
        name: ''
      })
      resetForm()
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error("Erro ao cadastrar produtividade");
    },
  });
};
