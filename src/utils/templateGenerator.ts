import * as fs from 'fs-extra';
import * as path from 'path';

interface TemplateVars {
  featureName: string;
  componentName: string;
}

const templates = {
  page: `import { \${componentName} } from '../components';

export default function \${componentName}Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <\${componentName} />
    </div>
  );
}`,

  component: `interface \${componentName}Props {
  // Adicione suas props aqui
}

export function \${componentName}({}: \${componentName}Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">\${componentName}</h1>
      <p>Componente da feature \${featureName} criado com sucesso!</p>
    </div>
  );
}`,

  actions: `'use server';

// Actions para a feature \${featureName}

export async function get\${componentName}Data() {
  // Implementar lógica de busca de dados
  return {
    message: 'Dados da feature \${featureName}'
  };
}

export async function create\${componentName}(data: any) {
  // Implementar lógica de criação
  return {
    success: true,
    data
  };
}

export async function update\${componentName}(id: string, data: any) {
  // Implementar lógica de atualização
  return {
    success: true,
    id,
    data
  };
}

export async function delete\${componentName}(id: string) {
  // Implementar lógica de exclusão
  return {
    success: true,
    id
  };
}`,

  componentIndex: `export { \${componentName} } from './\${componentName}';`
};

export async function generateTemplate(
  templateType: keyof typeof templates,
  filePath: string,
  vars: TemplateVars
): Promise<void> {
  const template = templates[templateType];
  
  if (!template) {
    throw new Error(`Template ${templateType} não encontrado`);
  }

  // Substituir variáveis no template usando template strings
  const content = template.replace(/\$\{(\w+)\}/g, (match, varName) => {
    return vars[varName as keyof TemplateVars] || match;
  });

  // Garantir que o diretório existe
  await fs.ensureDir(path.dirname(filePath));
  
  // Escrever arquivo
  await fs.writeFile(filePath, content, 'utf8');
}