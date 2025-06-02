import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { makeRemoteFinalizarProdutividade } from "@/main/factories/usecases/remote-finalizar-produtividade";
import { useStoreProdutividade } from "@/presentation/addProdutividade/components/atom";
import { useStoreFinalizarProdutividade } from "../atom";

type Props = {
  idPallet?: string;
  transporte?: string;
};

export const useFinalizarProdutividade = () => {
  // Sempre chamar os Hooks na mesma ordem
  const { data: session } = useSession();
  const { setdemanda, demanda, setDemandaOnChange } =
    useStoreFinalizarProdutividade();
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { reset, setUser, resetForm, processo } = useStoreProdutividade();

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
      toast.success("Produtividade cadastrada com sucesso");
      push("/dash");
      reset();
      setUser({
        id: "",
        name: "",
      });
      resetForm();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.success("Erro ao cadastrar produtividade");
    },
  });
};
