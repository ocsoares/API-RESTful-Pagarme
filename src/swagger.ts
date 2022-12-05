import { OpenAPIV3 } from 'openapi-types';

export const swaggerJSON: OpenAPIV3.Document = {
    openapi: '3.0.0',

    info: {
        version: '1.0.0',
        title: 'API RESTful para a empresa Pagar.me',
        description: 'Essa API foi desenvolvida baseado no desafio de backend da empresa Pagar.me',
        // termsOfService: 'Rota dos termos...',
        contact: {
            email: 'caua_soares016@hotmail.com'
        }
    },

    paths: {
        "/api/auth/register": {
            post: {
                summary: 'Cadastrar conta',
                description: 'Rota para o cadastro de contas para que consiga gerar um token válido',
                tags: ['Authentication'],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/RegisterSchema"
                            },
                            examples: {
                                register: {
                                    value: {
                                        username: 'Hugo Pereira',
                                        password: 'hugo123',
                                        confirm_password: 'hugo123'
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    400: {
                        description: 'Já existe um usuário registrado com esse username !, As senhas não coincidem !'
                    },
                    201: {
                        description: 'Account created successfully !',
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/CreatedAccountSchema'
                                }
                            }
                        }
                    }
                }
            },
        },
        "/api/auth/login": {
            post: {
                summary: 'Logar na conta',
                description: 'Rota para o login de contas para conseguir o acesso a um token válido',
                tags: ['Authentication'],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                properties: {
                                    username: {
                                        type: 'string'
                                    },
                                    password: {
                                        type: 'string'
                                    }
                                }
                            },
                            examples: {
                                login: {
                                    value: {
                                        username: 'Pedro',
                                        password: 'pedro12'
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    400: {
                        description: 'Username ou password inválido !'
                    },
                    200: {
                        description: 'Authenticated !',
                        content: {
                            "application/json": {
                                schema: {
                                    properties: {
                                        message: {
                                            type: 'string'
                                        },
                                        token: {
                                            type: 'string',
                                            description: 'Token to use in authenticated routes !'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            RegisterSchema: {
                type: 'object',
                properties: {
                    username: {
                        type: 'string'
                    },
                    password: {
                        type: 'string'
                    },
                    confirm_password: {
                        type: 'string'
                    }
                }
            },
            CreatedAccountSchema: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    },
                    accountCreated: {
                        type: 'object',
                        properties: {
                            username: {
                                type: 'string'
                            },
                            password: {
                                type: 'string',
                                description: 'Hashed password !'
                            }
                        }
                    }
                }
            }
        }
    }
};