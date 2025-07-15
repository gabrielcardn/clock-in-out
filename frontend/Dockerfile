# Usamos uma imagem do Node como base
FROM node:20-alpine

# Definimos o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiamos os arquivos de gerenciamento de pacotes
# Isso otimiza o cache do Docker, para não reinstalar tudo a cada build
COPY package*.json ./

# Instalamos as dependências
RUN npm install

# O código fonte será montado através de um volume no docker-compose.
# Não precisamos copiar aqui.

# Expomos a porta padrão do Vite
EXPOSE 3000

# O comando padrão para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]