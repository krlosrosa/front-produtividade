import { VerificarPausa } from "@/domain/verificar-pausa";
import { HttpClient, HttpStatusCode } from "../http";
import { UnexpectedError } from "@/domain/errors";

export class RemoteVerificarPausa implements VerificarPausa {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<boolean>
  ) {}

  async verificarPausa(): Promise<boolean> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as boolean;
      default:
        throw new UnexpectedError();
    }
  }
}
