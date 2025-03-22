
import React from "react";
import PromptCard from "@/components/PromptCard";
import { Prompt } from "@/data/mockData";

interface PromptGridViewProps {
  prompts: Prompt[];
  onSelectPrompt: (id: string) => void;
  getAnimationClass: (index: number) => string;
}

const PromptGridView = ({ prompts, onSelectPrompt, getAnimationClass }: PromptGridViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {prompts.map((prompt, index) => (
        <div key={prompt.id} className={getAnimationClass(index)}>
          <PromptCard prompt={prompt} onClick={() => onSelectPrompt(prompt.id)} />
        </div>
      ))}
    </div>
  );
};

export default PromptGridView;
