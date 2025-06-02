"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeaderDashboard() {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard de Produtividade
        </h1>
        <p className="text-muted-foreground">
          Visão geral dos processos logísticos
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <Button
          onClick={() => router.push("/addprodutividade")}
          className="gap-2 shadow-sm"
        >
          <PlusCircle className="h-4 w-4" />
          Nova Produtividade
        </Button>
        <Button
          onClick={() => router.push("/finalizar")}
          variant="outline"
          className="gap-2"
        >
          <CheckCircle className="h-4 w-4" />
          Finalizar
        </Button>
      </div>
    </div>
  );
}
