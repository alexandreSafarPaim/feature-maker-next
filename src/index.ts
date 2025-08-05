import { Command } from 'commander';
import chalk from 'chalk';
import { createFeature } from './commands/createFeature';

const program = new Command();

program
  .name('feature-maker-next')
  .description('CLI para gerar features no Next.js com estrutura padrão')
  .version('1.0.6');

program
  .argument('<feature-name>', 'Nome da feature a ser criada')
  .description('Cria uma nova feature com estrutura padrão do Next.js')
  .action(async (featureName: string) => {
    try {
      console.log(chalk.cyan(`🚀 Criando feature: ${featureName}`));
      await createFeature(featureName);
      console.log(chalk.green(`✅ Feature ${featureName} criada com sucesso!`));
    } catch (error) {
      console.error(chalk.red(`❌ Erro ao criar feature: ${error instanceof Error ? error.message : error}`));
      process.exit(1);
    }
  });

program.parse();