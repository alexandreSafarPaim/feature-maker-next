"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const createFeature_1 = require("./commands/createFeature");
const program = new commander_1.Command();
program
    .name('feature-maker-next')
    .description('CLI para gerar features no Next.js com estrutura padrão')
    .version('1.0.2');
program
    .argument('<feature-name>', 'Nome da feature a ser criada')
    .description('Cria uma nova feature com estrutura padrão do Next.js')
    .action(async (featureName) => {
    try {
        console.log(chalk_1.default.cyan(`🚀 Criando feature: ${featureName}`));
        await (0, createFeature_1.createFeature)(featureName);
        console.log(chalk_1.default.green(`✅ Feature ${featureName} criada com sucesso!`));
    }
    catch (error) {
        console.error(chalk_1.default.red(`❌ Erro ao criar feature: ${error instanceof Error ? error.message : error}`));
        process.exit(1);
    }
});
program.parse();
//# sourceMappingURL=index.js.map