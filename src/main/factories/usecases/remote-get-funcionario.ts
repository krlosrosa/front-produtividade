import { makeApiUrl } from "../http/api-url-factory";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";
import { AuthorizeHttpClientDecorator } from "@/main/decorators/authorize-http-client-decorator";
import { RemoteGetFuncionariosByCenter } from "@/data/usecases/remote-get-funcionario-by-center";
import { GetFuncionariosByCenter } from "@/domain/get-funcionarios-by-center";

export const makeRemoteGetFuncionario = (
  centerId: string,
  accessToken?: string
): GetFuncionariosByCenter =>
  new RemoteGetFuncionariosByCenter(
    makeApiUrl(`/buscarfuncionarios/${centerId}`),
    new AuthorizeHttpClientDecorator(makeAxiosHttpClient(), accessToken)
  );
