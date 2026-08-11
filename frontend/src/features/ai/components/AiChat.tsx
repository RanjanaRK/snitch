import { useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";
import { Label } from "radix-ui";

const AiChat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    console.log("User message:", message);

    setMessage("");
  };

  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: "#C9A96E",
          color: "#fff",
        }}
        aria-label="Open AI assistant"
      >
        {open ? <X size={22} /> : <Sparkles size={22} />}
      </button>

      {/* Chat Box */}
      {open && (
        <div
          className="fixed right-6 bottom-24 z-50 flex h-[520px] w-[360px] flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl"
          style={{ borderColor: "#e4e2df" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{
              backgroundColor: "#1b1c1a",
              color: "#fff",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: "#C9A96E" }}
              >
                <Bot size={18} />
              </div>

              <div>
                <p className="text-sm font-medium">Snitch AI</p>
                <p className="text-[10px] text-gray-400">
                  Your fashion assistant
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 transition-colors hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-[#faf9f7] p-4">
            {/* AI message */}
            <div className="flex gap-2">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "#C9A96E" }}
              >
                <Sparkles size={13} color="white" />
              </div>

              <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-white px-4 py-3 text-sm text-[#3f3a35] shadow-sm">
                Hi! 👋 I'm your Snitch AI fashion assistant. What are you
                looking for today?
              </div>
            </div>

            {/* Example suggestions */}
            <div className="flex flex-wrap gap-2 pl-9">
              <button className="rounded-full border border-[#e4e2df] bg-white px-3 py-2 text-xs text-[#7A6E63] hover:border-[#C9A96E]">
                Outfit for a party
              </button>

              <button className="rounded-full border border-[#e4e2df] bg-white px-3 py-2 text-xs text-[#7A6E63] hover:border-[#C9A96E]">
                Casual outfit
              </button>
            </div>
          </div>

          {/* Input */}
          <div className="border-t bg-white p-3">
            <div className="flex items-center gap-2 rounded-full border border-[#e4e2df] px-4 py-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Ask your fashion assistant..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#aaa]"
              />

              <button
                onClick={handleSend}
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "#C9A96E",
                  color: "#fff",
                }}
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      <Sheet>
        <SheetTrigger className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105">
          <Sparkles size={22} />
        </SheetTrigger>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>

          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <h1>Name</h1>
              <h2 id="sheet-demo-name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <p>Username</p>
              <p id="sheet-demo-username" defaultValue="@peduarte" />
            </div>
          </div>
        </SheetHeader>
      </Sheet>
    </>
  );
};

export default AiChat;
