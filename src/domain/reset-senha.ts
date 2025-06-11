export interface ResetSenha {
  resetSenha: (params: ResetSenhaParams) => Promise<boolean>;
}

export type ResetSenhaParams = {
  newPassword: string;
};
