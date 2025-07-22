"use client";

import HeaderDashboard from "./components/header";
import StatusDashBoard from "./components/status";
import FiltrosDashboard from "./components/filtros";
import ListCardProdutividadeDash from "./components/listCards/Listcard";
import { useProdutividadeQuery } from "./application/use-produtividade-query";
import { GetProdutividadeResult } from "@/domain/get-produtividade";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useProdutividadeStore } from "./store/useProdutividadeStore";

export default function DashboardPage() {
  const { data, isError, isLoading } = useProdutividadeQuery();

  const [filtrar, setFiltrar] = useState({
    estado: "",
    filtro: "",
  });

  const { processo } = useProdutividadeStore();
  const { push } = useRouter();
  const { update } = useSession();
  useEffect(() => {
    if (processo.processo === "") {
      push("processo");
    }
    update();
  }, [processo.processo]);
  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Error...</div>;

  // Função para calcular a produtividade (caixas/hora)
  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <HeaderDashboard />
      {/* Métricas - Cards Compactos */}
      {data && <StatusDashBoard filtrar={filtrar} data={data} />}
      {/* Filtros */}
      <FiltrosDashboard filtrar={filtrar} setFiltrar={setFiltrar} />
      {/* Lista de Itens*/}
      {data && (
        <ListCardProdutividadeDash
          setFiltrar={setFiltrar}
          filtrar={filtrar}
          data={data as GetProdutividadeResult[]}
        />
      )}
    </div>
  );
}
