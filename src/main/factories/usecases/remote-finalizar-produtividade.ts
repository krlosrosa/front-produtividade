import { makeApiUrl } from "../http/api-url-factory";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";
import { AuthorizeHttpClientDecorator } from "@/main/decorators/authorize-http-client-decorator";
import { RemoteFinalizarProdutividade } from "@/data/usecases/finalizar-produtividade";
import { FinalizarProdutividade } from "@/domain/finalizar-produtividade";

export const makeRemoteFinalizarProdutividade = (
  processo: "SEPARACAO" | "CARREGAMENTO",
  idPallet: string,
  transporte: string,
  accessToken?: string
): FinalizarProdutividade =>
  new RemoteFinalizarProdutividade(
    makeApiUrl(`/finalizardemanda/${processo}/${idPallet}/${transporte}`),
    new AuthorizeHttpClientDecorator(makeAxiosHttpClient(), accessToken)
  );
