import { makeApiUrl } from "../http/api-url-factory";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";
import { AuthorizeHttpClientDecorator } from "@/main/decorators/authorize-http-client-decorator";
import { AddProdutividade } from "@/domain/add-produtividade";
import { RemoteAddProdutividade } from "@/data/usecases/remote-add-produtividade";

export const makeRemoteAddProdutividade = (
  centerId: string,
  accessToken?: string
): AddProdutividade =>
  new RemoteAddProdutividade(
    makeApiUrl(`/addprodutividade/${centerId}`),
    new AuthorizeHttpClientDecorator(makeAxiosHttpClient(), accessToken)
  );
