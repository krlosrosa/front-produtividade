import { AddPausaProdutividade } from "@/domain/add-pausa-produtividade";
import { HttpClient, HttpStatusCode } from "../http";
import { UnexpectedError } from "@/domain/errors";

export class RemoteAddPausaProdutividade implements AddPausaProdutividade {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<boolean>
  ) {}

  async addPausaProdutividade(): Promise<boolean> {
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
