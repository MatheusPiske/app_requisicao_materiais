# app_requisicao_materiais
Aplicação Web dedicada ao gerenciamento de solicitações de compra por diferentes setores administrativos

## Para configuração da API

- Baixar todos os packages utilizados: express, mssql, sequelize (npm i nome_package)

- Para realizar a conexão com o SQL SERVER, é necessário seguir os seguintes passos: Acessar o programa "Sql Server Configuration Manager" -> Configurações de Rede do SQl Server -> Protocolos para (nome do seu servidor) -> Habilitar a conexão TCP/IP. 

- Para descobrir a porta de execução do Sql Server, execute o seguinte comando dentro do seu servidor do Sql Server:

select distinct local_tcp_port
  from sys.dm_exec_connections
 where local_tcp_port is not null

- Para criação do projeto em Angular: 

ng new management_app (css selecionado para estilização)
ng serve -o (executar a aplicação na máquina e abrir o browser)

- Para tratar o campo de dinheiro

npm install ngx-currency

- No arquivo server.js, configurar a porta do front-end para não ter problemas de CORS