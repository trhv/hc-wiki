import { runWorkflow } from "./helper";
import ora from 'ora';
import chalk from 'chalk';
import boxen from 'boxen';
import gradient from 'gradient-string';

export async function processInput(input: string): Promise<void> {
  // Display the query in a nice box
  console.log(boxen(chalk.cyan.bold('📝 Your Question:') + '\n' + chalk.white(input), {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'cyan'
  }));

  // Show a spinner while waiting for response
  const spinner = ora({
    text: chalk.yellow('Thinking... 🤔'),
    spinner: 'dots12'
  }).start();

  try {
    const res = await runWorkflow({ input_as_text: input });
    spinner.stop();
    
    // Display the response in a beautiful box
    console.log(boxen(
      gradient.pastel.multiline('🤖 hc-wiki Response:\n') + 
      '\n' + 
      chalk.white(res.content[0].text),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green'
      }
    ));
    
    console.log(chalk.green('✨ Done!\n'));
  } catch (error) {
    spinner.stop();
    console.log(boxen(
      chalk.red.bold('❌ Error:') + '\n' + 
      chalk.white(error instanceof Error ? error.message : 'Unknown error'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'red'
      }
    ));
  }
}
