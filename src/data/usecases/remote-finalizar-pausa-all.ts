import { FinalizarPausaAll } from "@/domain/finalizar-pausa-all copy";
import { HttpClient, HttpStatusCode } from "../http";
import { UnexpectedError } from "@/domain/errors";

export class RemoteFinalizarPausaAll implements FinalizarPausaAll {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<boolean>
  ) {}

  async finalizarPausaAll(): Promise<boolean> {
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
