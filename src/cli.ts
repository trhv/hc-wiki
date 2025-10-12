#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { program } from 'commander';
import { processInput } from './index.js';
import figlet from 'figlet';
import gradient from 'gradient-string';
import chalk from 'chalk';

// Display banner
console.log(gradient.pastel.multiline(
  figlet.textSync('HC Wiki', { font: 'Standard', horizontalLayout: 'default' })
));
console.log(chalk.gray('  AI-powered knowledge assistant\n'));

program
  .name('hc-wiki')
  .description('HC Wiki command-line tool')
  .version('1.0.0')
  .argument('<input>', 'Input text to process')
  .action(async (input: string) => {
    await processInput(input);
  });

program.parse();

