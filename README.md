# GitHub Search

Uma aplicação web  para buscar usuários do GitHub e visualizar seus perfis e repositórios.

## 🎯 Funcionalidades

- **Busca de Usuários** — Pesquise por usuários do GitHub com interface responsiva
- **Perfil de Usuário** — Visualize informações do perfil (avatar, bio, localização, empresa)
- **Repositórios** — Lista completa de repositórios com scroll infinito (10 itens por página)
- **Filtros e Ordenação** — Ordene repositórios por atualização, criação, push ou alfabeticamente
- **Links Externos** — Acesso direto ao site e Twitter do usuário
- **Internacionalização** — Suporte para Português e Inglês
- **Design Responsivo** — Otimizado para desktop e mobile

## 🛠️ Tech Stack

- **React 19.2.4** — Framework UI
- **TypeScript 5.9.3** — Type safety
- **Chakra UI v2** — Componentes e sistema de design responsivo
- **React Router v7** — Roteamento
- **i18next** — Internacionalização (pt/en)
- **Zod** — Validação de esquemas
- **Axios** — Cliente HTTP
- **Vite 8.0.1** — Build tool

##  Como Rodar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173` no seu navegador.



## 📁 Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
│   ├── Header/       # Cabeçalho com busca
│   ├── LanguageToggle/
│   └── RepoCard/     # Card de repositório
├── pages/            # Páginas principais
│   ├── home/         # Página de busca
│   └── profile/      # Página de perfil
├── services/         # Integração com APIs
│   └── github.ts     # Cliente GitHub API
├── schemas/          # Validação com Zod
├── i18n/             # Internacionalização
├── styles/           # Temas e estilos
└── assets/           # Recursos estáticos
```

## 🌍 Rotas

- `/home` — Página inicial com busca de usuários
- `/profile/:username` — Perfil do usuário e repositórios