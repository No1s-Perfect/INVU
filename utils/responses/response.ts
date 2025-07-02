import { AzureOpenAI } from "openai";
import { ResponseOutputItem } from "openai/resources/responses/responses.js";
const model = "gpt-4o";
const client = new AzureOpenAI({
  apiKey: process.env.API_KEY,
  apiVersion: "2025-03-01-preview",
  endpoint: process.env.BASE_URL,
});

export const FUNCTION_NAME = {
  SAVE_IMAGES_TO_DEVICE_LIBRARY: "save_images_to_device_library",
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
    ],
  });

  return response.output[0];
};
