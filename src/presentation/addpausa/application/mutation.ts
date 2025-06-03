import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { makeRemoteAddPausaProdutividade } from "@/main/factories/usecases/remote-add-pausa-produtividade";

type Props = {
  idPallet?: string;
  transporte?: string;
};

export const useAddPausaProdutividade = () => {
  // Sempre chamar os Hooks na mesma ordem
  const { data: session } = useSession();


  const mutationFn = async (id: number) => {
    if (!session?.user.accessToken) {
      throw new Error("Access token não disponível");
    }
    return makeRemoteAddPausaProdutividade(
      id,
      session.user.accessToken
    ).addPausaProdutividade();
  };

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      toast.success("Registro realizado com sucesso");
    },
    onError: (error) => {
      toast.success("Erro ao realizar registro!");
    },
  });
};
