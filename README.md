# Feature Maker Next

CLI para gerar features no Next.js com estrutura padrão.

## Instalação

```bash
npm install -g feature-maker-next
```

Ou instale localmente e use via npx:

```bash
npm install feature-maker-next
npx feature-maker-next nome-da-feature
```

## Uso

```bash
feature-maker-next nome-da-feature
```

Isso criará a seguinte estrutura dentro de `src/app/nome-da-feature/`:

```
src/app/nome-da-feature/
├── (pages)/
│   └── page.tsx          # Página principal da feature
├── components/
│   ├── index.ts          # Barrel export
│   └── NomeDaFeature.tsx # Componente principal
└── actions/
    └── index.ts          # Server actions
```

## Estrutura Gerada

### Page (src/app/nome-da-feature/(pages)/page.tsx)
- Página principal da feature usando App Router do Next.js
- Importa e renderiza o componente principal

### Components (src/app/nome-da-feature/components/)
- Componente principal da feature
- Arquivo index.ts para barrel exports
- Estrutura preparada para Tailwind CSS

### Actions (src/app/nome-da-feature/actions/index.ts)
- Server Actions prontos para CRUD
- Funções: get, create, update, delete

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Compilar TypeScript
npm run build

# Modo desenvolvimento (watch)
npm run dev

# Testar localmente
npm link
feature-maker-next test-feature
```

## Exemplo

```bash
make-feature user-profile
```

Cria:
- `src/app/user-profile/(pages)/page.tsx`
- `src/app/user-profile/components/UserProfile.tsx`
- `src/app/user-profile/components/index.ts`
- `src/app/user-profile/actions/index.ts`