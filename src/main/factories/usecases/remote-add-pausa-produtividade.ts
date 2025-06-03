import { makeApiUrl } from "../http/api-url-factory";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";
import { AuthorizeHttpClientDecorator } from "@/main/decorators/authorize-http-client-decorator";
import { RemoteAddPausaProdutividade } from "@/data/usecases/remote-add-pausa-produtividade";
import { AddPausaProdutividade } from "@/domain/add-pausa-produtividade";

export const makeRemoteAddPausaProdutividade = (
  id: number,
  accessToken?: string
): AddPausaProdutividade =>
  new RemoteAddPausaProdutividade(
    makeApiUrl(`/adicionarpausa/${id}`),
    new AuthorizeHttpClientDecorator(makeAxiosHttpClient(), accessToken)
  );
