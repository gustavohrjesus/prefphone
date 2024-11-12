# PREFPHONE

# INSTALACOES DE PACOTES NO PROJETO

## NODE
`npm init -y`

## EXPRESS
`npm install express`

### Sobre importar o EXPRESS usando o comando "import"
> Eh necessario inserir no arquivo "package.json" a informacao abaixo (pode-se inserir apos o main, conforme abaixo):
```
    ...
    "main": "index.js",
    "type": "module",
    ...
```

## NODEMON 
Como a versao do Node instalada no nosso equipamento eh antiga, o comando '--watch' do Node nao funcionara. Desta forma, ainda faremos uso do Nodemon, o instalando conforme abaixo:
`npm add nodemon`
### Ao tentar executar o comando 'nodemon server.js', no terminal bash, obtivemos o erro: 'bash: nodemon: command not found'
Como solucao, para rodar o nodemon, utilizamos o comando abaixo, que chama o nodemon dentro do script npm
`npx nodemon server.js`

## INSTALAÇÃO DA BIBLIOTECA __dotenv__ QUE SERVE PARA TERMOS UM ARQUIVO DE CONFIGURAÇÃO DA NOSSA MÁQUINA, INDICA AS CHAVES DE API, DOMINIOS DE BANCOS DE DADOS (USUARIOS, BD). O ARQUIVO *NÃO É VERSIONADO*
`npm install dotenv`

## MYSQL
`npm add mysql`

# INSTALANDO O CORS NO BACKEND PARA QUE O FRONTEND POSSA ACESSA-LO
`npm install cors`

## BCRYPT
`npm install bcrypt`

## JWT - JSON WEB TOKEN
`npm install jsonwebtoken`
***

# ---- AINDA FALTAM INSTALAR AS LIBS ABAIXO