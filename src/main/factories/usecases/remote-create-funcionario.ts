import { makeApiUrl } from "../http/api-url-factory";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";
import { AuthorizeHttpClientDecorator } from "@/main/decorators/authorize-http-client-decorator";
import { RemoteAddFuncionario } from "@/data/usecases/remote-add-funcionario";
import { CriarFunctionario } from "@/domain/add-funcionario";

export const makeCreateFuncionario = (
  accessToken?: string
): CriarFunctionario =>
  new RemoteAddFuncionario(
    makeApiUrl(`/criarfuncionario`),
    new AuthorizeHttpClientDecorator(makeAxiosHttpClient(), accessToken)
  );
