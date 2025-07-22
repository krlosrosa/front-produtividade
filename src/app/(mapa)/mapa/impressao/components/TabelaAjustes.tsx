import { GrupoSumarizado } from "../utils/ajustesUtils"
import { useConfigImpressaoStore } from "@/features/mapa/store/configImpressaoStore"
import { useRoteirizacaoStore } from "@/features/mapa/store/roteirizacaoStrore"
import CabecalhoGrupo from "./CabecalhoGrupo"
import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { useSession } from "next-auth/react"

interface TabelaAjustesProps {
  dataComQuebraPallet: GrupoSumarizado[]
}

export function TabelaAjustes({ dataComQuebraPallet }: TabelaAjustesProps) {
  const { palletsFull, unidades, exibirRangeData } = useConfigImpressaoStore()
  const { dataRoteirizacao } = useRoteirizacaoStore()
  const { data: session } = useSession()

  // Gerar CSS dinâmico para cada grupo
  const generateDynamicCSS = () => {
    // Contar quantas vezes cada primeira informação aparece
    const contadores: { [key: string]: number } = {};
    dataComQuebraPallet.forEach((grupo) => {
      const primeiraInfo = grupo.chave.split(' - ')[0];
      contadores[primeiraInfo] = (contadores[primeiraInfo] || 0) + 1;
    });

    // Criar contadores para cada primeira informação
    const contadoresPorInfo: { [key: string]: number } = {};
    
    let css = `
      @media print {
        @page {
          margin: 5mm 5mm 15mm 5mm;
          size: A4 portrait;
          @bottom-right {
            content: "Página " counter(page) " de " counter(pages);
            font-size: 8pt;
            font-family: Arial, sans-serif;
          }
          @bottom-left {
            content: "Impresso em: ${new Date().toLocaleString('pt-BR')}";
            font-size: 8pt;
            font-family: Arial, sans-serif;
          }
        }
    `;

    // Adicionar regras específicas para cada grupo
    dataComQuebraPallet.forEach((grupo, index) => {
      // Pegar apenas a primeira informação da chave
      const primeiraInfo = grupo.chave.split(' - ')[0];
      
      // Incrementar contador para esta informação
      contadoresPorInfo[primeiraInfo] = (contadoresPorInfo[primeiraInfo] || 0) + 1;
      const paginaAtual = contadoresPorInfo[primeiraInfo];
      const totalPaginas = contadores[primeiraInfo];
      
      css += `
        @page grupo-${index} {
          margin: 5mm 5mm 15mm 5mm;
          size: A4 portrait;
          @top-center {
            content: "${primeiraInfo} - ${paginaAtual}/${totalPaginas}";
            font-size: 10pt;
            font-family: Arial, sans-serif;
            font-weight: bold;
            color: #1f2937;
          }
          @bottom-right {
            content: "Página " counter(page) " de " counter(pages);
            font-size: 8pt;
            font-family: Arial, sans-serif;
          }
          @bottom-left {
            content: "Impresso em: ${new Date().toLocaleString('pt-BR')}";
            font-size: 8pt;
            font-family: Arial, sans-serif;
          }
        }
      `;
    });

    css += `
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          font-size: 9pt;
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          width: 100%;
        }
        .print-area * {
          visibility: visible;
        }
        
        .no-print {
          display: none !important;
        }
        .header,
        .header-space,
        .header {
          position: fixed;
          top: 0;
        }
        
        /* Aplicar estilo de página específico para cada grupo */
        .grupo-0 { page: grupo-0; }
        .grupo-1 { page: grupo-1; }
        .grupo-2 { page: grupo-2; }
        .grupo-3 { page: grupo-3; }
        .grupo-4 { page: grupo-4; }
        .grupo-5 { page: grupo-5; }
        .grupo-6 { page: grupo-6; }
        .grupo-7 { page: grupo-7; }
        .grupo-8 { page: grupo-8; }
        .grupo-9 { page: grupo-9; }
        
        table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
          font-size: 9pt;
          line-height: 1.2;
        }
        
        th, td {
          padding: 2px 3px;
          border: 0.5px solid #ddd;
          text-align: left;
          vertical-align: top;
          overflow: hidden;
        }
        
        th {
          background-color: #f3f4f6 !important;
          font-weight: bold;
          text-align: center;
        }
        
        /* Fixed-width columns */
        .endereco-col {
          width: 20mm;
          max-width: 20mm;
          text-align: center;
        }
        
        .codigo-col {
          width: 18mm;
          max-width: 18mm;
          word-break: break-all;
        }
        
        .lote-col {
          width: 20mm;
          max-width: 20mm;
        }
        
        .fabricacao-col, 
        .data-min-col, 
        .data-max-col {
          width: 20mm;
          max-width: 20mm;
          text-align: center;
        }
        
        .faixa-col {
          width: 14mm;
          max-width: 14mm;
          text-align: center;
        }
        
        .caixas-col, 
        .unidades-col, 
        .pallets-col {
          width: 12mm;
          max-width: 12mm;
          text-align: center;
        }
        
        /* Expandable description column */
        .descricao-col {
          width: auto;
          min-width: 40mm;
          white-space: normal;
          word-wrap: break-word;
        }
        
        /* Faixa badges */
        .faixa-badge {
          padding: 1px 3px;
          border-radius: 2px;
          font-size: 7pt;
          font-weight: bold;
          display: inline-block;
          width: 100%;
          text-align: center;
        }
        
        .faixa-vermelha {
          background-color: #fee2e2 !important;
          color: #991b1b !important;
        }
        
        .faixa-laranja {
          background-color: #fed7aa !important;
          color: #9a3412 !important;
        }
        
        .faixa-amarela {
          background-color: #fef3c7 !important;
          color: #92400e !important;
        }
        
        .faixa-azul {
          background-color: #dbeafe !important;
          color: #1e40af !important;
        }
        
        .faixa-cinza {
          background-color: #f3f4f6 !important;
          color: #374151 !important;
        }
        
        /* Prevent row breaks */
        tr {
          page-break-inside: avoid;
        }
        
        /* Group spacing and page breaks */
        .grupo-ajuste {
          page-break-after: always;
          page-break-inside: avoid;
          margin-bottom: 0;
        }
        
        .grupo-ajuste:last-child {
          page-break-after: auto;
        }
        
        /* Special formatting */
        .text-indigo-600 {
          color: #4f46e5;
        }
        
        .text-green-600 {
          color: #16a34a;
        }
        
        .font-semibold {
          font-weight: 600;
        }
      }
    `;

    return css;
  };

  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    pageStyle: generateDynamicCSS()
  });

  const mostrarColunaUnidades = unidades === "mesma" || unidades === "ambos"
  const mostrarColunaPallets = palletsFull === "mesma" || palletsFull === "ambos"

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ajustes - Mapa de Separação Completo</h1>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded no-print"
          >
            Imprimir
          </button>
        </div>
      </div>

      <div ref={contentRef} className="font-sans print-area">
        {dataComQuebraPallet.map((grupo, index) => {
          const isPalletsCompletos = grupo.chave.includes("Pallets Completos")
          const isUnidades = grupo.chave.includes("Unidades")

          let bgColor = "bg-blue-50 border-blue-200"
          let textColor = "text-blue-900"
          let textColorSecondary = "text-blue-800"
          let bgColorSecondary = "bg-blue-100 border-blue-300"
          let tableBgColor = ""
          let theadBgColor = "bg-gray-50"
          let hoverBgColor = "hover:bg-gray-50"

          if (isPalletsCompletos) {
            bgColor = "bg-green-50 border-green-200"
            textColor = "text-green-900"
            textColorSecondary = "text-green-800"
            bgColorSecondary = "bg-green-100 border-green-300"
            tableBgColor = "bg-green-50"
            theadBgColor = "bg-green-100"
            hoverBgColor = "hover:bg-green-50"
          } else if (isUnidades) {
            bgColor = "bg-purple-50 border-purple-200"
            textColor = "text-purple-900"
            textColorSecondary = "text-purple-800"
            bgColorSecondary = "bg-purple-100 border-purple-300"
            tableBgColor = "bg-purple-50"
            theadBgColor = "bg-purple-100"
            hoverBgColor = "hover:bg-purple-50"
          }

          const mostrarColunaCaixas = !isPalletsCompletos && !isUnidades
          const mostrarColunaUnidadesGrupo = isUnidades || (!isPalletsCompletos && (unidades === "mesma" || unidades === "ambos"))
          const mostrarColunaPalletsGrupo = isPalletsCompletos || (!isUnidades && (palletsFull === "mesma" || palletsFull === "ambos"))

          return (
            <section
              key={index}
              className={`grupo-ajuste grupo-${index} ${index === dataComQuebraPallet.length - 1 ? 'last-grupo' : ''}`}
            >
              <CabecalhoGrupo
                grupo={grupo}
                index={index}
                dadosRoteirizacao={dataRoteirizacao}
                bgColor={bgColor}
                textColor={textColor}
                textColorSecondary={textColorSecondary}
                bgColorSecondary={bgColorSecondary}
              />

              <div className="overflow-x-auto mt-1">
                <table className={`w-full border border-gray-200 rounded-lg ${tableBgColor} font-sans`}>
                  <thead className={theadBgColor}>
                    <tr>
                      <th className="endereco-col">Endereço</th>
                      <th className="codigo-col">Código</th>
                      <th className="descricao-col">Descrição</th>
                      <th className="lote-col">Lote</th>
                      {!exibirRangeData && <th className="fabricacao-col">Fabricação</th>}
                      <th className="faixa-col">Faixa</th>
                      {exibirRangeData && (
                        <>
                          <th className="data-min-col">Data Mínima</th>
                          <th className="data-max-col">Data Máxima</th>
                        </>
                      )}
                      {mostrarColunaCaixas && <th className="caixas-col">Caixas</th>}
                      {mostrarColunaUnidadesGrupo && <th className="unidades-col">Unidades</th>}
                      {mostrarColunaPalletsGrupo && <th className="pallets-col">Pallets</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {grupo.produtos.map((produto: any, prodIndex: number) => (
                      <tr key={prodIndex} className={`${hoverBgColor} ${produto.faixa ? 'font-bold' : ''}`}>
                        <td className="endereco-col text-indigo-600 text-center">{produto.endereco}</td>
                        <td className="codigo-col">{produto.codItem}</td>
                        <td className="descricao-col">{produto.descItem}</td>
                        <td className="lote-col">{produto.lote}</td>
                        {!exibirRangeData && (
                          <td className="fabricacao-col">
                            {produto.fabricacao ? new Date(produto.fabricacao).toLocaleDateString('pt-BR') : '-'}
                          </td>
                        )}
                        <td className="faixa-col">
                          {produto.faixa && (
                            <span className={`faixa-badge ${produto.faixa === 'Vermelha' ? 'faixa-vermelha' :
                              produto.faixa === 'Laranja' ? 'faixa-laranja' :
                                produto.faixa === 'Amarela' ? 'faixa-amarela' :
                                  produto.faixa === 'Azul' ? 'faixa-azul' :
                                    'faixa-cinza'
                              }`}>
                              {produto.faixa}
                            </span>
                          )}
                        </td>
                        {exibirRangeData && (
                          <>
                            <td className="data-min-col">
                              {produto.faixaCompleta?.dataMinima && !isNaN(new Date(produto.faixaCompleta.dataMinima).getTime())
                                ? new Date(produto.faixaCompleta.dataMinima).toLocaleDateString('pt-BR')
                                : '-'}
                            </td>
                            <td className="data-max-col">
                              {produto.faixaCompleta?.dataMaxima && !isNaN(new Date(produto.faixaCompleta.dataMaxima).getTime())
                                ? new Date(produto.faixaCompleta.dataMaxima).toLocaleDateString('pt-BR')
                                : '-'}
                            </td>
                          </>
                        )}
                        {mostrarColunaCaixas && <td className="caixas-col font-semibold">{produto.caixasRestantes}</td>}
                        {mostrarColunaUnidadesGrupo && <td className="unidades-col">{produto.unidadesRestantes}</td>}
                        {mostrarColunaPalletsGrupo && <td className="pallets-col text-green-600">{produto.palletsCompletos}</td>}
                      </tr>
                    )
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}