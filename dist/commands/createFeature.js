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
exports.createFeature = createFeature;
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const templateGenerator_1 = require("../utils/templateGenerator");
async function createFeature(featureName) {
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
    await (0, templateGenerator_1.generateTemplate)('page', path.join(basePath, '(pages)', 'page.tsx'), {
        featureName: normalizedName,
        componentName: toPascalCase(normalizedName)
    });
    await (0, templateGenerator_1.generateTemplate)('component', path.join(basePath, 'components', `${toPascalCase(normalizedName)}.tsx`), {
        featureName: normalizedName,
        componentName: toPascalCase(normalizedName)
    });
    await (0, templateGenerator_1.generateTemplate)('actions', path.join(basePath, 'actions', 'index.ts'), {
        featureName: normalizedName,
        componentName: toPascalCase(normalizedName)
    });
    // Criar arquivo index para components
    await (0, templateGenerator_1.generateTemplate)('componentIndex', path.join(basePath, 'components', 'index.ts'), {
        featureName: normalizedName,
        componentName: toPascalCase(normalizedName)
    });
}
function toPascalCase(str) {
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}
//# sourceMappingURL=createFeature.js.map