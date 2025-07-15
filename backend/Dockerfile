# Usamos uma imagem do Node como base
FROM node:20-alpine

# Definimos o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiamos os arquivos de gerenciamento de pacotes
COPY package*.json ./

# Instalamos as dependências
RUN npm install

# --- A CORREÇÃO ESTÁ AQUI ---

# 1. Copiamos o schema do Prisma para dentro do contêiner
COPY prisma ./prisma

# 2. Geramos o cliente Prisma para que ele esteja pronto na imagem
RUN npx prisma generate

# ------------------------------

# Expomos a porta da API
EXPOSE 3001

# O comando padrão para iniciar o servidor de desenvolvimento com hot-reload
CMD ["npm", "run", "dev"]