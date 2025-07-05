import { AzureOpenAI } from "openai";
import {
  ResponseInput,
  ResponseOutputItem,
} from "openai/resources/responses/responses.js";
export const model = "gpt-4o";
export const client = new AzureOpenAI({
  apiKey: process.env.API_KEY,
  apiVersion: "2025-03-01-preview",
  endpoint: process.env.BASE_URL,
});

export const FUNCTION_NAME = {
  SAVE_IMAGES_TO_DEVICE_LIBRARY: "save_images_to_device_library",
  GET_PRETTY_GIRL: "get_pretty_girl",
};
export const tool = async (content: string): Promise<ResponseOutputItem> => {
  const response = await client.responses.create({
    model,
    input: [{ role: "user", content }],
    tool_choice: "auto",
    tools: [
      {
        type: "function",
        name: FUNCTION_NAME.SAVE_IMAGES_TO_DEVICE_LIBRARY,
        description:
          "Saves one or more user images to the device's photo or media library. Use this when the user wants to download or store images locally on their device.",
        parameters: {
          type: "object",
          properties: {
            query: { type: "string" },
          },
          required: ["query"],
          additionalProperties: false,
        },
        strict: true,
      },
      {
        type: "function",
        name: FUNCTION_NAME.GET_PRETTY_GIRL,
        description:
          "Gets a list of pretty girls based on the user's query. Use this when the user wants to know who is the prettiest.",
        parameters: {
          type: "object",
          properties: {
            query: { type: "string" },
          },
          required: ["query"],
          additionalProperties: false,
        },
        strict: true,
      },
    ],
  });
  return response.output[0];
};

export const responseBack = async (
  query: string,
  toolCall: ResponseOutputItem,
  result: any
) => {
  const x = await client.responses.create({
    model,
    instructions: `You are a helpful assistant. You will receive a query from the user and a tool call.
    Your task is to respond with the output of the tool call in a way that is helpful and relevant to the user's query.
    If the tool call is successful, return the result in a way that is easy to understand. You can use emojis to make it more engaging.`,
    input: [
      {
        role: "user",
        content: query,
      },
      toolCall,
      {
        type: "function_call_output",
        call_id: toolCall.type === "function_call" ? toolCall.call_id : "",
        output: JSON.stringify(result),
      },
    ],
  });

  return x.output[0];
};
