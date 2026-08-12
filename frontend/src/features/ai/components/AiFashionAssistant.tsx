import { ImagePlus, Sparkles, Upload, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const formSchema = z.object({
  occasion: z.string().min(1, "Please select an occasion"),
  budget: z.number(),
  prompt: z.string(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const AiFashionAssistant = () => {
  // IMAGE STATE

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // REACT HOOK FORM

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      occasion: "",
      budget: 5000,
      prompt: "",
    },
  });

  const budget = watch("budget");

  // IMAGE CHANGE

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate image type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // Validate image size - 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    console.log("Selected file:", file);

    // Store file
    setSelectedFile(file);

    // Remove previous preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    // Create preview
    const url = URL.createObjectURL(file);

    setPreviewUrl(url);
  };

  // REMOVE IMAGE

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    // Remove file
    setSelectedFile(null);

    // Remove preview
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // OPEN FILE SELECTOR

  const handleCardClick = () => {
    fileInputRef.current?.click();
  };

  // SUBMIT

  const onSubmit = (data: FormSchemaType) => {
    if (!selectedFile) {
      alert("Please upload an image.");
      return;
    }

    console.log(data);

    // CREATE FORMDATA

    const formData = new FormData();

    // Image from React state
    formData.append("photo", selectedFile);

    // React Hook Form values
    formData.append("occasion", data.occasion);

    formData.append("budget", String(data.budget));

    formData.append("prompt", data.prompt);
  };

  return (
    <Sheet>
      {/* FLOATING AI BUTTON */}

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

      {/* AI SHEET */}

      <SheetContent
        side="right"
        className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
      >
        <div className="flex h-full flex-col">
          {/* HEADER */}

          <SheetHeader className="border-b border-[#e4e2df] bg-white px-6 py-6 text-left">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "#C9A96E",
                }}
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
                  Snitch
                </SheetTitle>

                <SheetDescription className="text-[11px] tracking-wide text-[#8a8178]">
                  Your personal fashion assistant
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          {/* FORM */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 overflow-y-auto px-6 py-7"
          >
            {/* WELCOME */}

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

            {/* IMAGE UPLOAD */}

            <div className="mb-6">
              <label className="mb-2 block text-[10px] font-medium tracking-[0.18em] text-[#7a6e63] uppercase">
                Inspiration
              </label>

              {/* Hidden input */}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Upload card */}

              <div
                onClick={handleCardClick}
                className="group cursor-pointer rounded-xl border border-dashed border-[#d8d2cb] bg-white p-5 transition-all hover:border-[#C9A96E]"
              >
                <div className="flex items-center gap-4">
                  {/* Image preview */}

                  <div className="flex h-25 w-25 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f5f0e8]">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Selected preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImagePlus
                        size={20}
                        className="text-[#C9A96E]"
                        strokeWidth={1.6}
                      />
                    )}
                  </div>

                  {/* File information */}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#3d3935]">
                      {selectedFile?.name || "Upload an image"}
                    </p>

                    <p className="mt-1 text-xs text-[#9a9188]">
                      {selectedFile
                        ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
                        : "Upload an outfit or style inspiration"}
                    </p>
                  </div>

                  {/* Remove / Upload icon */}

                  {selectedFile ? (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="shrink-0 rounded-full p-1 text-[#9a9188] transition-colors hover:bg-[#f5f0e8] hover:text-[#3d3935]"
                    >
                      <X size={17} />
                    </button>
                  ) : (
                    <Upload
                      size={17}
                      className="shrink-0 text-[#9a9188] transition-colors group-hover:text-[#C9A96E]"
                    />
                  )}
                </div>
              </div>

              {/* Image error */}

              {!selectedFile && (
                <p className="mt-2 text-[11px] text-[#9a9188]">
                  Please upload an image to get recommendations.
                </p>
              )}
            </div>

            {/* OCCASION */}

            <div className="mb-6">
              <label className="mb-2 block text-[10px] font-medium tracking-[0.18em] text-[#7a6e63] uppercase">
                Occasion
              </label>

              <select
                {...register("occasion")}
                className="h-12 w-full rounded-xl border border-[#e4e2df] bg-white px-4 text-sm text-[#3d3935] transition outline-none focus:border-[#C9A96E]"
              >
                <option value="">Select an occasion</option>

                <option value="casual">Casual</option>

                <option value="office">Office</option>

                <option value="date-night">Date Night</option>

                <option value="party">Party</option>

                <option value="wedding">Wedding</option>

                <option value="vacation">Vacation</option>
              </select>

              {errors.occasion && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.occasion.message}
                </p>
              )}
            </div>

            {/* BUDGET */}

            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-[10px] font-medium tracking-[0.18em] text-[#7a6e63] uppercase">
                  Budget
                </label>

                <span className="text-xs font-medium text-[#C9A96E]">
                  ₹{Number(budget).toLocaleString("en-IN")}
                </span>
              </div>

              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                {...register("budget", {
                  valueAsNumber: true,
                })}
                className="w-full accent-[#C9A96E]"
              />

              <div className="mt-2 flex justify-between text-[10px] text-[#aaa29a]">
                <span>₹1,000</span>
                <span>₹10,000+</span>
              </div>
            </div>

            {/* PROMPT */}

            <div className="mb-8">
              <label className="mb-2 block text-[10px] font-medium tracking-[0.18em] text-[#7a6e63] uppercase">
                Tell me what you need
                <span className="ml-1 text-[#aaa]">(optional)</span>
              </label>

              <textarea
                rows={4}
                placeholder="e.g. I need an elegant black outfit for a wedding..."
                {...register("prompt")}
                className="w-full resize-none rounded-xl border border-[#e4e2df] bg-white px-4 py-3 text-sm leading-6 text-[#3d3935] outline-none placeholder:text-[#aaa29a] focus:border-[#C9A96E]"
              />
            </div>

            {/* CTA */}

            <button
              type="submit"
              className="flex h-13 w-full items-center justify-center gap-2 rounded-xl text-sm font-medium tracking-wide text-white shadow-sm transition-all hover:opacity-90"
              style={{
                backgroundColor: "#1b1c1a",
              }}
            >
              <Sparkles size={17} strokeWidth={1.7} />
              Find My Perfect Look
            </button>

            {/* =========================
                FOOTER
            ========================= */}

            <p className="mt-4 text-center text-[10px] tracking-wide text-[#aaa29a]">
              Powered by Snitch
            </p>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AiFashionAssistant;
