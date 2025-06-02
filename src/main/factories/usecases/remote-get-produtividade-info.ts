import { makeApiUrl } from "../http/api-url-factory";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";
import { AuthorizeHttpClientDecorator } from "@/main/decorators/authorize-http-client-decorator";
import { RemoteGetProdutividadeInfo } from "@/data/usecases/remote-get-produtividade-info";
import { GetProdutividadeInfo } from "@/domain/get-info-produtividade";

export const makeRemoteGetProdutividadeInfo = (
  processo: "SEPARACAO" | "CARREGAMENTO",
  idPallet: string,
  transporte: string,
  accessToken?: string
): GetProdutividadeInfo =>
  new RemoteGetProdutividadeInfo(
    makeApiUrl(`/buscardemanda/${processo}/${idPallet}/${transporte}`),
    new AuthorizeHttpClientDecorator(makeAxiosHttpClient(), accessToken)
  );
