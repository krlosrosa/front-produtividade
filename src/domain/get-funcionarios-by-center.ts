export interface GetFuncionariosByCenter {
  getFuncionarios: (
    params: GetFuncionariosByCenterParams
  ) => Promise<GetFuncionariosByCenterResult[]>;
}

export type GetFuncionariosByCenterParams = {
  centerId: string;
};

export type GetFuncionariosByCenterResult = {
  id: string;
  name: string;
  centerId: string;
};
