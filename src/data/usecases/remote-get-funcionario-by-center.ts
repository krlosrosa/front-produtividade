import { HttpClient, HttpStatusCode } from "../http";
import { UnexpectedError } from "@/domain/errors";
import { GetFuncionariosByCenter, GetFuncionariosByCenterParams, GetFuncionariosByCenterResult } from "@/domain/get-funcionarios-by-center";

export class RemoteGetFuncionariosByCenter implements GetFuncionariosByCenter {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<GetFuncionariosByCenterResult[]>
  ) {}

  async getFuncionarios(
    params: GetFuncionariosByCenterParams
  ): Promise<GetFuncionariosByCenterResult[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as GetFuncionariosByCenterResult[];
      default:
        throw new UnexpectedError();
    }
  }
}
