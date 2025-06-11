import { makeResetSenha } from "@/main/factories/usecases/remote-reset-senha";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

interface ResetSenhaParams {
  newPassword: string;
}

export const useResetSenha = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const mutationFn = async ({
    newPassword,
  }: ResetSenhaParams) => {
    if (!session?.user.accessToken) {
      throw new Error("Access token não disponível");
    }

    const resetSenha = makeResetSenha(session.user.accessToken);
    return resetSenha.resetSenha({ newPassword });
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {

      toast.success("Senha alterada com sucesso");
      signOut()
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao alterar senha");
    },
  });
};
