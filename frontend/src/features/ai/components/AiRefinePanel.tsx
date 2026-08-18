import { Sparkles } from "lucide-react";
import { useState } from "react";

interface AiRefinePanelProps {
  suggestions: string[];
  onRefine: (prompt: string) => void;
}

const AiRefinePanel = ({ suggestions, onRefine }: AiRefinePanelProps) => {
  const [prompt, setPrompt] = useState("");

  return (
    <>
      <div className="m-6 border border-[#ece6dc] bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles size={16} className="text-[#C9A96E]" />

          <h3 className="font-medium text-[#1b1c1a]">Refine With AI Stylist</h3>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() => onRefine(item)}
              className="border border-[#ece6dc] px-3 py-2 text-sm text-[#4d463a] transition-colors hover:border-[#C9A96E] hover:bg-[#C9A96E] hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Tell AI stylist..."
            className="flex-1 border border-[#ece6dc] px-4 py-3 outline-none focus:border-[#C9A96E]"
          />

          <button
            onClick={() => {
              if (!prompt.trim()) return;
              onRefine(prompt);
              setPrompt("");
            }}
            className="border border-[#1b1c1a] px-5 py-3 text-sm transition-colors hover:bg-[#1b1c1a] hover:text-white"
          >
            Refine
          </button>
        </div>
      </div>
    </>
  );
};

export default AiRefinePanel;
