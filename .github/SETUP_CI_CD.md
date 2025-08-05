# Setup CI/CD

Este projeto possui CI/CD automatizado via GitHub Actions.

## Configuração Necessária

### 1. NPM Token

Para publicar automaticamente no npm, você precisa configurar o `NPM_TOKEN`:

1. Acesse [npmjs.com](https://www.npmjs.com) e faça login
2. Vá em **Access Tokens** no seu perfil
3. Clique em **Generate New Token**
4. Escolha **Automation** (para CI/CD)
5. Copie o token gerado

### 2. Configurar Secret no GitHub

1. Vá para o repositório no GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Nome: `NPM_TOKEN`
5. Valor: Cole o token do npm
6. Clique em **Add secret**

## Como Funciona

### CI (Integração Contínua)
- Roda a cada push na branch `main`
- Roda a cada Pull Request
- Testa em Node.js 18 e 20
- Executa build e testes funcionais

### Release (Publicação)
- Roda quando uma nova tag é criada (ex: `v1.0.2`)
- Atualiza a versão no package.json
- Publica no npm automaticamente
- Cria release no GitHub com changelog

## Como Fazer uma Release

```bash
# 1. Atualizar versão no package.json
npm version patch  # ou minor, major

# 2. Criar e enviar tag
git push origin main --tags

# 3. O GitHub Actions fará o resto automaticamente!
```

## Comandos de Versionamento

```bash
npm version patch   # 1.0.1 → 1.0.2 (bugfix)
npm version minor   # 1.0.1 → 1.1.0 (feature)
npm version major   # 1.0.1 → 2.0.0 (breaking)
```

## Status dos Workflows

- ✅ **CI**: Testa código em cada push/PR
- ✅ **Release**: Publica automaticamente com tags
- ✅ **GitHub Releases**: Cria releases com changelog
- ✅ **NPM Provenance**: Segurança adicional na publicação