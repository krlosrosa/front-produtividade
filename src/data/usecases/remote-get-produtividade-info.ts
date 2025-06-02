import { HttpClient, HttpStatusCode } from "../http";
import { UnexpectedError } from "@/domain/errors";
import {
  GetProdutividadeInfo,
  GetProdutividadeInfoParams,
  GetProdutividadeInfoResult,
} from "@/domain/get-info-produtividade";

export class RemoteGetProdutividadeInfo implements GetProdutividadeInfo {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<GetProdutividadeInfoResult>
  ) {}

  async getProdutividadeInfo(
    params: GetProdutividadeInfoParams
  ): Promise<GetProdutividadeInfoResult> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as GetProdutividadeInfoResult;
      default:
        throw new UnexpectedError();
    }
  }
}
