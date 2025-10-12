#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { program } from 'commander';
import { processInput } from './index.js';

program
  .name('hc-wiki')
  .description('HC Wiki command-line tool')
  .version('1.0.0')
  .argument('<input>', 'Input text to process')
  .action(async (input: string) => {
    await processInput(input);
  });

program.parse();

