# CRIANDO PROJETO FRONTEND _login_frontend__tailwind_rotas_

## INSTALANDO VITE
`npm create vite@4.4.0`

> Obs.: nao instalamos a ultima versao do vite pois estava dando problema ao rodar o comando `npm run dev`, o qual executamos para rodar o projeto apos instalarmos as dependencias com o comando abaixo.

### INSTALANDO AS DEPENDENCIAS
`npm install`

### RODANDO O PROJETO
`npm run dev`

## INSTALANDO TAILWINDCSS (TailwindCSS - Instalation - FramewordGuide - Vite)[https://tailwindcss.com/docs/installation/framework-guides]
`npm install -D tailwindcss postcss autoprefixer`

### INICIALIANDO O TAILWIND NO PROJETO
`npx tailwindcss init -p`
> Apos rodar esse comando, sao criados os arquivos *tailwind.config.js* e o *postcss.config.js*

Apos a criacao dos arquivos acima citados, substituimos o conteudo do arquivo *tailwind.config.js* pelo conteudo abaixo:
```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

e colocamos no arquivo *./src/index.css* as diretivas abaixo:
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## INSTALANDO O PACK DE ROTEAMENTO - (REACT ROUTER DOM)[https://reactrouter.com/en/main/start/tutorial]
`npm install react-router-dom`

## INSTALANDO AXIOS
`npm install axios`

# INSTALANDO O CORS NO BACKEND PARA QUE O FRONTEND POSSA ACESSA-LO
`npm install cors`


***
# ERRROS E SOLUCOES

## RUNNING THE COMMAND TO CREATE DE PROJECT
`npm create vite@latest`
> Erro quando executa o vite: "Error: Cannot find module @rollup/rollup-win32-x64-msvc."
> Solucao: criar o projeto novamente com uma outra versao do vite
`npm create vite@4.4.0`

## QUANDO OCORRER ERROR "Failed to load PostCSS config: Failed to load PostCSS config" apos fazer um "git pull .." ou copia do projeto, rode novamente os comandos baixo:
```
npm install
npx tailwind init -p
```
>Obs.: Apos isto, voltou a funcionar normalmente.

***