import { ImagePlus, Sparkles, Upload } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";

const AiFashionAssistant = () => {
  return (
    <Sheet>
      {/* Floating AI Button */}
      <SheetTrigger asChild>
        <button
          className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: "#C9A96E",
            color: "#fff",
          }}
          aria-label="Open AI Fashion Assistant"
        >
          <Sparkles size={22} strokeWidth={1.8} className="animate-pulse" />
        </button>
      </SheetTrigger>

      {/* AI Sheet */}
      <SheetContent
        side="right"
        className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
        // className="border-l border-[#e4e2df] bg-[#faf9f7] p-0 "
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <SheetHeader className="border-b border-[#e4e2df] bg-white px-6 py-6 text-left">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "#C9A96E" }}
              >
                <Sparkles size={18} color="white" strokeWidth={1.7} />
              </div>

              <div>
                <SheetTitle
                  className="text-lg font-medium tracking-wide text-[#1b1c1a]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  Snitch AI
                </SheetTitle>

                <SheetDescription className="text-[11px] tracking-wide text-[#8a8178]">
                  Your personal fashion assistant
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto px-6 py-7">
            {/* Welcome */}
            <div className="mb-7">
              <p
                className="mb-2 text-3xl leading-tight text-[#1b1c1a]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Find your
                <br />
                perfect look.
              </p>

              <p className="max-w-95 text-sm leading-6 text-[#7a6e63]">
                Tell me a little about what you're looking for and I'll discover
                pieces that match your style, occasion, and budget.
              </p>
            </div>

            {/* Upload Image */}
            <div className="mb-6">
              <label className="mb-2 block text-[10px] font-medium tracking-[0.18em] text-[#7a6e63] uppercase">
                Inspiration
                <span className="ml-1 text-[#aaa]">(optional)</span>
              </label>

              <div className="group cursor-pointer rounded-xl border border-dashed border-[#d8d2cb] bg-white p-5 transition-all hover:border-[#C9A96E]">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f0e8]">
                    <ImagePlus
                      size={20}
                      className="text-[#C9A96E]"
                      strokeWidth={1.6}
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#3d3935]">
                      Upload an image
                    </p>

                    <p className="mt-1 text-xs text-[#9a9188]">
                      Upload an outfit or style inspiration
                    </p>
                  </div>

                  <Upload
                    size={17}
                    className="text-[#9a9188] transition-colors group-hover:text-[#C9A96E]"
                  />
                </div>
              </div>
            </div>

            {/* Occasion */}
            <div className="mb-6">
              <label className="mb-2 block text-[10px] font-medium tracking-[0.18em] text-[#7a6e63] uppercase">
                Occasion
              </label>

              <select className="h-12 w-full rounded-xl border border-[#e4e2df] bg-white px-4 text-sm text-[#3d3935] transition outline-none focus:border-[#C9A96E]">
                <option>Select an occasion</option>
                <option>Casual</option>
                <option>Office</option>
                <option>Date Night</option>
                <option>Party</option>
                <option>Wedding</option>
                <option>Vacation</option>
              </select>
            </div>

            {/* Budget */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-[10px] font-medium tracking-[0.18em] text-[#7a6e63] uppercase">
                  Budget
                </label>

                <span className="text-xs font-medium text-[#C9A96E]">
                  ₹1,000 – ₹5,000
                </span>
              </div>

              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                defaultValue="5000"
                className="w-full accent-[#C9A96E]"
              />

              <div className="mt-2 flex justify-between text-[10px] text-[#aaa29a]">
                <span>₹1,000</span>
                <span>₹10,000+</span>
              </div>
            </div>

            {/* Prompt */}
            <div className="mb-8">
              <label className="mb-2 block text-[10px] font-medium tracking-[0.18em] text-[#7a6e63] uppercase">
                Tell me what you need
              </label>

              <textarea
                rows={4}
                placeholder="e.g. I need an elegant black outfit for a wedding..."
                className="w-full resize-none rounded-xl border border-[#e4e2df] bg-white px-4 py-3 text-sm leading-6 text-[#3d3935] outline-none placeholder:text-[#aaa29a] focus:border-[#C9A96E]"
              />
            </div>

            {/* CTA */}
            <button
              className="flex h-13 w-full items-center justify-center gap-2 rounded-xl text-sm font-medium tracking-wide text-white shadow-sm transition-all hover:opacity-90"
              style={{
                backgroundColor: "#1b1c1a",
              }}
            >
              <Sparkles size={17} strokeWidth={1.7} />
              Find My Perfect Look
            </button>

            {/* Footer hint */}
            <p className="mt-4 text-center text-[10px] tracking-wide text-[#aaa29a]">
              Powered by Snitch AI
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AiFashionAssistant;
