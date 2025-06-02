import { HttpClient, HttpStatusCode } from "../http";
import { UnexpectedError } from "@/domain/errors";
import {
  GetProdutividade,
  GetProdutividadeParams,
  GetProdutividadeResult,
} from "@/domain/get-produtividade";

export class RemoteGetProdutividadeByCenter implements GetProdutividade {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<GetProdutividadeResult[]>
  ) {}

  async getProdutividade(
    params: GetProdutividadeParams
  ): Promise<GetProdutividadeResult[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as GetProdutividadeResult[];
      default:
        throw new UnexpectedError();
    }
  }
}
