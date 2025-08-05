import * as fs from 'fs-extra';
import * as path from 'path';
import { generateTemplate } from '../utils/templateGenerator';

export async function createFeature(featureName: string): Promise<void> {
  // Validar nome da feature
  if (!featureName || featureName.trim() === '') {
    throw new Error('Nome da feature é obrigatório');
  }

  // Separar o caminho e o nome da feature
  const featurePath = featureName.split('/');
  const actualFeatureName = featurePath[featurePath.length - 1];
  
  // Normalizar cada parte do caminho
  const normalizedPath = featurePath.map(part => 
    part.toLowerCase().replace(/[^a-z0-9-]/g, '-')
  );
  
  // Caminho completo da feature
  const basePath = path.join(process.cwd(), 'src', 'app', ...normalizedPath);
  
  // Nome normalizado para uso em templates (só o último segmento)
  const normalizedName = normalizedPath[normalizedPath.length - 1];

  // Verificar se já existe
  if (await fs.pathExists(basePath)) {
    throw new Error(`Feature ${featureName} já existe`);
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