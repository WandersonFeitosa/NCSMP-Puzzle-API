
<h1>NCSMP Puzzle API</h1>

  

<p  align="center">

<img  src="http://img.shields.io/static/v1?label=&message=Typescript&color=blue&style=for-the-badge"/>

<img  src="http://img.shields.io/static/v1?label=&message=Node&color=green&style=for-the-badge"/>

<img  src="http://img.shields.io/static/v1?label=&message=MongoDB&color=green&style=for-the-badge"/>

<img  src="https://camo.githubusercontent.com/e9d7e2ed0aacd9b22aed9e5a513b4f94c802f32bb86f8c7d4bd22faa6fb546dc/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f6c6162656c3d535441545553266d6573736167653d436f6e636c7569646f26636f6c6f723d737563657373267374796c653d666f722d7468652d6261646765"/>


</p>

  

### Tópicos

  

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)

  

:small_blue_diamond: [Funções da API](#funções-da-api)

  

:small_blue_diamond: [Tecnologias, plugins e libs](#tecnologias-plugins-e-libs-books)

  

## Descrição do projeto

  

<p  align="justify">

Api responsável por validar as senhas enviadas pelas páginas do enigma do  [servidor de minecraft NCSMP](https://discord.gg/JBRS4ahdX3), e gerenciar o progesso dos enigmas.

</p>

  

## Funções da API

A api possui algumas funções relacionadas ao controle das senhas enviadas pela  [página principal](https://ncsmp-puzzle.onrender.com) e também controlar o progesso do enigma seguindo as regras do sistema, dentre suas funções estão:
  
  
- Controle de senhas
	- Ao receber um "tryValue" através de um post com "Content-type: json" na rota /try verifica se a senha existe na database

- Controle de etapas
	- Antes de retornar a senha caso ela exista na database é verificado se a etapa está desbloquada
	- Caso a senha esteja correta e seja de uma etapa que está desbloqueada, a pessoa vança e desbloqueia a próxima fase

- Avisos
	- Quando uma fase é completada pela primeira vez é armazenado a data que a etapa foi completada.
	- A API é integrada com o [Kop](https://github.com/WandersonFeitosa/Kop) um bot de discord criado para o servidor NCSMP pelo mesmo autor desse projeto e quando uma etapa é completada pela primeira vez ele realiza anúncios no servidor
	- Algumas etapas do enigma também envolviam avisos do [Kop](https://github.com/WandersonFeitosa/Kop)
  



  

## Tecnologias, plugins e libs :books:

  

**Tecnologias JS:**

  

- Node - 18.x;

  

Dependências internas do projeto podem ser encontrada na raiz dentro do package.json, e podem ser instaladas através do seguinte comando

  

```
npm install
```
ou

```
yarn install
```


  É necessário configurar as variáveis de ambiente atráves de um arquivo .env na raiz do projeto, sendo essa variáveis:

```
MONGODB_URI=URI da database MongoDB

KOP_URL=Url de requests do bot
```
##

  

**_Projeto Concluído_**