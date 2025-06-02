"use client";

import HeaderDashboard from "./components/header";
import StatusDashBoard from "./components/status";
import FiltrosDashboard from "./components/filtros";
import ListCardProdutividadeDash from "./components/listCards/Listcard";
import { useProdutividadeQuery } from "./application/query";
import { GetProdutividadeResult } from "@/domain/get-produtividade";
import { useEffect, useState } from "react";
import { useStoreProdutividade } from "../addProdutividade/components/atom";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data, isError, isLoading, error } = useProdutividadeQuery();
  const [filtrar, setFiltrar] = useState({
    estado: "",
    filtro: "",
  });

  const { processo } = useStoreProdutividade();
  const { push } = useRouter();
  const { update } = useSession();
  useEffect(() => {
    if (processo.processo === "") {
      push("processo");
    }
    update();
  }, [processo.processo]);
  if (isLoading) return <div>Carregando...</div>;
  if (isError)
    return (
      <div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );

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
