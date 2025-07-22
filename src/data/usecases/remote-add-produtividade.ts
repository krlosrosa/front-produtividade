import { AddProdutividade, AddProdutividadeParams } from "@/domain/add-produtividade"
import { HttpClient, HttpStatusCode } from "../http"
import { UnexpectedError } from "@/domain/errors"


export class RemoteAddProdutividade implements AddProdutividade{
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<boolean>
  ) {}

  

  async addProdutividade (params: AddProdutividadeParams): Promise<boolean> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body as boolean
      default: throw new UnexpectedError()
    }
  }
}
