import { makeApiUrl } from "../http/api-url-factory";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";
import { AuthorizeHttpClientDecorator } from "@/main/decorators/authorize-http-client-decorator";
import { ResetSenha } from "@/domain/reset-senha";
import { RemoteResetSenha } from "@/data/usecases/remote-reset-senha";

export const makeResetSenha = (accessToken?: string): ResetSenha =>
  new RemoteResetSenha(
    makeApiUrl(`/resetsenha`),
    new AuthorizeHttpClientDecorator(makeAxiosHttpClient(), accessToken)
  );
