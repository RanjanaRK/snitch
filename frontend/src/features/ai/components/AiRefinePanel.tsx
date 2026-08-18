import { Sparkles } from "lucide-react";
import { useState } from "react";

interface AiRefinePanelProps {
  suggestions: string[];
  onRefine: (prompt: string) => void;
  //   prompt: string;
  //   setPrompt: (prompt: string) => void;
}

const AiRefinePanel = ({
  suggestions,
  onRefine,
  //   prompt,
  //   setPrompt,
}: AiRefinePanelProps) => {
  const [prompt, setPrompt] = useState("");

  return (
    <>
      <div className="rounded-3xl border bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles size={18} className="text-[#C9A96E]" />

          <h3 className="font-semibold">Refine With AI Stylist</h3>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() => onRefine(item)}
              className="rounded-full border px-4 py-2 text-sm hover:bg-[#C9A96E] hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Tell AI stylist..."
            className="flex-1 rounded-xl border px-4 py-3"
          />

          <button
            onClick={() => {
              if (!prompt.trim()) return;

              onRefine(prompt);
              setPrompt("");
            }}
            className="rounded-xl bg-black px-5 text-white"
          >
            Refine
          </button>
        </div>
      </div>
    </>
  );
};

export default AiRefinePanel;
