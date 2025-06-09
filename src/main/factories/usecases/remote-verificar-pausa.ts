import { makeApiUrl } from "../http/api-url-factory";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";
import { AuthorizeHttpClientDecorator } from "@/main/decorators/authorize-http-client-decorator";
import { VerificarPausa } from "@/domain/verificar-pausa";
import { RemoteVerificarPausa } from "@/data/usecases/remote-verificar-pausa";

export const makeRemoteVerificarPausa = (
  processo: "SEPARACAO" | "CARREGAMENTO",
  centerId: string,
  data: Date,
  accessToken?: string
): VerificarPausa =>
  new RemoteVerificarPausa(
    makeApiUrl(`/statuspause/${centerId}/${processo}/${data}`),
    new AuthorizeHttpClientDecorator(makeAxiosHttpClient(), accessToken)
  );
