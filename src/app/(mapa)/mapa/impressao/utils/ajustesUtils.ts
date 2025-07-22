
import { CadastroProdutoItem } from "@/features/mapa/utils/cadastrosProdutos"
import { RemessasItem } from "@/features/mapa/utils/remessas"
import _ from "lodash"

export type ReturnProps = {
  caixas: number
  unidades: number
}

export type FaixaProduto = {
  dataMinima: Date | null
  dataMaxima: Date | null
  faixa: string
}

export type ProdutoSumarizado = {
  codItem: string
  descItem: string
  lote: string
  fabricacao: Date
  categoria: string
  pickWay: number
  endereco: string
  shelf: number
  tipoPeso: number
  unidadeCaixa: number
  caixaPallet: number
  totalCaixaria: number
  totalUnidade: number
  caixasDeUnidade: number
  unidadesRestantes: number
  totalCaixas: number
  palletsCompletos: number
  caixasRestantes: number
  percentOcupacaoPallet: number
  faixa: string
  faixaCompleta: FaixaProduto
  itensOriginais: RemessasItem[]
}

export type GrupoSumarizado = {
  chave: string
  produtos: ProdutoSumarizado[]
  totalProdutos: number
  totalPallets: number
  totalCaixas: number
  totalUnidades: number
  totalPeso: number
  transporte: string
}

// Função para alocar quantidade baseada na unidade de medida
export function alocarQuantidade(venda: number, unMedida: string): ReturnProps {
  if (unMedida === "UN" || unMedida === "CJ") {
    return { unidades: venda, caixas: 0 }
  } else {
    return { unidades: 0, caixas: venda }
  }
}

// Função para calcular a faixa do produto baseada na vida útil
export function calcularFaixaProduto(
  dataFabricacao: Date,
  shelfLife: number,
  vermelhaFaixa: number,
  laranjaFaixa: number,
  amareloFaixa: number,
  verdeFaixa: number,
  percentualMinimo: string,
  percentualMaximo: string
): FaixaProduto {
  if (!dataFabricacao || !shelfLife) {
    return {
      dataMinima: null,
      dataMaxima: null,
      faixa: "Sem informação"
    }
  }

  const hoje = new Date()
  const dataVencimento = new Date(dataFabricacao)
  dataVencimento.setDate(dataVencimento.getDate() + shelfLife)
  
  const diasRestantes = Math.ceil((dataVencimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))
  const percentualVidaUtil = (diasRestantes / shelfLife) * 100

  // com base no percentualMinimo e percentualMaximo, calcular a faixa esse % vem do store de configuração
  const percentMin = parseFloat(percentualMinimo) || 5
  const percentMax = parseFloat(percentualMaximo) || 5

  // Definir faixas baseadas nos percentuais do cadastro
  if (percentualVidaUtil <= vermelhaFaixa) {
    return {
      dataMinima: new Date(dataFabricacao),
      dataMaxima: new Date(dataFabricacao),
      faixa: "Vermelha"
    }
  } else if (percentualVidaUtil <= laranjaFaixa) {
    return {
      dataMinima: new Date(dataFabricacao),
      dataMaxima: new Date(dataFabricacao),
      faixa: "Laranja"
    }
  } else if (percentualVidaUtil <= amareloFaixa) {
    return {
      dataMinima: new Date(dataFabricacao),
      dataMaxima: new Date(dataFabricacao),
      faixa: "Amarela"
    }
  } else {
    // Calcular datas mínima e máxima baseadas nos percentuais do store
    const dataMaxima = new Date(dataFabricacao)
    const diasAdicionais = Math.floor((percentualVidaUtil * percentMax) / 100)
    dataMaxima.setDate(dataMaxima.getDate() + diasAdicionais)
    
    const dataMinima = new Date(dataFabricacao)
    const reduzirDias = Math.floor((percentualVidaUtil * percentMin) / 100)
    dataMinima.setDate(dataMinima.getDate() - reduzirDias)
    
    return {
      dataMinima: dataMinima,
      dataMaxima: dataMaxima,
      faixa: "" // Acima da faixa verde
    }
  }
}

// Função para enriquecer dados da remessa
export function enriquecerDadosRemessa(
  dataRemessa: RemessasItem[],
  dataCadastroItem: CadastroProdutoItem[]
) {
  return dataRemessa.map((item: RemessasItem) => {
    const infoProduto: CadastroProdutoItem | undefined = dataCadastroItem.find(
      (i: CadastroProdutoItem) => i.codSku === item.codItem
    )
    const caixaria = alocarQuantidade(item.venda, item.unMedidade).caixas
    const unidade = alocarQuantidade(item.venda, item.unMedidade).unidades
    
    return {
      ...item,
      empresa: infoProduto?.empresa,
      categoria: infoProduto?.linha || '',
      pickWay: infoProduto?.pickWay || 0,
      endereco: infoProduto?.endereco || '',
      shelf: infoProduto?.shelf || 0,
      tipoPeso: infoProduto?.tipoPeso || 0,
      unidadeCaixa: infoProduto?.unidadeCaixa || 1,
      caixaPallet: infoProduto?.caixaPallet || 1,
      caixaria: caixaria,
      unidade: unidade,
      percentPallet: caixaria / (infoProduto?.caixaPallet || 1),
    }
  })
}

// Função para agrupar dados por tipo de agrupamento
export function agruparDados(
  dataRemessaEnriquecida: any[],
  tipoAgrupamento: string,
  grupoTransporte: any[],
  grupoCliente: any[],
  clientesSegregar: string[]
) {
  return _.groupBy(dataRemessaEnriquecida, (item) => {
    // Se tipo de agrupamento for por transporte verificar array de grupoTransporte
    if (tipoAgrupamento === "transporte") {
      if (grupoTransporte.some(grupo => grupo.transportes.includes(item.transporte))) {
        return `${grupoTransporte.find(grupo => grupo.transportes.includes(item.transporte))?.nome} - ${item.empresa} - ${item.categoria}`
      }
    }
    
    // Se tipo de agrupamento for por cliente verificar array de grupoCliente
    if (tipoAgrupamento === "codCliente") {
      if (grupoCliente.some(grupo => grupo.transportes.includes(item.codCliente))) {
        return `${grupoCliente.find(grupo => grupo.transportes.includes(item.codCliente))?.nome} - ${item.empresa} - ${item.categoria}`
      }
    }

    // Se tipo de agrupamento for por cliente verificar array de clientesSegregar
    if (tipoAgrupamento === "transporte") {
      if (clientesSegregar.includes(item.codCliente)) {
        return `${item.transporte} - ${item.codCliente} - ${item.empresa} - ${item.categoria}`
      }
    }
    
    // Se tipo de agrupamento for por transporte verificar array de grupoTransporte  
    return `${item[tipoAgrupamento]} - ${item.empresa} - ${item.categoria}`
  })
}

// Função para sumarizar produtos
export function sumarizarProdutos(
  agrupamentoPorProduto: any,
  dataCadastroItem: CadastroProdutoItem[],
  percentualMinimo: string,
  percentualMaximo: string
): ProdutoSumarizado[] {
  return Object.entries(agrupamentoPorProduto).map(([produtoLote, produtos]: [string, any]) => {
    // Somar todas as quantidades do mesmo produto e lote
    const totalCaixaria = produtos.reduce((sum: number, item: any) => sum + (item.caixaria || 0), 0)
    const totalUnidade = produtos.reduce((sum: number, item: any) => sum + (item.unidade || 0), 0)
    
    // Pegar informações do primeiro produto (todos são iguais para o mesmo codItem-lote)
    const primeiroProduto = produtos[0]
    const infoProduto = dataCadastroItem.find((i: CadastroProdutoItem) => i.codSku === primeiroProduto.codItem)
    
    // Converter unidades para caixas
    const unidadeParaCaixa = infoProduto?.unidadeCaixa || 1
    const caixasDeUnidade = Math.floor(totalUnidade / unidadeParaCaixa)
    const unidadesRestantes = totalUnidade % unidadeParaCaixa
    const totalCaixas = totalCaixaria + caixasDeUnidade
    
    // Converter caixas para pallets
    const caixasPorPallet = infoProduto?.caixaPallet || 1
    const palletsCompletos = Math.floor(totalCaixas / caixasPorPallet)
    const caixasRestantes = totalCaixas % caixasPorPallet
    
    return {
      codItem: primeiroProduto.codItem,
      descItem: primeiroProduto.descItem,
      lote: primeiroProduto.lote,
      fabricacao: primeiroProduto.fabricacao,
      categoria: primeiroProduto.categoria,
      pickWay: primeiroProduto.pickWay,
      endereco: primeiroProduto.endereco,
      shelf: primeiroProduto.shelf,
      tipoPeso: primeiroProduto.tipoPeso,
      unidadeCaixa: unidadeParaCaixa,
      caixaPallet: caixasPorPallet,
      totalCaixaria: totalCaixaria,
      totalUnidade: totalUnidade,
      caixasDeUnidade: caixasDeUnidade,
      unidadesRestantes: unidadesRestantes,
      totalCaixas: totalCaixas,
      palletsCompletos: palletsCompletos,
      caixasRestantes: caixasRestantes,
      percentOcupacaoPallet: (caixasRestantes / caixasPorPallet) * 100,
      faixa: calcularFaixaProduto(primeiroProduto.fabricacao, infoProduto?.shelf || 0, infoProduto?.vermelhaFaixa || 0, infoProduto?.laranjaFaixa || 0, infoProduto?.amareloFaixa || 0, infoProduto?.verdeFaixa || 0, percentualMinimo, percentualMaximo).faixa,
      faixaCompleta: calcularFaixaProduto(primeiroProduto.fabricacao, infoProduto?.shelf || 0, infoProduto?.vermelhaFaixa || 0, infoProduto?.laranjaFaixa || 0, infoProduto?.amareloFaixa || 0, infoProduto?.verdeFaixa || 0, percentualMinimo, percentualMaximo),
      itensOriginais: produtos
    }
  }).sort((a, b) => {
    // Ordenar por pickWay (ordem crescente)
    if (a.pickWay !== b.pickWay) {
      return a.pickWay - b.pickWay
    }
    // Se pickWay for igual, ordenar por endereço
    return a.endereco.localeCompare(b.endereco)
  })
}

// Função para aplicar quebra de pallet
export function aplicarQuebraPallet(
  dataSumarizada: GrupoSumarizado[],
  quebraPallet: boolean,
  percentualQuebra: string
): GrupoSumarizado[] {
  if (!quebraPallet) return dataSumarizada

  const percentualQuebraNum = parseFloat(percentualQuebra) || 80
  
  return dataSumarizada.flatMap((grupo) => {
    // Verificar se o grupo é de "Pallets Completos" - se sim, não aplicar quebra
    if (grupo.chave.includes("Pallets Completos")) {
      return [grupo]
    }
    
    const gruposQuebrados: GrupoSumarizado[] = []
    
    // Agrupar todos os produtos do grupo para fazer a quebra acumulativa
    const todosProdutos = grupo.produtos
    let caixasAcumuladas = 0
    let produtosAcumulados: ProdutoSumarizado[] = []
    let palletAtual = 1
    
    todosProdutos.forEach((produto) => {
      const caixasPorPallet = produto.caixaPallet
      const totalCaixas = produto.totalCaixas
      
      // Adicionar ao acumulado
      caixasAcumuladas += totalCaixas
      produtosAcumulados.push(produto)
      
      // Calcular percentual de ocupação do pallet acumulado
      const percentOcupacaoAtual = (caixasAcumuladas / caixasPorPallet) * 100
      
      // Se atingiu o percentual de quebra, criar novo grupo
      if (percentOcupacaoAtual >= percentualQuebraNum) {
        const novoGrupo: GrupoSumarizado = {
          chave: `${grupo.chave} - Pallet ${palletAtual}`,
          produtos: produtosAcumulados,
          totalProdutos: produtosAcumulados.length,
          totalPallets: Math.floor(caixasAcumuladas / caixasPorPallet),
          totalCaixas: caixasAcumuladas,
          totalUnidades: produtosAcumulados.reduce((sum, produto) => sum + produto.unidadesRestantes, 0),
          totalPeso: produtosAcumulados.reduce((sum, produto) => sum + produto.totalCaixaria * produto.tipoPeso, 0),
          transporte: produtosAcumulados[0]?.itensOriginais[0]?.transporte || grupo.transporte
        }
        
        gruposQuebrados.push(novoGrupo)
        
        // Resetar para próximo pallet
        caixasAcumuladas = 0
        produtosAcumulados = []
        palletAtual++
      }
    })
    
    // Adicionar produtos restantes se houver
    if (produtosAcumulados.length > 0) {
      const ultimoGrupo: GrupoSumarizado = {
        chave: `${grupo.chave} - Pallet ${palletAtual}`,
        produtos: produtosAcumulados,
        totalProdutos: produtosAcumulados.length,
        totalPallets: Math.floor(caixasAcumuladas / (produtosAcumulados[0]?.caixaPallet || 1)),
        totalCaixas: caixasAcumuladas,
        totalUnidades: produtosAcumulados.reduce((sum, produto) => sum + produto.unidadesRestantes, 0),
        totalPeso: produtosAcumulados.reduce((sum, produto) => sum + produto.totalCaixaria * produto.tipoPeso, 0),
        transporte: produtosAcumulados[0]?.itensOriginais[0]?.transporte || grupo.transporte
      }
      
      gruposQuebrados.push(ultimoGrupo)
    }
    
    return gruposQuebrados.length > 0 ? gruposQuebrados : [grupo]
  })
}

// Função para classificar por transporte
export function classificarPorTransporte(dataComQuebraPallet: GrupoSumarizado[]): GrupoSumarizado[] {
  return dataComQuebraPallet.sort((a, b) => {
    // Extrair o transporte da chave
    // Formato esperado: "TRANSPORTE - Empresa - Categoria" ou "Grupo TRANSPORTE - Empresa - Categoria"
    const partesA = a.chave.split(' - ')
    const partesB = b.chave.split(' - ')
    
    // Pegar o primeiro elemento que deve ser o transporte ou grupo
    const transporteA = partesA[0]
    const transporteB = partesB[0]
    
    // Se ambos têm o mesmo transporte, verificar se são do mesmo grupo completo
    if (transporteA === transporteB) {
      // Extrair a chave base (transporte + empresa + categoria) sem sufixos
      const chaveBaseA = a.chave.replace(/ - (Pallets Completos|Unidades|Pallet \d+)$/, '')
      const chaveBaseB = b.chave.replace(/ - (Pallets Completos|Unidades|Pallet \d+)$/, '')
      
      // Se são do mesmo grupo completo, ordenar por tipo
      if (chaveBaseA === chaveBaseB) {
        const isPalletsCompletosA = a.chave.includes("Pallets Completos")
        const isPalletsCompletosB = b.chave.includes("Pallets Completos")
        const isUnidadesA = a.chave.includes("Unidades")
        const isUnidadesB = b.chave.includes("Unidades")
        const isPalletQuebradoA = a.chave.includes("Pallet ")
        const isPalletQuebradoB = b.chave.includes("Pallet ")
        
        // Pallets Completos deve vir por último
        if (isPalletsCompletosA && !isPalletsCompletosB) return 1
        if (!isPalletsCompletosA && isPalletsCompletosB) return -1
        
        // Unidades deve vir antes de Pallets Completos, mas depois dos grupos normais
        if (isUnidadesA && !isUnidadesB && !isPalletsCompletosB) return 1
        if (!isUnidadesA && isUnidadesB && !isPalletsCompletosA) return -1
        
        // Pallets quebrados devem vir antes de Unidades e Pallets Completos
        if (isPalletQuebradoA && !isPalletQuebradoB && !isUnidadesB && !isPalletsCompletosB) return -1
        if (!isPalletQuebradoA && isPalletQuebradoB && !isUnidadesA && !isPalletsCompletosA) return 1
        
        // Se ambos são do mesmo tipo, manter ordem original
        return 0
      }
      
      // Se são grupos diferentes do mesmo transporte, ordenar por chave base
      return chaveBaseA.localeCompare(chaveBaseB)
    }
    
    // Ordenar alfabeticamente por transporte
    return transporteA.localeCompare(transporteB)
  })
}

// Função para aplicar separação de unidades
export function aplicarSeparacaoUnidades(
  dataComQuebraPallet: GrupoSumarizado[],
  unidades: "mesma" | "separada" | "ambos"
): GrupoSumarizado[] {
  if (unidades === "mesma") {
    return dataComQuebraPallet
  }
  
  return dataComQuebraPallet.flatMap((grupo) => {
    const gruposSeparados: GrupoSumarizado[] = []
    
    // Separar produtos com unidades
    const produtosComUnidades: ProdutoSumarizado[] = []
    const produtosSemUnidades: ProdutoSumarizado[] = []
    
    grupo.produtos.forEach((produto) => {
      if (produto.unidadesRestantes > 0) {
        // Criar produto apenas com unidades
        produtosComUnidades.push({
          ...produto,
          totalCaixas: 0,
          caixasRestantes: 0,
          palletsCompletos: 0,
          totalCaixaria: 0,
          caixasDeUnidade: 0
        })
        
        // Adicionar produto com saldo restante apenas se houver saldo
        if (produto.caixasRestantes > 0) {
          produtosSemUnidades.push({
            ...produto,
            totalUnidade: 0,
            unidadesRestantes: 0
          })
        }
      } else {
        // Produto sem unidades
        produtosSemUnidades.push(produto)
      }
    })
    
    // Criar grupos baseados na separação
    if (unidades === "separada") {
      // Criar grupos completamente separados
      if (produtosSemUnidades.length > 0) {
        gruposSeparados.push({
          ...grupo,
          produtos: produtosSemUnidades,
          totalProdutos: produtosSemUnidades.length,
          totalPallets: produtosSemUnidades.reduce((sum, p) => sum + p.palletsCompletos, 0),
          totalCaixas: produtosSemUnidades.reduce((sum, p) => sum + p.totalCaixas, 0),
          totalUnidades: produtosSemUnidades.reduce((sum, p) => sum + p.unidadesRestantes, 0),
          totalPeso: produtosSemUnidades.reduce((sum, p) => sum + p.totalCaixaria * p.tipoPeso, 0),
          transporte: produtosSemUnidades[0]?.itensOriginais[0]?.transporte || grupo.transporte
        })
      }
      
      if (produtosComUnidades.length > 0) {
        gruposSeparados.push({
          ...grupo,
          chave: `${grupo.chave} - Unidades`,
          produtos: produtosComUnidades,
          totalProdutos: produtosComUnidades.length,
          totalPallets: 0,
          totalCaixas: 0,
          totalUnidades: produtosComUnidades.reduce((sum, p) => sum + p.unidadesRestantes, 0),
          totalPeso: 0,
          transporte: produtosComUnidades[0]?.itensOriginais[0]?.transporte || grupo.transporte
        })
      }
    } else if (unidades === "ambos") {
      // Manter grupo original e criar grupo separado para unidades
      gruposSeparados.push(grupo)
      
      if (produtosComUnidades.length > 0) {
        gruposSeparados.push({
          ...grupo,
          chave: `${grupo.chave} - Unidades`,
          produtos: produtosComUnidades,
          totalProdutos: produtosComUnidades.length,
          totalPallets: 0,
          totalCaixas: 0,
          totalUnidades: produtosComUnidades.reduce((sum, p) => sum + p.unidadesRestantes, 0),
          totalPeso: 0,
          transporte: produtosComUnidades[0]?.itensOriginais[0]?.transporte || grupo.transporte
        })
      }
    }
    
    return gruposSeparados.length > 0 ? gruposSeparados : [grupo]
  })
}

// Função para aplicar separação FIFO
export function aplicarSeparacaoFIFO(
  dataComQuebraPallet: GrupoSumarizado[],
  segregarProdutoFIFO: boolean,
  faixasFIFO: string[]
): GrupoSumarizado[] {
  if (!segregarProdutoFIFO || faixasFIFO.length === 0) {
    return dataComQuebraPallet
  }
  
  return dataComQuebraPallet.flatMap((grupo) => {
    const gruposSeparados: GrupoSumarizado[] = []
    
    // Separar produtos com faixas configuradas
    const produtosComFaixa: ProdutoSumarizado[] = []
    const produtosSemFaixa: ProdutoSumarizado[] = []
    
    grupo.produtos.forEach((produto) => {
      if (produto.faixa && produto.faixa !== "" && faixasFIFO.includes(produto.faixa)) {
        // Produto com faixa configurada - vai para mapa separado
        produtosComFaixa.push(produto)
      } else {
        // Produto sem faixa configurada - fica no mapa atual
        produtosSemFaixa.push(produto)
      }
    })
    
    // Criar grupos baseados na separação
    // Sempre criar grupos separados quando FIFO está ativo
    if (produtosSemFaixa.length > 0) {
      gruposSeparados.push({
        ...grupo,
        produtos: produtosSemFaixa,
        totalProdutos: produtosSemFaixa.length,
        totalPallets: produtosSemFaixa.reduce((sum, p) => sum + p.palletsCompletos, 0),
        totalCaixas: produtosSemFaixa.reduce((sum, p) => sum + p.totalCaixas, 0),
        totalUnidades: produtosSemFaixa.reduce((sum, p) => sum + p.unidadesRestantes, 0),
        totalPeso: produtosSemFaixa.reduce((sum, p) => sum + p.totalCaixaria * p.tipoPeso, 0),
        transporte: produtosSemFaixa[0]?.itensOriginais[0]?.transporte || grupo.transporte
      })
    }
    
    if (produtosComFaixa.length > 0) {
      gruposSeparados.push({
        ...grupo,
        chave: `${grupo.chave} - FIFO`,
        produtos: produtosComFaixa,
        totalProdutos: produtosComFaixa.length,
        totalPallets: produtosComFaixa.reduce((sum, p) => sum + p.palletsCompletos, 0),
        totalCaixas: produtosComFaixa.reduce((sum, p) => sum + p.totalCaixas, 0),
        totalUnidades: produtosComFaixa.reduce((sum, p) => sum + p.unidadesRestantes, 0),
        totalPeso: produtosComFaixa.reduce((sum, p) => sum + p.totalCaixaria * p.tipoPeso, 0),
        transporte: produtosComFaixa[0]?.itensOriginais[0]?.transporte || grupo.transporte
      })
    }
    
    return gruposSeparados.length > 0 ? gruposSeparados : [grupo]
  })
}

// Função para aplicar separação de pallets completos
export function aplicarSeparacaoPalletsCompletos(
  dataComQuebraPallet: GrupoSumarizado[],
  palletsFull: "mesma" | "separada" | "ambos"
): GrupoSumarizado[] {
  if (palletsFull === "mesma") {
    return dataComQuebraPallet
  }
  
  return dataComQuebraPallet.flatMap((grupo) => {
    const gruposSeparados: GrupoSumarizado[] = []
    
    // Separar produtos com pallets completos
    const produtosComPalletsCompletos: ProdutoSumarizado[] = []
    const produtosSemPalletsCompletos: ProdutoSumarizado[] = []
    
    grupo.produtos.forEach((produto) => {
      if (produto.palletsCompletos > 0) {
        // Criar produto apenas com pallets completos
        produtosComPalletsCompletos.push({
          ...produto,
          totalCaixas: produto.palletsCompletos * produto.caixaPallet,
          caixasRestantes: 0,
          unidadesRestantes: 0,
          totalUnidade: 0
        })
        
        // Adicionar produto com saldo restante apenas se houver saldo
        if (produto.caixasRestantes > 0 || produto.unidadesRestantes > 0) {
          produtosSemPalletsCompletos.push({
            ...produto,
            totalCaixas: produto.caixasRestantes,
            palletsCompletos: 0
          })
        }
      } else {
        // Produto sem pallets completos
        produtosSemPalletsCompletos.push(produto)
      }
    })
    
    // Criar grupos baseados na separação
    if (palletsFull === "separada") {
      // Criar grupos completamente separados
      if (produtosSemPalletsCompletos.length > 0) {
        gruposSeparados.push({
          ...grupo,
          produtos: produtosSemPalletsCompletos,
          totalProdutos: produtosSemPalletsCompletos.length,
          totalPallets: 0,
          totalCaixas: produtosSemPalletsCompletos.reduce((sum, p) => sum + p.totalCaixas, 0),
          totalUnidades: produtosSemPalletsCompletos.reduce((sum, p) => sum + p.unidadesRestantes, 0),
          totalPeso: produtosSemPalletsCompletos.reduce((sum, p) => sum + p.totalCaixaria * p.tipoPeso, 0),
          transporte: produtosSemPalletsCompletos[0]?.itensOriginais[0]?.transporte || grupo.transporte
        })
      }
      
      if (produtosComPalletsCompletos.length > 0) {
        gruposSeparados.push({
          ...grupo,
          chave: `${grupo.chave} - Pallets Completos`,
          produtos: produtosComPalletsCompletos,
          totalProdutos: produtosComPalletsCompletos.length,
          totalPallets: produtosComPalletsCompletos.reduce((sum, p) => sum + p.palletsCompletos, 0),
          totalCaixas: produtosComPalletsCompletos.reduce((sum, p) => sum + p.totalCaixas, 0),
          totalUnidades: produtosComPalletsCompletos.reduce((sum, p) => sum + p.unidadesRestantes, 0),
          totalPeso: produtosComPalletsCompletos.reduce((sum, p) => sum + p.totalCaixaria * p.tipoPeso, 0),
          transporte: produtosComPalletsCompletos[0]?.itensOriginais[0]?.transporte || grupo.transporte
        })
      }
    } else if (palletsFull === "ambos") {
      // Manter grupo original e criar grupo separado para pallets completos
      gruposSeparados.push(grupo)
      
      if (produtosComPalletsCompletos.length > 0) {
        gruposSeparados.push({
          ...grupo,
          chave: `${grupo.chave} - Pallets Completos`,
          produtos: produtosComPalletsCompletos,
          totalProdutos: produtosComPalletsCompletos.length,
          totalPallets: produtosComPalletsCompletos.reduce((sum, p) => sum + p.palletsCompletos, 0),
          totalCaixas: produtosComPalletsCompletos.reduce((sum, p) => sum + p.caixasRestantes, 0),
          totalUnidades: produtosComPalletsCompletos.reduce((sum, p) => sum + p.unidadesRestantes, 0),
          totalPeso: produtosComPalletsCompletos.reduce((sum, p) => sum + p.caixasRestantes * p.tipoPeso, 0),
          transporte: produtosComPalletsCompletos[0]?.itensOriginais[0]?.transporte || grupo.transporte
        })
      }
    }
    
    return gruposSeparados.length > 0 ? gruposSeparados : [grupo]
  })
}

// Função principal para processar todos os dados
export function processarDadosAjustes(
  dataRemessa: RemessasItem[],
  dataCadastroItem: CadastroProdutoItem[],
  tipoAgrupamento: string,
  grupoTransporte: any[],
  grupoCliente: any[],
  clientesSegregar: string[],
  quebraPallet: boolean,
  percentualQuebra: string,
  palletsFull: "mesma" | "separada" | "ambos",
  unidades: "mesma" | "separada" | "ambos",
  percentualMinimo: string,
  percentualMaximo: string,
  segregarProdutoFIFO: boolean,
  faixasFIFO: string[]
): GrupoSumarizado[] {
  // 1. Enriquecer dados
  const dataRemessaEnriquecida = enriquecerDadosRemessa(dataRemessa, dataCadastroItem)
  
  // 2. Agrupar dados
  const dadosAgrupados = agruparDados(
    dataRemessaEnriquecida,
    tipoAgrupamento,
    grupoTransporte,
    grupoCliente,
    clientesSegregar
  )
  
  // 3. Sumarizar produtos
  const dataSumarizada: GrupoSumarizado[] = Object.entries(dadosAgrupados).map(([chave, items]) => {
    const agrupamentoPorProduto = _.groupBy(items, (item) => `${item.codItem}-${item.lote}`)
    const produtosSumarizados = sumarizarProdutos(agrupamentoPorProduto, dataCadastroItem, percentualMinimo, percentualMaximo)
    
    return {
      chave,
      produtos: produtosSumarizados,
      empresa: items[0].empresa,
      totalProdutos: produtosSumarizados.length,
      totalPallets: produtosSumarizados.reduce((sum, produto) => sum + produto.palletsCompletos, 0),
      totalCaixas: produtosSumarizados.reduce((sum, produto) => sum + produto.totalCaixas, 0),
      totalUnidades: produtosSumarizados.reduce((sum, produto) => sum + produto.unidadesRestantes, 0),
      totalPeso: produtosSumarizados.reduce((sum, produto) => sum + produto.totalCaixaria * produto.tipoPeso, 0),
      transporte: produtosSumarizados[0]?.itensOriginais[0]?.transporte || chave.split(' - ')[0]
    }
  })
  
  // 4. Aplicar separação de pallets completos (antes da quebra de pallet)
  const dataComSeparacaoPallets = aplicarSeparacaoPalletsCompletos(dataSumarizada, palletsFull)
  
  // 5. Aplicar quebra de pallet (apenas nos grupos que não são Pallets Completos)
  const dataComQuebraPallet = aplicarQuebraPallet(dataComSeparacaoPallets, quebraPallet, percentualQuebra)
  
  // 6. Aplicar separação de unidades
  const dataComSeparacaoUnidades = aplicarSeparacaoUnidades(dataComQuebraPallet, unidades)
  
  // 7. Aplicar separação FIFO
  const dataComSeparacaoFIFO = aplicarSeparacaoFIFO(dataComSeparacaoUnidades, segregarProdutoFIFO, faixasFIFO)
  
  // 8. Classificar por transporte (por último para garantir ordem correta)
  const dataClassificada = classificarPorTransporte(dataComSeparacaoFIFO)
  
  return dataClassificada
} 