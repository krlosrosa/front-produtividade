import { makeApiUrl } from "../http/api-url-factory";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";
import { AuthorizeHttpClientDecorator } from "@/main/decorators/authorize-http-client-decorator";
import { AddPausaAll } from "@/domain/add-pausa-produtividadeAll";
import { RemoteAddPausaAll } from "@/data/usecases/remote-add-pausa-all";
import { RemoteFinalizarPausaAll } from "@/data/usecases/remote-finalizar-pausa-all";
import { FinalizarPausaAll } from "@/domain/finalizar-pausa-all copy";

export const makeRemoteFinalizarPausaAll = (
  processo: "SEPARACAO" | "CARREGAMENTO",
  centerId: string,
  data: Date,
  accessToken?: string
): FinalizarPausaAll =>
  new RemoteFinalizarPausaAll(
    makeApiUrl(`/finalizarpausaall/${centerId}/${processo}/${data}`),
    new AuthorizeHttpClientDecorator(makeAxiosHttpClient(), accessToken)
  );
