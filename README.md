# Gerenciamento de Solicitações de Compra
### ** Seja bem-vindo ao Gerenciador de Solicitações de Compra, uma solução para otimizar o processo de compras!**

## ✨ O que o Gerenciador oferece:

Facilidade de uso: Interface responsiva para todos os dispositivos envolvidos no processo de compra.
Transparência: Acompanhamento do status de cada solicitação em tempo real.
Controle total: Gerenciamento total das solicitações.

Visões de cada área da aplicação:

### 1. Área do Solicitante:

- Criação de novas solicitações de compra com a inserção do nome do solicitante, a descrição do item
  desejado e o valor;
- Acompanhamento do status da solicitação em tempo real.

### 2. Área do Almoxarife:

Visualização e analise das solicitações de compra pendentes;
Aprovação ou reprovação das solicitações;
Campo de descrição em caso de reprovação;
Controle total dos itens que estão sendo pedidos.

### 3. Área do Administrador:

- Visão geral de todas as solicitações de compra;
- Utilização de filtros para encontrar solicitações específicas;
- Analise do histórico de pedidos para controle total do processo de compras.
️ Configuração:

## 👩‍💻 Configurando o ambiente:

Execute o seguinte comando no terminal do projeto no back-end e front-end para baixar todas as
dependências do projeto: npm install

## 1. Back-end (API):

- Requisitos: Node.JS com frameworks express, sequelize (Método MVC).
- Configuração do banco de dados:
#### Edite o arquivo db.js e insira o nome do seu usuário para acessar o servidor do SQL Server em 'seu_nome',
#### sua respectiva senha em 'sua_senha' e a porta onde o servidor está ativo em 'sua_porta':

const database = new sequelize('PurchaseManagement', 'seu_usuario', 'sua_senha',{
    dialect: 'mssql', host: 'localhost', port: 'sua_porta'
});

#### Comando para encontrar a porta do SQL Server:

select distinct local_tcp_port
  from sys.dm_exec_connections
 where local_tcp_port is not null

#### Sobre a conexão com o banco de dados SQL Server

- Para realizar a conexão com o SQL SERVER, é necessário seguir os seguintes passos: Acessar o programa "Sql Server Configuration Manager" ->
  Configurações de Rede do SQl Server -> Protocolos para (nome do seu servidor) -> Habilitar a conexão TCP/IP.

#### * A API cria automaticamente a tabela de solicitações de compra, se necessário. *

#### No arquivo server.js, configurar a porta do front-end para não ter problemas de CORS.


## 2. Front-end:

Requisitos: Angular e Angular Material.
Conexão com a API:
Configure as URL's da API no arquivo request.service.ts

## ** Pronto para começar!**

Acesse os repositórios do Back-end (API) e do Front-end:
- Back-end: https://github.com/MatheusPiske/purchase_management_app/tree/main/RequestManagementApi
- Front-end: https://github.com/MatheusPiske/purchase_management_app/tree/main/RequestManagementApp
- *** Comece a gerenciar suas solicitações de compra! ***
️
## Dúvidas ou sugestões?

Entre em contato através do email: [matheus.piske14b@gmail.com]
** Obrigado pela atenção!**

Desenvolvido com ❤️ por [MatheusPiske].
