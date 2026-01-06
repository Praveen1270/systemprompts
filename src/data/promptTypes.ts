export type PromptKind = 'prompt' | 'tools' | 'other';

export interface PromptIndexItem {
  /** Stable unique id for React keys and deep links */
  id: string;
  toolId: string;
  toolName: string;
  toolCategory: string;
  title: string;
  kind: PromptKind;
  /** Relative path under `src/prompts/` */
  path: string;
  /** Small snippet for card preview */
  preview: string;
  /** Tag chips shown on the card */
  tags: string[];
}




