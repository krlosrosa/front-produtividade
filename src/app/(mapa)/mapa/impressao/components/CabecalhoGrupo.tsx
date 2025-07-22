import { GrupoSumarizado } from "../utils/ajustesUtils";
import { QRCodeSVG } from "qrcode.react";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  MapPin,
  Building,
  User,
  Package,
  Users,
  Clock,
} from "lucide-react";
import { useConfigImpressaoStore } from "@/features/mapa/store/configImpressaoStore";
import { RoteirizacaoItem } from "@/features/mapa/utils/roterizacao";

interface CabecalhoGrupoProps {
  grupo: GrupoSumarizado;
  index: number;
  dadosRoteirizacao: RoteirizacaoItem[];
  bgColor: string;
  textColor: string;
  textColorSecondary: string;
  bgColorSecondary: string;
}

const CabecalhoGrupo = ({
  grupo,
  index,
  dadosRoteirizacao,
  bgColor,
  textColor,
  textColorSecondary,
  bgColorSecondary,
}: CabecalhoGrupoProps) => {
  const { tipoAgrupamento } = useConfigImpressaoStore();

  // Determinar o tipo de mapa baseado na chave
  const determinarTipoMapa = () => {
    const chave = grupo.chave.toLowerCase();

    if (chave.includes("pallets completos")) {
      return { tipo: "pallets", icone: Package, texto: "PALLETS COMPLETOS" };
    }
    if (chave.includes("unidades")) {
      return { tipo: "unidades", icone: Users, texto: "UNIDADES" };
    }
    if (chave.includes("fifo")) {
      return { tipo: "fifo", icone: Clock, texto: "FIFO" };
    }
    if (chave.includes("pallet")) {
      return { tipo: "pallet", icone: Package, texto: "PALLET" };
    }

    return { tipo: "normal", icone: Truck, texto: "NORMAL" };
  };

  // Formatar a chave do grupo
  const formatarChave = (chave: string) => {
    const partes = chave.split(" - ");
    if (partes.length >= 3) {
      const tipo = partes[2]; // REFR
      const codigo = partes[0]; // 1013668
      const numero = partes[1]; // 7000
      return `${tipo} | ${codigo} - ${numero}`;
    }
    return chave;
  };

  const tipoMapa = determinarTipoMapa();
  const TipoIcone = tipoMapa.icone;
  const chaveFormatada = formatarChave(grupo.chave);

  // Extrair informações do transporte para este grupo
  const extrairInformacoesTransporte = () => {
    if (!dadosRoteirizacao.length) return null;

    let dadosFiltrados: RoteirizacaoItem[] = [];

    // Determinar o critério de busca baseado no tipo de agrupamento
    if (tipoAgrupamento === "codCliente") {
      // Se agrupamento por cliente, extrair código do cliente da chave
      const partesChave = grupo.chave.split(" - ");
      const codigoCliente = partesChave[0];

      // Buscar por código do cliente
      dadosFiltrados = dadosRoteirizacao.filter(
        (item) => item.cliente === codigoCliente
      );
    } else {
      // Se agrupamento por transporte, usar o transporte do grupo
      if (!grupo.transporte) return null;
      dadosFiltrados = dadosRoteirizacao.filter(
        (item) => item.transporte === grupo.transporte
      );
    }

    if (!dadosFiltrados.length) return null;

    const primeiroItem = dadosFiltrados[0];

    return {
      empresa: primeiroItem.empresa,
      rota: primeiroItem.rota,
      placa: primeiroItem.placa,
      transportadora: primeiroItem.transportadora,
      cliente: primeiroItem.cliente,
      nomeCliente: primeiroItem.nomeCliente,
      tipoAgrupamento: tipoAgrupamento,
      transporte: primeiroItem.transporte,
    };
  };

  const infoTransporte = extrairInformacoesTransporte();

  // Renderizar cabeçalho baseado no tipo de mapa
  const renderizarCabecalho = () => {
    switch (tipoMapa.tipo) {
      case "pallets":
        return (
          <div className="text-center mb-2">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TipoIcone className="w-3 h-3" />
              <h2 className={`text-sm font-bold ${textColor}`}>
                {tipoMapa.texto}
              </h2>
            </div>
            <div className={`text-xs ${textColorSecondary}`}>
              {chaveFormatada}
            </div>
          </div>
        );

      case "unidades":
        return (
          <div className="text-center mb-2">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TipoIcone className="w-3 h-3" />
              <h2 className={`text-sm font-bold ${textColor}`}>
                {tipoMapa.texto}
              </h2>
            </div>
            <div className={`text-xs ${textColorSecondary}`}>
              {chaveFormatada}
            </div>
          </div>
        );

      case "fifo":
        return (
          <div className="text-center mb-2">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TipoIcone className="w-3 h-3" />
              <h2 className={`text-sm font-bold ${textColor}`}>
                {tipoMapa.texto}
              </h2>
            </div>
            <div className={`text-xs ${textColorSecondary}`}>
              {chaveFormatada}
            </div>
          </div>
        );

      case "pallet":
        return (
          <div className="flex items-center gap-2">
            <TipoIcone className="w-3 h-3" />
            <h2 className={`text-sm font-semibold ${textColor}`}>
              {chaveFormatada}
            </h2>
            <Badge variant="outline" className="text-xs">
              {tipoMapa.texto}
            </Badge>
          </div>
        );

      default: // normal
        return (
          <div>
            <h2 className={`text-sm font-semibold ${textColor}`}>
              {chaveFormatada}
            </h2>
          </div>
        );
    }
  };

  return (
    <div className={`border rounded-lg p-2 ${bgColor} grupo-header`}>
      <div className="space-y-2">
        {/* Cabeçalho específico por tipo */}
        {renderizarCabecalho()}

        {/* Informações do transporte */}
        {infoTransporte && (
          <div className={`p-2 rounded border ${bgColorSecondary}`}>
            {tipoMapa.tipo === "pallets" ||
            tipoMapa.tipo === "unidades" ||
            tipoMapa.tipo === "fifo" ? (
              // Layout especial para pallets completos, unidades e FIFO
              <div className="flex items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {infoTransporte.tipoAgrupamento === "codCliente" ? (
                      <User className="w-2 h-2" />
                    ) : (
                      <Truck className="w-2 h-2" />
                    )}
                    <span className={`font-semibold text-xs ${textColor}`}>
                      {infoTransporte.tipoAgrupamento === "codCliente"
                        ? `Cliente ${infoTransporte.cliente}`
                        : `Transporte ${infoTransporte.transporte}`}
                    </span>
                  </div>

                  {/* Primeira linha */}
                  <div
                    className={`flex gap-2 text-xs ${textColorSecondary} mb-1`}
                  >
                    <div className="flex items-center gap-1">
                      <Building className="w-2 h-2" />
                      <span className="font-medium">Empresa:</span>
                      <Badge variant="outline" className="text-xs">
                        {infoTransporte.empresa}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-2 h-2" />
                      <span className="font-medium">Rota:</span>
                      <span>{infoTransporte.rota}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="w-2 h-2" />
                      <span className="font-medium">Placa:</span>
                      <Badge variant="outline" className="text-xs">
                        {infoTransporte.placa}
                      </Badge>
                    </div>
                  </div>

                  {/* Segunda linha */}
                  <div className={`flex gap-2 text-xs ${textColorSecondary}`}>
                    <div className="flex items-center gap-1">
                      <User className="w-2 h-2" />
                      <span className="font-medium">Cliente:</span>
                      <Badge variant="outline" className="text-xs">
                        {infoTransporte.cliente}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Nome:</span>
                      <span>{infoTransporte.nomeCliente}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Transportadora:</span>
                      <span>{infoTransporte.transportadora}</span>
                    </div>
                  </div>
                </div>

                {/* QR Code à direita para pallets completos, unidades e FIFO */}
                <div className="flex-shrink-0 ml-2">
                  <QRCodeSVG
                    value={grupo.chave}
                    size={90}
                    level="M"
                    className="border rounded p-1.5 bg-white"
                  />
                </div>
              </div>
            ) : (
              // Layout padrão para outros tipos
              <div className="flex items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {infoTransporte.tipoAgrupamento === "codCliente" ? (
                      <User className="w-2 h-2" />
                    ) : (
                      <Truck className="w-2 h-2" />
                    )}
                    <span className={`font-semibold text-xs ${textColor}`}>
                      `Transporte: {infoTransporte.transporte}
                    </span>
                  </div>

                  {/* Primeira linha */}
                  <div
                    className={`flex gap-2 text-xs ${textColorSecondary} mb-1`}
                  >
                    <div className="flex items-center gap-1">
                      <Building className="w-2 h-2" />
                      <span className="font-medium">Empresa:</span>
                      <Badge variant="outline" className="text-xs">
                        {infoTransporte.empresa}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-2 h-2" />
                      <span className="font-medium">Rota:</span>
                      <span>{infoTransporte.rota}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="w-2 h-2" />
                      <span className="font-medium">Placa:</span>
                      <Badge variant="outline" className="text-xs">
                        {infoTransporte.placa}
                      </Badge>
                    </div>
                  </div>

                  {/* Segunda linha */}
                  <div className={`flex gap-2 text-xs ${textColorSecondary}`}>
                    <div className="flex items-center gap-1">
                      <User className="w-2 h-2" />
                      <span className="font-medium">Cliente:</span>
                      <Badge variant="outline" className="text-xs">
                        {infoTransporte.cliente}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Nome:</span>
                      <span>{infoTransporte.nomeCliente}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Transportadora:</span>
                      <span>{infoTransporte.transportadora}</span>
                    </div>
                  </div>
                </div>

                {/* QR Code dentro da seção de informações */}
                <div className="flex-shrink-0 ml-2">
                  <QRCodeSVG
                    value={`${infoTransporte.transporte};${index};${grupo.totalCaixas};${grupo.totalUnidades};${grupo.totalProdutos}`}
                    size={90}
                    level="M"
                    className="border rounded p-1.5 bg-white"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Informações do grupo */}
        <div className={`flex gap-3 text-xs ${textColorSecondary}`}>
          <span>
            <strong>ID:</strong> {index}
          </span>
          <span>
            <strong>Total Produtos:</strong> {grupo.totalProdutos}
          </span>
          <span>
            <strong>Total Pallets:</strong> {grupo.totalPallets}
          </span>
          <span>
            <strong>Total Caixas:</strong> {grupo.totalCaixas}
          </span>
          <span>
            <strong>Total Unidades:</strong> {grupo.totalUnidades}
          </span>
          <span>
            <strong>Total Peso:</strong> {grupo.totalPeso.toFixed(2)} kg
          </span>
        </div>
      </div>
    </div>
  );
};

export default CabecalhoGrupo;
