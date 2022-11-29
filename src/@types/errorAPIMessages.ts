export type BadRequestErrorMessages =
    'Preencha os campos corretamente !' |
    'As senhas não coincidem !' |
    'Já existe um usuário registrado com esse username !' |
    'Username ou password inválido !' |
    'Insira um token válido no authorization !';

export type UnauthorizedErrorMessages =
    'Token inválido ou expirado !';