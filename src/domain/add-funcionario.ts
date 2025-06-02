export interface CriarFunctionario {
  criarFuncionario: (params: CriarFunctionarioParams) => Promise<boolean>;
}

export type CriarFunctionarioParams = {
  id: string;
  name: string;
  centerId: string;
};
