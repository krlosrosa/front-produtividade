import { RemoteGetProdutividadeByCenter } from "@/data/usecases/remote-get-produtividade-by-center";
import { GetProdutividade } from "@/domain/get-produtividade";
import { AuthorizeHttpClientDecorator } from "@/main/decorators/authorize-http-client-decorator";
import { makeApiUrl } from "@/main/factories/http/api-url-factory";
import { makeAxiosHttpClient } from "@/main/factories/http/axios-http-client-factory";

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
