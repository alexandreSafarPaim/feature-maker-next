"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTemplate = generateTemplate;
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
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
async function generateTemplate(templateType, filePath, vars) {
    const template = templates[templateType];
    if (!template) {
        throw new Error(`Template ${templateType} não encontrado`);
    }
    // Substituir variáveis no template usando template strings
    const content = template.replace(/\$\{(\w+)\}/g, (match, varName) => {
        return vars[varName] || match;
    });
    // Garantir que o diretório existe
    await fs.ensureDir(path.dirname(filePath));
    // Escrever arquivo
    await fs.writeFile(filePath, content, 'utf8');
}
//# sourceMappingURL=templateGenerator.js.map