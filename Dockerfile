# Use a base mínima do Node.js com Alpine
FROM node:18-alpine

# Cria o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia apenas o package.json e o package-lock.json
COPY package*.json ./

COPY . .
# Instala as dependências
RUN npm install

# Copia o código do aplicativo


# Exponha a porta da aplicação
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["node", "intelbras.js"]
