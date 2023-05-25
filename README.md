# mercat-react-native
A personal project to pratice ReactNative and personal usage. The application came from a personal need, organization and visualization of purchase expenses in the month, giving a view of purchases and comparing them with a historical.

> Taking advantage of the aforementioned need with the ambition to learn a new technology, I created this project

# Technologies

- ReactNative
- TypeScript
- Firebase Auth
- Firebase Cloud Firestore
- Firebase Distribuition

## Features

- Autenticação
  - Tela de login
  - Tela de Cadastro
  - Mantendo sessão com usuario autenticado
  - Login com google
  - Login com email e senha
- Estabelecimento
  - Cadastrar novo estabelecimento
  - Vinculando estabelecimento com usuario e com sessão do usuario
- Sessão
  - Logica para manter sessão por usuario
  - Criar nova sessão

> Uma Sessão é uma "Compra atual" onde vai ser mantida o carrinho do usuario. O usuario vai ter essa sessão até concluir sua compra.    

## Architecure

Foi definida a clean architecure como arquitetura principal do projeto, dentro da camada de `presentation` vai ser usada a arquitetura MVC entre a  `page ` e as regras de negocio `controller` 

Foram usados os seguintes `patterns` e praticas:

- Observer
  - Para _flow_ entre a page e o `controller `criei uma estrutura de `observer `para haver essa comunicação
- Uistate
  - Criei um objeto que será sempre emitido do `controller ` para suas respectivas `pages`, onde  esse vai conter os estados padrão de uma page
- Resource
  - Criei um padrão  que sera emitido entre as diferentes camadas da aplicação, onde esse `sera` recebido dentro da `repository` passado para o `usecase` e por fim para o `controller`
