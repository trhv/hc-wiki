#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { program } from 'commander';
import { processInput } from './index.js';
import figlet from 'figlet';
import gradient from 'gradient-string';
import chalk from 'chalk';
import prompts from 'prompts';

// Display banner
console.log(gradient.pastel.multiline(
  figlet.textSync('HC Wiki', { font: 'Standard', horizontalLayout: 'default' })
));
console.log(chalk.gray('  AI-powered knowledge assistant\n'));

// Interactive mode function
async function interactiveMode() {
  let continueAsking = true;
  
  while (continueAsking) {
    const response = await prompts({
      type: 'text',
      name: 'question',
      message: chalk.cyan('What would you like to know?'),
      validate: value => value.trim().length > 0 ? true : 'Please enter a question'
    });
    
    // Handle Ctrl+C gracefully
    if (!response.question) {
      console.log(chalk.yellow('\n👋 Goodbye!\n'));
      process.exit(0);
    }
    
    // Process the user's question
    await processInput(response.question);
    
    // Ask if they want to continue
    const continueResponse = await prompts({
      type: 'confirm',
      name: 'continue',
      message: chalk.cyan('Do you have another question?'),
      initial: true
    });
    
    // Handle Ctrl+C gracefully
    if (continueResponse.continue === undefined) {
      console.log(chalk.yellow('\n👋 Goodbye!\n'));
      process.exit(0);
    }
    
    continueAsking = continueResponse.continue;
  }
  
  console.log(chalk.yellow('\n👋 Goodbye!\n'));
}

program
  .name('hc-wiki')
  .description('HC Wiki command-line tool - Interactive AI-powered knowledge assistant')
  .version('1.0.0')
  .action(async () => {
    await interactiveMode();
  });

program.parse();

