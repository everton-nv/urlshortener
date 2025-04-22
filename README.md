Este projeto é um sistema de encurtamento de URLs construído com NestJS, TypeScript e PostgreSQL.

Pré-requisitos:
-Docker e Docker Compose instalados
-Node.js (versão 22 ou superior)
-npm


Clone o repositório:
git clone https://github.com/seu-usuario/url-shortener.git

Alterne para o diretório do repositório clonado: 
cd url-shortener

Adicione o arquivo .env já configurado a raíz do projeto

Execute o comando de instalação de dependências do projeto:
npm install

Execute o projeto para gerar a pasta dist:
npm run start:dev

Termine a execução:
CTRL + C

Com o docker e docker-compose devidamente instalados:
docker-compose up -d

Com esses passos a aplicação deverá ser levantada por completo dentro de um container já contendo o banco de dados.




Upcoming Changes:
Documentação pelo Swagger, Testes unitários, Melhoria no tratamento de exceções.


