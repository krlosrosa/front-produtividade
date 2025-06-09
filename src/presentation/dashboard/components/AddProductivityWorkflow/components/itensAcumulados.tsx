import { useProdutividadeStore } from "@/presentation/dashboard/store/useProdutividadeStore";

export default function ItensAcumulados() {
  const { quantidadeAcumulada } = useProdutividadeStore();

  return (
    <div className="flex gap-2 text-sm">
      <div className="border rounded-lg p-2 min-w-24 flex-1">
        <div className="text-muted-foreground">Caixas</div>
        <div className="font-semibold text-lg">
          {quantidadeAcumulada.caixas || 0}
        </div>
      </div>
      <div className="border rounded-lg p-2 min-w-24 flex-1">
        <div className="text-muted-foreground">Unidades</div>
        <div className="font-semibold text-lg">
          {quantidadeAcumulada.unidades || 0}
        </div>
      </div>
      <div className="border rounded-lg p-2 min-w-24 flex-1">
        <div className="text-muted-foreground">Endereços</div>
        <div className="font-semibold text-lg">
          {quantidadeAcumulada.enderecos || 0}
        </div>
      </div>
    </div>
  );
}
