Controle de Ponto - Desafio Ilumeo

Aplicação Fullstack de controle de ponto com backend em Node.js e frontend em React, totalmente containerizada com Docker.

Tecnologias Principais: React, Node.js, TypeScript, PostgreSQL, Docker, Prisma, Express, Vite.

-----------------------------------
Como Executar o Projeto
-----------------------------------

Este projeto é 100% containerizado. Tudo que você precisa para rodá-lo é o Docker.

Pré-requisitos:
- Docker
- Docker Compose
- Git

Passos para Execução:

1. Clone o repositório:
```
git clone https://github.com/gabrielcardn/clock-in-out.git
```

2. Entre na pasta do projeto:
```
cd ilumeo
```

3. Construa as imagens e inicie os contêineres:
Este comando irá construir as imagens para o frontend e o backend e iniciar todos os serviços (Frontend, Backend e Banco de Dados) em background.
```
docker-compose up --build -d
```

4. Popule o banco de dados com dados iniciais:
Para ter usuários e códigos para testar, execute o seguinte comando. Ele roda o script "seed" dentro do contêiner do backend para criar usuários de exemplo.
```
docker-compose exec backend-api npx prisma db seed
```

-----------------------------------
Acessando a Aplicação
-----------------------------------

Após os passos acima, a aplicação estará pronta para ser acessada:

- Aplicação Frontend: http://localhost:3000
- API Backend: http://localhost:3001

-----------------------------------
Dados para Login (Códigos de Teste)
-----------------------------------

Use um dos seguintes códigos na tela de login para acessar o dashboard de um colaborador:

- 123456 (Alice Silva)

-----------------------------------
Comandos Úteis
-----------------------------------

- Verificar status dos contêineres: docker-compose ps
- Ver logs em tempo real: docker-compose logs -f
- Parar e remover os contêineres: docker-compose down