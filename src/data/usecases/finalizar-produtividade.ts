import { HttpClient, HttpStatusCode } from "../http";
import { UnexpectedError } from "@/domain/errors";
import {
  FinalizarProdutividade,
  FinalizarProdutividadeInfoParams,
} from "@/domain/finalizar-produtividade";

export class RemoteFinalizarProdutividade implements FinalizarProdutividade {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<boolean>
  ) {}

  async finalizarProdutividade(): Promise<boolean> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "put",
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as boolean;
      default:
        throw new UnexpectedError();
    }
  }
}
