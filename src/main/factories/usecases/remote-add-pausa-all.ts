import { makeApiUrl } from "../http/api-url-factory";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";
import { AuthorizeHttpClientDecorator } from "@/main/decorators/authorize-http-client-decorator";
import { AddPausaAll } from "@/domain/add-pausa-produtividadeAll";
import { RemoteAddPausaAll } from "@/data/usecases/remote-add-pausa-all";

export const makeRemoteAddPausaAll = (
  processo: "SEPARACAO" | "CARREGAMENTO",
  centerId: string,
  data: Date,
  accessToken?: string
): AddPausaAll =>
  new RemoteAddPausaAll(
    makeApiUrl(`/addpausaall/${centerId}/${processo}/${data}`),
    new AuthorizeHttpClientDecorator(makeAxiosHttpClient(), accessToken)
  );
