# **API RESTful** para a empresa **Pagar.me**
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/neliocursos/exemplo-readme/blob/main/LICENSE) 

# Autor

Cauã Soares

https://www.linkedin.com/in/ocauasoares/

# Sobre o projeto

## Hospedado/Deploy no Render:
https://api-restful-pagarme.onrender.com/ <br>

## Imagem da API no Dockher Hub:
https://hub.docker.com/repository/docker/ocsoares/api-restful-pagarme <br>

**ATENÇÃO:** Caso o link do Deploy não tenha acesso em um determinado período de tempo, ele ficará offline até que tenha algum acesso novamente. Então, caso o link demore a carregar, é completamente normal e basta esperar para utilizá-lo.

O projeto, resumidamente, consiste em uma **API RESTful** para transações bancárias desenvolvida para a empresa **Pagar.me**, baseada no **desafio** de back end fornecido pela própria empresa no repositório: https://github.com/pagarme/vagas/blob/master/desafios/software-engineer-backend/README.md

## Características e funcionalidades do projeto:
- API documentada com a ferramenta **Swagger** (na rota /api/docs)
- API desenvolvida com **Logs**
- API desenvolvida com **Testes Automatizados**
- Rotas de *registro e login*
- Na rota de *login*, se sucedido, será fornecido um **JWT** para utilizar nas rotas **protegidas**
- Rotas de transações bancárias **protegidas** com um **middleware** de *autenticação* baseado no esquema de autenticação HTTP Bearer Authentication. Será necessário inserir o **JWT** fornecido no login para acessar essas rotas
- **Taxas específicas** para transações feitas com cartão de crédito ou de débito
- Quando a transação for realizada com sucesso, será gerado um **comprovante** com *informações* da transação específicas para cartão de crédito ou de débito.

## Documentação no Swagger
![Documentação no Swagger](https://raw.githubusercontent.com/ocsoares/API-RESTful-Pagarme/master/assets/docs-api-pagarme.jpg)

## Testes Automatizados
![Testes Automatizados](https://raw.githubusercontent.com/ocsoares/API-RESTful-Pagarme/master/assets/tests-api-pagarme.jpg)

![Testes Automatizados2](https://raw.githubusercontent.com/ocsoares/API-RESTful-Pagarme/master/assets/tests2-api-pagarme.jpg)

# Tecnologias e Bibliotecas utilizadas
- Typescript
- Nodejs
- Express
- cors
- Atlas Database (Mongoose)
- JWT
- Bcrypt
- Morgan
- Winston
- Jest
- Supertest