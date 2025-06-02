import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

interface DateRange {
  from: Date;
  to: Date;
}

export const useDownloadReport = () => {
  const { data: session } = useSession();

  const downloadReportMutation = useMutation({
    mutationFn: async (date: DateRange) => {
      if (!date.from || !date.to) {
        throw new Error("Por favor, selecione um intervalo de datas válido");
      }

      const fromDate = format(date.from, "yyyy-MM-dd");
      const toDate = format(date.to, "yyyy-MM-dd");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL_HTTP}/gerarrelatorio/${session?.user.center}/${fromDate}/${toDate}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
          responseType: "blob",
        }
      );

      const contentType = response.headers["content-type"];
      if (!contentType.includes("spreadsheet")) {
        if (contentType.includes("json")) {
          const errorData = await new Response(response.data).json();
          throw new Error(errorData.message || "Erro ao gerar relatório");
        }
        throw new Error("Resposta não é um arquivo Excel válido");
      }

      return { data: response.data, fromDate, toDate };
    },
    onSuccess: ({ data, fromDate, toDate }) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `relatorio_produtividade_${fromDate}_${toDate}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Relatório baixado com sucesso");
    },
    onError: (error: any) => {
      console.error("Erro ao buscar dados:", error);
      toast.error(
        error.message || "Ocorreu um erro ao tentar baixar o relatório"
      );
    },
  });

  return {
    downloadReport: downloadReportMutation.mutate,
    isLoading: downloadReportMutation.isPending,
    error: downloadReportMutation.error,
  };
};
