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
                                $ref: "#/components/schemas/Register"
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
                                    $ref: '#/components/schemas/CreatedAccount'
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
                                        username: 'Hugo Pereira',
                                        password: 'hugo123'
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
        },
        "/api/transaction": {
            post: {
                summary: 'Fazer uma transação bancária',
                description: 'Rota para realizar transações bancárias',
                tags: ['Transaction'],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/TransactionBody'
                            }
                        }
                    }
                },
                responses: {
                    400: {
                        description: 'Preencha corretamente o body'
                    },
                    401: {
                        description: 'Token inválido ou expirado !'
                    },
                    202: {
                        description: 'Transaction done !',
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/TransactionBody'
                                }
                            }
                        }
                    }
                }
            },
            get: {
                summary: 'Mostrar todas as transações feitas',
                description: 'Rota para mostrar todas as transações feitas em uma conta',
                tags: ['Transaction'],
                security: [{ bearerAuth: [] }],
                responses: {
                    401: {
                        description: 'Token inválido ou expirado !'
                    },
                    200: {
                        description: 'Your transactions have been found !',
                        content: {
                            "application/json": {
                                schema: {
                                    properties: {
                                        message: {
                                            type: 'string',
                                            default: 'Your transactions have been found !'
                                        },
                                        transactions: {
                                            type: 'array',
                                            items: {
                                                $ref: '#/components/schemas/TransactionInformation'
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
        "/api/transaction/credit-card": {
            get: {
                summary: 'Mostrar todas as transações feitas com o cartão de crédito',
                description: 'Rota para mostrar todas as transações feitas com o cartão de crédito em uma conta',
                tags: ['Transaction'],
                security: [{ bearerAuth: [] }],
                responses: {
                    401: {
                        description: 'Token inválido ou expirado !'
                    },
                    200: {
                        description: 'Your credit card transactions have been found !',
                        content: {
                            "application/json": {
                                schema: {
                                    properties: {
                                        message: {
                                            type: 'string',
                                            default: 'Your credit card transactions have been found !'
                                        },
                                        transactions: {
                                            type: 'array',
                                            items: {
                                                $ref: '#/components/schemas/CreditCardTransactionInformation'
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
        "/api/transaction/debit-card": {
            get: {
                summary: 'Mostrar todas as transações feitas com o cartão de débito',
                description: 'Rota para mostrar todas as transações feitas com o cartão de débito em uma conta',
                tags: ['Transaction'],
                security: [{ bearerAuth: [] }],
                responses: {
                    401: {
                        description: 'Token inválido ou expirado !'
                    },
                    200: {
                        description: 'Your debit card transactions have been found !',
                        content: {
                            "application/json": {
                                schema: {
                                    properties: {
                                        message: {
                                            type: 'string',
                                            default: 'Your debit card transactions have been found !'
                                        },
                                        transactions: {
                                            type: 'array',
                                            items: {
                                                $ref: '#/components/schemas/DebitCardTransactionInformation'
                                            }
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
            Register: {
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
            CreatedAccount: {
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
            },
            TransactionBody: {
                type: 'object',
                properties: {
                    transfer_amount: {
                        type: 'number'
                    },
                    description: {
                        type: 'string'
                    },
                    payment_method: {
                        type: 'string',
                        description: 'credit_card or debit_card'
                    },
                    card_number: {
                        type: 'string'
                    },
                    card_holder: {
                        type: 'string'
                    },
                    card_expiration_date: {
                        type: 'string'
                    },
                    cvv: {
                        type: 'number'
                    }
                }
            },
            TransactionDone: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        default: 'Transaction done !'
                    },
                    new_transfer: {
                        type: 'object',
                        properties: {
                            transfer_amount: {
                                type: 'number'
                            },
                            transfer_date: {
                                type: 'string'
                            },
                            description: {
                                type: 'string'
                            },
                            payment_method: {
                                type: 'string',
                                description: 'credit_card or debit_card'
                            },
                            card_number: {
                                type: 'string'
                            },
                            card_holder: {
                                type: 'string'
                            },
                            card_expiration_date: {
                                type: 'string'
                            }
                        }
                    }
                }
            },
            TransactionInformation: {
                type: 'object',
                properties: {
                    transfer_amount: {
                        type: 'number'
                    },
                    payment_date: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    },
                    status: {
                        type: 'string',
                        description: 'paid or waiting_funds'
                    }
                }
            },
            CreditCardTransactionInformation: {
                type: 'object',
                properties: {
                    transfer_amount: {
                        type: 'number'
                    },
                    payment_date: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    },
                    status: {
                        type: 'string',
                        default: 'waiting_funds'
                    }
                }
            },
            DebitCardTransactionInformation: {
                type: 'object',
                properties: {
                    transfer_amount: {
                        type: 'number'
                    },
                    payment_date: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    },
                    status: {
                        type: 'string',
                        default: 'paid'
                    }
                }
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    }
};