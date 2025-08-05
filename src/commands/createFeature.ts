import * as fs from 'fs-extra';
import * as path from 'path';
import { generateTemplate } from '../utils/templateGenerator';

export async function createFeature(featureName: string): Promise<void> {
  // Validar nome da feature
  if (!featureName || featureName.trim() === '') {
    throw new Error('Nome da feature é obrigatório');
  }

  // Normalizar nome da feature (kebab-case)
  const normalizedName = featureName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  
  // Caminho base da feature
  const basePath = path.join(process.cwd(), 'src', 'app', normalizedName);

  // Verificar se já existe
  if (await fs.pathExists(basePath)) {
    throw new Error(`Feature ${normalizedName} já existe`);
  }

  // Criar estrutura de diretórios
  const directories = [
    path.join(basePath, '(pages)'),
    path.join(basePath, 'components'),
    path.join(basePath, 'actions')
  ];

  for (const dir of directories) {
    await fs.ensureDir(dir);
  }

  // Gerar arquivos baseados nos templates
  await generateTemplate('page', path.join(basePath, '(pages)', 'page.tsx'), {
    featureName: normalizedName,
    componentName: toPascalCase(normalizedName)
  });

  await generateTemplate('component', path.join(basePath, 'components', `${toPascalCase(normalizedName)}.tsx`), {
    featureName: normalizedName,
    componentName: toPascalCase(normalizedName)
  });

  await generateTemplate('actions', path.join(basePath, 'actions', 'index.ts'), {
    featureName: normalizedName,
    componentName: toPascalCase(normalizedName)
  });

  // Criar arquivo index para components
  await generateTemplate('componentIndex', path.join(basePath, 'components', 'index.ts'), {
    featureName: normalizedName,
    componentName: toPascalCase(normalizedName)
  });
}

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}