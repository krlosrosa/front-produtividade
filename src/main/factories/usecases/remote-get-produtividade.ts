import { RemoteGetProdutividadeByCenter } from "@/data/usecases/remote-get-produtividade-by-center";
import { GetProdutividade } from "@/domain/get-produtividade";
import { makeApiUrl } from "../http/api-url-factory";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";
import { AuthorizeHttpClientDecorator } from "@/main/decorators/authorize-http-client-decorator";

export const makeRemoteAddAccount = (
  centerId: string,
  dataRegistro: Date,
  processo: "SEPARACAO" | "CARREGAMENTO",
  accessToken?: string
): GetProdutividade =>
  new RemoteGetProdutividadeByCenter(
    makeApiUrl(`/listarprodutibidade/${centerId}/${dataRegistro}/${processo}`),
    new AuthorizeHttpClientDecorator(makeAxiosHttpClient(), accessToken)
  );
