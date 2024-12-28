# Use a base mínima do Node.js com Alpine
FROM node:18-alpine

# Cria o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia apenas o package.json e o package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o código do aplicativo
COPY . .

# Exponha a porta da aplicação
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
