import { CriarFunctionarioParams } from "@/domain/add-funcionario";
import { makeCreateFuncionario } from "@/main/factories/usecases/remote-create-funcionario";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useAddFuncionario = () => {
  // Sempre chamar os Hooks na mesma ordem
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const mutationFn = async (params: CriarFunctionarioParams) => {
    if (!session?.user.accessToken) {
      throw new Error("Access token não disponível");
    }
    return makeCreateFuncionario(session.user.accessToken).criarFuncionario(params);
  };

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      toast.success("Funcionário criado com sucesso");
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      toast.error("Erro ao criar funcionário");
    },
  });
};