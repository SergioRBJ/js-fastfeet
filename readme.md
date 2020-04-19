# fastfeet

Aplicação completa desenvolvida usando ecossistema JavaScript para gerencia de encomendas.

* [Backend - Node.js](#backend---node.js)

## Backend - Node.js

### Funcionalidades

    * Criação de tabelas com migrations e seeds.
    * Criação de servidores de desenvolvimento com Docker.
    * Sistema de envio de e-mail.
    * Estilização e padronização do código com EditorConfig, ESLint e Prettier.
    * Background jobs com BeeQueue.
    * Autenticação JWT.
    * Entre outros pois certamente esqueci de algo :)

### Instalação de requisitos
1. [Node](https://nodejs.org/en/download/package-manager/) &rarr; recomendo a instalação via package manager.
2. [Yarn](https://yarnpkg.com/lang/en/)(opcional) &rarr; gerenciador de pacotes mais performático e intuitivo.
3. [Docker](https://www.docker.com/get-started)(opcional) &rarr; usado para a criação de ambientes isolados. Você pode usa-lo na criação dos servidores que usaremos para teste.

### Configuração dos servidores

Iremos configurar os servidores que usaremos nesta aplicação que são:

1. [Postgres](https://www.postgresql.org/) &rarr; armazenará os dados estruturados.
2. [MongoDB](https://www.mongodb.com) &rarr; armazenará os dados não estruturados e que necessitam ser performáticos.
3. [Redis](https://redis.io/) &rarr; armazenará os jobs que serão executados em background. Neste caso usaremos ele para armazenar os jobs de envio de e-mails.

Caso você não opte por usar o Docker para criação dos servidores(mongodb, redis, postgre) pule esta parte.

Para a criação dos servidores usaremos o docker compose, um recurso que nos ajuda na configuração e criação dos ambientes de uma só vez. Neste caso usaremos somente para uma melhor organização, já que não precisamos faze-los conversarem entre si.

Com o Docker iniciado, abra o prompt/terminal dentro da pasta ```backend``` e execute o comando abaixo:

```shell
    $ docker-compose up -d
```

Este comando irá criar as três imagens à partir do arquivo ```docker-compose.yml```.

### Variaveis de ambiente

Depois dos servidores configurados, crie seu arquivo ```.env``` na raiz pois temos que inserir as credenciais de alguns recursos como:

1. APP &rarr; Váriaveis da aplicação.
2. JWT &rarr; Váriavel do segredo usado para autenticação JWT.
3. DATABASE/MONGO/REDIS &rarr; Váriaveis dos servidores usados na aplicação(se você usou o docker compose abra o arquivo ```docker-compose.yml``` para extrair os valores).
4. MAIL &rarr; Váriaveis usadas para o sistema de envio de e-mail.

### Subindo a aplicação

> Próximos comandos deverão ser executados à partir da pasta ```backend```.

Instale os pacotes:
```shell
    $ yarn
```

Inicie a aplicação:
```shell
    $ yarn dev
```

Inicie a fila:
```shell
    $ yarn queue
```

### Criação das tabelas com migrations

Vamos criar todas as tabelas que usaremos usando sequelize:
```shell
    $ yarn sequelize db:migrate
```

Populando as tabelas com dados para teste:
```shell
    $ yarn sequelize db:seed:all
```
## Frontend - React

### Funcionalidades

    * Gerenciamento de estados globais com Redux.
    * Estilização de componentes com Styled Components.
    * Estilização e padronização do código com EditorConfig, ESLint e Prettier.

### Subindo a aplicação

> Próximos comandos deverão ser executados à partir da pasta ```web```.

Instale os pacotes:
```shell
    $ yarn
```

Inicie a aplicação:
```shell
    $ yarn dev
```

## Mobile - React Native

### Funcionalidades

    * Gerenciamento de estados globais com Redux.
    * Estilização de componentes com Styled Components.
    * Estilização e padronização do código com EditorConfig, ESLint e Prettier.
    * inserção de fotos com React Camera.
