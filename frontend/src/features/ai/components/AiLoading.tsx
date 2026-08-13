import { Sparkles } from "lucide-react";

const AiLoading = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-[#C9A96E]/30" />

        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#C9A96E]">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
      </div>

      <h2
        className="mt-8 text-3xl text-[#1b1c1a]"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        Analyzing Your Style
      </h2>

      <p className="mt-3 max-w-sm text-sm leading-6 text-[#7a6e63]">
        Our AI is identifying colors, patterns, garment style, occasion
        compatibility and finding the best products for you.
      </p>

      <div className="mt-8 flex gap-2">
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#C9A96E]" />
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-[#C9A96E]"
          style={{ animationDelay: "0.15s" }}
        />
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-[#C9A96E]"
          style={{ animationDelay: "0.3s" }}
        />
      </div>

      <p className="mt-6 text-xs tracking-[0.2em] text-[#aaa29a] uppercase">
        Finding Your Perfect Look...
      </p>
    </div>
  );
};

export default AiLoading;
