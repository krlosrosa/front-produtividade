import { HttpClient, HttpStatusCode } from "../http";
import { UnexpectedError } from "@/domain/errors";
import { AddPausaAll } from "@/domain/add-pausa-produtividadeAll";

export class RemoteAddPausaAll implements AddPausaAll {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<boolean>
  ) {}

  async addPausaAll(): Promise<boolean> {
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
