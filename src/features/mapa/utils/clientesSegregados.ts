import * as XLSX from "xlsx"

export interface ClienteSegregado {
  codCliente: string
}

function parseNumberBr(value: string | number | undefined): string {
  if (typeof value === "number") return String(value)
  if (!value) return ""
  return String(value).trim()
}

export async function processExcelFileClientesSegregados(file: File): Promise<ClienteSegregado[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = e.target?.result as ArrayBuffer
        const workbook = XLSX.read(data, { type: "array" })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]

        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          raw: false,
        }) as any[]

        const result: ClienteSegregado[] = jsonData.map((item) => {
          // Tenta diferentes possíveis nomes de coluna
          const codCliente = 
            item["Código do Cliente"] || 
            item["Código Cliente"] || 
            item["CodCliente"] || 
            item["Cliente"] || 
            item["Código"] ||
            item["Codigo"] ||
            Object.values(item)[0] // Pega o primeiro valor se não encontrar coluna específica
          return {
            codCliente: parseNumberBr(codCliente).replace(/^0+/, "") // Remove zeros à esquerda
          }
        }).filter(cliente => cliente.codCliente && cliente.codCliente !== "") // Remove valores vazios

        resolve(result)
      } catch (error) {
        console.error(error)
        reject(new Error("Erro ao processar o arquivo Excel"))
      }
    }

    reader.onerror = () => {
      reject(new Error("Erro ao ler o arquivo"))
    }

    reader.readAsArrayBuffer(file)
  })
} 