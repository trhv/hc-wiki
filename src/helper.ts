import { fileSearchTool, RunContext, Agent, AgentInputItem, Runner } from "@openai/agents";
import { z } from "zod";


// Tool definitions
const fileSearch = fileSearchTool([
  "vs_68eb918710ac81918d9ef64865132a49"
])
const MyAgentSchema = z.object({});
interface MyAgentContext {
  workflowInputAsText: string;
}
const myAgentInstructions = (runContext: RunContext<MyAgentContext>, _agent: Agent<MyAgentContext>) => {
  const { workflowInputAsText } = runContext.context;
  return `what is the input ${workflowInputAsText}`
}
const myAgent = new Agent({
  name: "My agent",
  instructions: myAgentInstructions,
  model: "gpt-5",
  tools: [
    fileSearch
  ],
  outputType: "text",
  modelSettings: {
    reasoning: {
      effort: "low",
      summary: "auto"
    },
    store: true
  }
});

type WorkflowInput = { input_as_text: string };


// Main code entrypoint
export const runWorkflow = async (workflow: WorkflowInput) => {
  const state = {

  };
  const conversationHistory: any[] = [
    {
      role: "user",
      content: [
        {
          type: "input_text",
          text: workflow.input_as_text
        }
      ]
    }
  ];
  const runner = new Runner({
    traceMetadata: {
      __trace_source__: "agent-builder",
      workflow_id: "wf_68eb917e8ae0819090ffda75b1bad2850d4e27e2c1558e54"
    }
  });
  const myAgentResultTemp = await runner.run(
    myAgent,
    [
      ...conversationHistory
    ],
    {
      context: {
        workflowInputAsText: workflow.input_as_text
      }
    }
  );
  
  conversationHistory.push(...myAgentResultTemp.newItems.map((item) => item.rawItem));
  if (!myAgentResultTemp.finalOutput) {
      throw new Error("Agent result is undefined");
  }

  return conversationHistory[conversationHistory.length-1];
//   const myAgentResult = {
//     output_text: JSON.stringify(myAgentResultTemp.finalOutput),
//     output_parsed: myAgentResultTemp.finalOutput
//   };
}
