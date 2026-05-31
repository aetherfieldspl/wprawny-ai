// lib/policy/defaults.ts
// Sensowne defaulty dla generatora polityki — bezpieczna wersja "out of the box".

import type { PolicyConfig } from "./types";

export function emptyPolicy(): PolicyConfig {
  return {
    org: {
      name: "",
      sector: "",
      size: null,
      responsiblePerson: "",
      responsibleRole: "",
    },
    tools: {
      allowed: [],
      requireApproval: true,
    },
    dataProhibitions: {
      personal: true,
      sensitive: true,
      tradeSecrets: true,
      sourceCode: true,
    },
    humanInTheLoop: true,
    markAiContent: true,
    roles: {
      approver: "",
      overseer: "",
    },
    incidents: {
      contact: "",
    },
    consequences:
      "Naruszenie zasad polityki może skutkować konsekwencjami przewidzianymi w regulaminie pracy, łącznie z rozwiązaniem stosunku pracy w przypadku rażących lub powtarzających się naruszeń.",
    trainingReference: true,
  };
}

/** Sugerowane narzędzia (preset) — użytkownik może je dodać do listy. */
export const SUGGESTED_TOOLS = [
  "ChatGPT (OpenAI)",
  "Claude (Anthropic)",
  "Gemini (Google)",
  "Microsoft Copilot",
  "GitHub Copilot",
  "Perplexity",
  "Midjourney",
  "DALL·E",
];
