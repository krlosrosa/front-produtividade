import { GrupoSumarizado } from "../../utils/ajustesUtils"

interface TabelaPalletsProps {
  palletsCompletos: GrupoSumarizado[]
}

export function TabelaPallets({ palletsCompletos }: TabelaPalletsProps) {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Pallets Completos - Separação Específica</h1>
      
      {palletsCompletos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum pallet completo encontrado.</p>
        </div>
      ) : (
        palletsCompletos.map((grupo, index) => (
          <div key={index} className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-green-900 mb-2">{grupo.chave}</h2>
              <div className="flex gap-4 text-sm text-green-800">
                <span><strong>Total Produtos:</strong> {grupo.totalProdutos}</span>
                <span><strong>Total Pallets:</strong> {grupo.totalPallets}</span>
                <span><strong>Total Caixas:</strong> {grupo.totalCaixas}</span>
              </div>
              <div className="mt-2 p-2 bg-green-100 rounded border border-green-300">
                <p className="text-xs font-mono text-green-900">
                  <strong>Chave de Agrupamento:</strong> {grupo.chave}
                </p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-4 py-2 text-center border-b">Endereço</th>
                    <th className="px-4 py-2 text-left border-b">Código</th>
                    <th className="px-4 py-2 text-left border-b">Descrição</th>
                    <th className="px-4 py-2 text-left border-b">Lote</th>
                    <th className="px-4 py-2 text-center border-b">Fabricação</th>
                    <th className="px-4 py-2 text-center border-b">Pallets</th>
                  </tr>
                </thead>
                <tbody>
                  {grupo.produtos.map((produto: any, prodIndex: number) => (
                    <tr key={prodIndex} className="hover:bg-green-50">
                      <td className="px-4 py-2 border-b text-center font-mono text-indigo-600">{produto.endereco}</td>
                      <td className="px-4 py-2 border-b font-mono text-sm">{produto.codItem}</td>
                      <td className="px-4 py-2 border-b text-sm">{produto.descItem}</td>
                      <td className="px-4 py-2 border-b font-mono text-sm">{produto.lote}</td>
                      <td className="px-4 py-2 border-b text-center font-mono text-sm">
                        {produto.fabricacao ? new Date(produto.fabricacao).toLocaleDateString('pt-BR') : '-'}
                      </td>
                      <td className="px-4 py-2 border-b text-center font-mono text-green-600 font-bold">{produto.palletsCompletos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  )
} 