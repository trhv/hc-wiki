import { runWorkflow } from "./helper";

export async function processInput(input: string): Promise<void> {
  console.log("HC Wiki received input:", input);

  // Add your logic here
  // For now, just echoing the input
  console.log("Processing2:", input);
  const res = await runWorkflow({ input_as_text: input });
  console.log(res.content[0].text);
}
