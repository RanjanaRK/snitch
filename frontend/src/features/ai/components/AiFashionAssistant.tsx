import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, RefreshCw, Sparkles, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";
import useAi from "../hooks/useAi";
import type { Detected, Recommendation, ScoredProduct } from "../utils/aiTypes";
import { formSchema, type FormSchemaType } from "../utils/zodSchema";
import AiLoading from "./AiLoading";
import AiRecommendedCard from "./AiRecommendedCard";
import AiRefinePanel from "./AiRefinePanel";

const AiFashionAssistant = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLaoding, setIsLoading] = useState(false);

  const [recommendations, setRecommendations] = useState<Recommendation | null>(
    null,
  );

  const [detected, setDetected] = useState<Detected | null>(null);

  const [products, setProducts] = useState<ScoredProduct[]>([]);

  const [refineSuggestions, setRefineSuggestions] = useState<string[]>([]);

  const [, setLoadingRefine] = useState(false);

  const [showRefine, setShowRefine] = useState(true);

  const { createAiFashionRecommend, createRefineRecommendation } = useAi();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
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
      toast.error("Please select an image file.");
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

  const onSubmit = async (data: FormSchemaType) => {
    try {
      setIsLoading(true);
      setRecommendations(null);

      if (!selectedFile) {
        toast.warning("Please upload an image.");
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

      const res = await createAiFashionRecommend(formData);

      console.log(res);

      setDetected(res.detected);
      setRecommendations(res.recommendation);
      setProducts(res.products);
      setRefineSuggestions(res.refineSuggestions);

      toast.success(res.message);
    } catch (error: any) {
      const status = error?.response?.status;
      console.log(status);

      if (status == 503) {
        toast.error(
          "Our AI stylist is currently busy. Please try again in a few moments.",
        );
      } else {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong. Please try again.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = async (userPrompt: string) => {
    try {
      setLoadingRefine(true);

      const result = await createRefineRecommendation({
        recommendations,
        detected,
        userPrompt,
        budget: recommendations?.maxBudget,
      });

      setRecommendations(result.recommendation);

      setProducts(result.products);

      setShowRefine(false);
    } catch (error) {
    } finally {
      setLoadingRefine(false);
    }
  };

  // REFRESH
  const handleNewLook = () => {
    setSelectedFile(null);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);

    setRecommendations(null);
    setDetected(null);
    setProducts([]);
    setRefineSuggestions([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    reset({
      occasion: "",
      budget: 5000,
      prompt: "",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="group fixed right-5 bottom-5 z-50 flex items-center gap-3 rounded-full border border-[#E8DFCF] bg-white/95 px-5 py-3 shadow-[0_10px_40px_rgba(201,169,110,0.25)] backdrop-blur-xl transition-all duration-500 hover:border-[#A8874F] hover:shadow-[0_20px_60px_rgba(201,169,110,0.4)]">
          {/* Icon */}
          <Sparkles
            size={16}
            className="text-[#A8874F] transition-transform duration-500 group-hover:rotate-6"
          />

          {/* Text */}
          <span className="absolute -top-2 -right-2 rounded-full bg-[#A8874F] px-2 py-0.5 text-[8px] text-white">
            AI
          </span>
          <span className="hidden text-[11px] font-medium tracking-[0.18em] text-[#7A6E63] uppercase transition-colors duration-500 group-hover:text-[#2B2926] sm:block">
            Stylist
          </span>
        </button>
      </SheetTrigger>

      {/* AI SHEET */}

      <SheetContent
        side="right"
        className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
      >
        {isLaoding && <AiLoading />}

        {!isLaoding && recommendations && detected ? (
          <div className="h-full overflow-y-auto p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-[#9b793e] uppercase">
                  Your Style
                </p>

                <h2
                  className="mt-1 text-2xl font-light"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  Your Recommended Look
                </h2>
              </div>

              <button
                type="button"
                onClick={handleNewLook}
                className="flex items-center gap-2 rounded-full border border-[#d8d2cb] bg-white px-4 py-2 text-[10px] font-medium tracking-[0.12em] text-[#665e56] uppercase transition hover:border-[#A8874F] hover:text-[#A8874F]"
              >
                <RefreshCw size={14} />
                New Look
              </button>
            </div>

            <AiRecommendedCard
              recommendation={recommendations}
              detected={detected}
              previewUrl={previewUrl!}
              products={products}
            />

            {showRefine && (
              <AiRefinePanel
                suggestions={refineSuggestions}
                onRefine={handleRefine}
              />
            )}
          </div>
        ) : (
          !isLaoding && (
            <div className="flex h-full flex-col">
              {/* HEADER */}

              <SheetHeader className="border-b border-[#e4e2df] bg-white px-5 py-6 text-left">
                <div className="flex items-center gap-3">
                  <div
                    className="relative flex h-10 w-10 items-center justify-center rounded-full shadow-lg before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-[#A8874F]/30"
                    style={{
                      backgroundColor: "#A8874F",
                    }}
                  >
                    <Sparkles size={18} color="white" strokeWidth={1.7} />
                  </div>

                  <div>
                    <SheetTitle
                      className="text-lg font-medium tracking-wide text-[#2B2926]"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                      }}
                    >
                      Vestra
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
                    className="mb-2 text-3xl leading-tight text-[#2B2926]"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    <div className="animate-in fade-in slide-in-from-top-2 duration-700">
                      Find your
                      <br />
                      perfect look.
                    </div>
                  </p>

                  <p className="max-w-95 text-sm leading-6 text-[#665E56]">
                    Tell me a little about what you're looking for and I'll
                    discover pieces that match your style, occasion, and budget.
                  </p>
                </div>

                {/* IMAGE UPLOAD */}

                <div className="mb-6">
                  <label className="mb-2 block text-[10px] font-medium tracking-[0.18em] text-[#665E56] uppercase">
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
                    className="group cursor-pointer rounded-2xl border border-dashed border-[#d8d2cb] bg-white p-5 transition-all duration-300 hover:border-[#A8874F] hover:shadow-xl"
                  >
                    <div className="flex items-center gap-4">
                      {/* Image preview */}

                      <div className="flex h-25 w-25 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f5f0e8] ring-4 ring-[#B89455]/10 transition-all duration-300 group-hover:ring-[#B89455]/30">
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt="Selected preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <ImagePlus
                            size={20}
                            className="text-[#B89455]"
                            strokeWidth={1.6}
                          />
                        )}
                      </div>

                      {/* File information */}

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-[#38342F]">
                          {selectedFile?.name || "Upload an image"}
                        </p>

                        <p className="mt-1 text-xs text-[#81776D]">
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
                          className="shrink-0 rounded-full p-1 text-[#81776D] transition-colors hover:bg-[#f5f0e8] hover:text-[#38342F]"
                        >
                          <X size={17} />
                        </button>
                      ) : (
                        <Upload
                          size={17}
                          className="shrink-0 text-[#81776D] transition-all duration-300 group-hover:scale-110 group-hover:text-[#B89455]"
                        />
                      )}
                    </div>
                  </div>

                  {/* Image error */}

                  {!selectedFile && (
                    <p className="mt-2 text-[11px] text-[#81776D]">
                      Please upload an image to get recommendations.
                    </p>
                  )}
                </div>

                {/* OCCASION */}

                <div className="mb-6">
                  <label className="mb-2 block text-[10px] font-medium tracking-[0.18em] text-[#665E56] uppercase">
                    Occasion
                  </label>

                  <select
                    {...register("occasion")}
                    className="h-12 w-full rounded-xl border border-[#e4e2df] bg-white px-4 text-sm text-[#38342F] transition-all outline-none focus:border-[#B89455] focus:ring-4 focus:ring-[#B89455]/10"
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
                    <label className="text-[10px] font-medium tracking-[0.18em] text-[#665E56] uppercase">
                      Budget
                    </label>

                    <span className="text-xs font-medium text-[#B89455]">
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
                    className="w-full accent-[#B89455]"
                  />

                  <div className="mt-2 flex justify-between text-[10px] text-[#91877D]">
                    <span>₹1,000</span>
                    <span>₹10,000+</span>
                  </div>
                </div>

                {/* PROMPT */}

                <div className="mb-8">
                  <label className="mb-2 block text-[10px] font-medium tracking-[0.18em] text-[#665E56] uppercase">
                    Tell me what you need
                    <span className="ml-1 text-[#aaa]">(optional)</span>
                  </label>

                  <textarea
                    rows={4}
                    placeholder="e.g. I need an elegant black outfit for a wedding..."
                    {...register("prompt")}
                    className="h-12 w-full rounded-xl border border-[#e4e2df] bg-white px-4 text-sm text-[#38342F] transition-all outline-none focus:border-[#C9A96E] focus:ring-4 focus:ring-[#C9A96E]/10"
                  />
                </div>

                {/* CTA */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-13 w-full items-center justify-center gap-2 rounded-xl text-sm font-medium tracking-wide text-white shadow-lg transition-all duration-300 hover:bg-[#C9A96E] hover:shadow-2xl active:scale-[0.98]"
                  style={{
                    backgroundColor: "#2B2926",
                  }}
                >
                  <Sparkles size={17} strokeWidth={1.7} className="" />
                  Find My Perfect Look
                </button>

                {/* FOOTER */}

                <p className="mt-4 text-center text-[10px] tracking-wide text-[#91877D]">
                  Powered by Vastra
                </p>
              </form>
            </div>
          )
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AiFashionAssistant;
