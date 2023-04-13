export const messages = {
  requiredField: 'Campo obrigatório.',
  invalidEmail: 'E-mail inválido.',
  invalidCPF: 'CPF inválido.',
  invalidCNPJ: 'CNPJ inválido.',
  CNPJAlreadyExists: 'Este CNPJ já está cadastrado em nosso sistema.',
  invalidPhone: 'Telefone inválido.',
  invalidPassword: 'A senha digitada não está de acordo com as regras acima.',
  invalidPasswordConfirmation: 'O campo confirmação de senha deve ser igual ao campo senha.',

  successSave: 'Dados salvos com sucesso',
  errorUploadImage: 'Não foi possível realizar o upload da imagem para este registro, caso o erro persista, entre em contato com o suporte.',
  successDelete: 'Registro excluído com sucesso.',
  impossible: 'Não foi possível realizar a sua solicitação no momento.</br> Caso o erro persista, contate o suporte.',
  error: 'Não foi possível realizar a sua solicitação, contate o suporte',
  invalidTokenForgotPassword: 'Token de verificação inválido, por favor solicite uma nova troca de senha!',
  tokenForgotPasswordNotFound: 'Token de verificação não encontrado!',

  confirmDelete: 'Deseja excluir este registro ?',
  confirmDeleteUserChurch: 'Deseja remover o vínculo deste usuário com esta igreja ?',
  confirmGenerateNewPassword: 'Tem certeza que deseja gerar uma nova senha para este usuário ?',

  countField: value => `Este campo deve conter no mínimo ${value} caracteres.`,
}
