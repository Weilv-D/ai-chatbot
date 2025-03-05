import { customProvider } from "ai";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google"; 
import { wrapLanguageModel, extractReasoningMiddleware } from "ai";
import { fireworks } from "@ai-sdk/fireworks"; // 如果您使用了此依赖

export const myProvider = customProvider({
  languageModels: {
    // 使用 gemini-2.0-flash-thinking-exp-01-21 替换小型模型
    "chat-model-small": google("gemini-2.0-flash-thinking-exp-01-21"),
    // 可选：使用 gemini-2.0-pro-exp-0205 替换大型模型
    "chat-model-large": google("gemini-2.0-pro-exp-0205"),
    // 保持现有的推理模型不变
    "chat-model-reasoning": wrapLanguageModel({
      model: fireworks("accounts/fireworks/models/deepseek-r1"),
      middleware: extractReasoningMiddleware({ tagName: "think" }),
    }),
    "title-model": openai("gpt-4-turbo"),
    "artifact-model": openai("gpt-4o-mini"),
  },
  imageModels: {
    "small-model": openai.image("dall-e-3"),
  },
});

export const DEFAULT_CHAT_MODEL: string = 'chat-model-small';

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model-small',
    name: 'Gemini 2.0 Flash Thinking',
    description: 'Google\'s experimental model with reasoning capabilities',
  },
  {
    id: 'chat-model-large',
    name: 'Gemini 2.0 Pro',
    description: 'Google\'s advanced experimental model for complex tasks',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Reasoning model',
    description: 'Uses advanced reasoning',
  },
];