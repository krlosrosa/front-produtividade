import { HttpClient, HttpStatusCode } from "../http";
import { UnexpectedError } from "@/domain/errors";
import {
  CriarFunctionario,
  CriarFunctionarioParams,
} from "@/domain/add-funcionario";

export class RemoteAddFuncionario implements CriarFunctionario {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<boolean>
  ) {}

  async criarFuncionario(params: CriarFunctionarioParams): Promise<boolean> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as boolean;
      default:
        throw new UnexpectedError();
    }
  }
}
