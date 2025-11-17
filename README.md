# Sistema de Biblioteca - Frontend

Aplicação web para gerenciamento de biblioteca desenvolvida com Angular.

## Tecnologias

- Angular 20.3
- PrimeNG 20.3
- TypeScript 5.9
- RxJS 7.8
- SCSS
- Nginx (produção)
- Docker & Docker Compose

## Como executar

### Pré-requisitos

- Docker e Docker Compose instalados

### Subindo o projeto

1. Clone o repositório
2. Copie o arquivo de variáveis de ambiente:
```bash
cp .env.example .env
```

3. Execute o Docker Compose:
```bash
docker compose up -d --build
```

A aplicação estará disponível em [http://localhost](http://localhost).

## Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `APP_EXTERNAL_PORT` | Porta externa da aplicação | `80` |

## Desenvolvimento Local

Para executar em modo de desenvolvimento (sem Docker):

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm start
```

A aplicação estará disponível em [http://localhost:4200](http://localhost:4200).

### Scripts disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm test` - Executa os testes
- `npm run lint` - Executa o linter
- `npm run lint:fix` - Corrige problemas de lint automaticamente
- `npm run format` - Formata o código com Prettier

## Bibliotecas Principais

- **PrimeNG**: Biblioteca de componentes UI
- **PrimeIcons**: Ícones do PrimeNG
- **ngx-mask**: Máscaras de input
- **RxJS**: Programação reativa

## Build para Produção

O projeto utiliza **multi-stage build** com Docker:

1. **Stage 1**: Build da aplicação Angular com Node.js
2. **Stage 2**: Serve os arquivos estáticos com Nginx

Isso resulta em uma imagem final otimizada e leve.

## Configuração do Nginx

O Nginx está configurado com:
- Suporte a rotas do Angular (HTML5 mode)
- Compressão gzip
- Cache de arquivos estáticos
- Headers de segurança

## Integração com Backend

Por padrão, a aplicação se conecta ao backend através da configuração em `src/environments/`.

Para desenvolvimento local, configure a URL da API em `src/environments/environment.ts`:

```typescript
export const environment = {
    production: false,

    app: {
        name: 'Sistema de Gerenciamento de Biblioteca',
    },

    api: {
        backend: 'http://localhost:8080',
    },
};
```

## Perfis de Build

- **development**: Build rápido com source maps e sem otimizações
- **production** (padrão): Build otimizado com minificação e tree-shaking

## Healthcheck

A aplicação responde em qualquer rota configurada no Angular Router.

## Convenções de Código

O projeto utiliza:
- **ESLint**: Para análise de código
- **Prettier**: Para formatação automática
- **Angular Style Guide**: Convenções oficiais do Angular
