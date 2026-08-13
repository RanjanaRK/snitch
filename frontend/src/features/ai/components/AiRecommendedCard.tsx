import { CalendarDays, Check, Shirt, Sparkles, Wallet } from "lucide-react";
import { useNavigate } from "react-router";
import type { Detected, Recommendation, ScoredProduct } from "../utils/aiTypes";

interface Props {
  recommendation: Recommendation;
  detected: Detected;
  products: ScoredProduct[];
  previewUrl: string;
}

const colorMap: Record<string, string> = {
  White: "#ffffff",
  Black: "#000000",
  Navy: "#001f54",
  Blue: "#60a5fa",
  "Light Blue": "#93c5fd",
  Beige: "#d6c0a1",
  Grey: "#9ca3af",
  Green: "#65a30d",
};

const AiRecommendedCard = ({
  recommendation,
  detected,
  products,
  previewUrl,
}: Props) => {
  const navigate = useNavigate();
  // const sortedProducts = [...products].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6 p-4">
      {/* TOP SECTION */}
      <div className="gap-5 rounded-3xl shadow md:flex">
        {/* Uploaded Outfit */}
        <div className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm md:border-0 md:shadow-none">
          <h3 className="mb-4 text-lg font-semibold">Your Uploaded Outfit</h3>

          <img
            src={previewUrl}
            alt="Uploaded Outfit"
            className="aspect-4/5 w-full rounded-2xl object-cover md:aspect-3/4 md:h-40 md:w-40"
          />

          <div className="mt-4 rounded-2xl bg-stone-50 p-4">
            <p className="text-xs text-stone-500">Looks Like</p>

            <p className="mt-1 font-medium text-[#C9A96E]">
              {detected.category}
            </p>

            <p className="mt-2 text-sm text-stone-600">
              {detected.garmentStyle}
            </p>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm md:border-0 md:shadow-none">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-[#C9A96E]" />

            <h2 className="text-xl font-semibold">AI Style Recommendation</h2>
          </div>

          {/* AI Reason */}
          <div className="rounded-2xl bg-[#f7f2eb] p-4">
            <p className="leading-7 text-stone-700">{recommendation.reason}</p>
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border p-3">
              <Shirt size={18} className="mb-2 text-[#C9A96E]" />

              <p className="text-xs text-stone-500">Style</p>

              <p className="font-medium">{recommendation.formality}</p>
            </div>

            <div className="rounded-2xl border p-3">
              <CalendarDays size={18} className="mb-2 text-[#C9A96E]" />

              <p className="text-xs text-stone-500">Occasion</p>

              <p className="font-medium">{recommendation.occasion}</p>
            </div>

            <div className="rounded-2xl border p-3">
              <Wallet size={18} className="mb-2 text-[#C9A96E]" />

              <p className="text-xs text-stone-500">Budget</p>

              <p className="font-medium">₹{recommendation.maxBudget}</p>
            </div>
          </div>

          {/* Colors */}
          <div className="mt-6">
            <h3 className="mb-3 font-medium">Recommended Colors</h3>

            <div className="flex flex-wrap gap-4">
              {recommendation.preferredColors.map((color: any) => (
                <div key={color} className="flex flex-col items-center gap-2">
                  <div
                    className="h-10 w-10 rounded-full border"
                    style={{
                      backgroundColor: colorMap[color] || "#e5e7eb",
                    }}
                  />

                  <span className="text-xs">{color}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="mt-6">
            <h3 className="mb-3 font-medium">Recommended Styles</h3>

            <div className="flex flex-wrap gap-2">
              {recommendation.keywords.map((keyword: any) => (
                <span
                  key={keyword}
                  className="rounded-full bg-stone-100 px-4 py-2 text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Why */}
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4">
            <h3 className="mb-3 font-semibold text-green-700">
              Why we recommend this
            </h3>

            <div className="grid gap-2 text-sm text-green-800">
              <div className="flex items-center gap-2">
                <Check size={16} />
                Matches your detected style
              </div>

              <div className="flex items-center gap-2">
                <Check size={16} />
                Fits your occasion
              </div>

              <div className="flex items-center gap-2">
                <Check size={16} />
                Within your budget
              </div>

              <div className="flex items-center gap-2">
                <Check size={16} />
                Recommended color harmony
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div>
        <div className="mb-5">
          <h2 className="text-2xl font-semibold">Recommended Products</h2>

          <p className="text-sm text-stone-500">
            Sorted by AI compatibility score
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {products.map((item, index) => {
            const product = item.product;

            return (
              <div
                key={product._id}
                className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm"
              >
                <div className="relative">
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.title}
                    className="aspect-4/5 w-full object-cover"
                  />

                  <div className="absolute top-3 left-3 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {Math.round(item.score)}% Match
                  </div>

                  {index === 0 && (
                    <div className="absolute top-3 right-3 rounded-full bg-black px-3 py-1 text-xs text-white">
                      Best Match
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <h3 className="line-clamp-2 text-sm font-medium">
                    {product.title}
                  </h3>
                  p
                  <p className="mt-2 text-lg font-semibold">
                    {product.price.currency === "INR" && "₹"}
                    {product.price?.amount}
                  </p>
                  {/* Progress */}
                  <div className="mt-3">
                    <div className="mb-1 flex justify-between text-xs">
                      <span>AI Match</span>

                      <span>{Math.round(item.score)}%</span>
                    </div>

                    <div className="h-2 rounded-full bg-stone-200">
                      <div
                        className="h-full rounded-full bg-[#C9A96E]"
                        style={{
                          width: `${item.score}%`,
                        }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="mt-4 w-full rounded-xl bg-black py-2 text-sm text-white transition hover:opacity-90"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AiRecommendedCard;
