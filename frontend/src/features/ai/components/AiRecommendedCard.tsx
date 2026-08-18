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
    <div className="animate-in fade-in space-y-6 p-6 duration-500">
      {/* TOP SECTION */}
      <div className="gap-5 shadow md:flex">
        {/* Uploaded Outfit */}
        <div className="border-stone-200 bg-white p-4 transition-all duration-300">
          <h3 className="mb-4 text-lg font-semibold">Your Uploaded Outfit</h3>

          <img
            src={previewUrl}
            alt="Uploaded Outfit"
            className="aspect-4/5 w-full object-cover md:aspect-3/4 md:h-40 md:w-40"
          />

          <div className="mt-4 bg-stone-50 p-4">
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
        <div className="border border-stone-200 bg-white p-5 shadow-sm md:border-0 md:shadow-none">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles size={18} className="animate-pulse text-[#C9A96E]" />

            <h2 className="text-xl font-semibold">AI Style Recommendation</h2>
          </div>

          {/* AI Reason */}
          <div className="border border-[#eadfcf] bg-[#f7f2eb] p-4 shadow-sm">
            <p className="leading-7 text-stone-700">{recommendation.reason}</p>
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="border p-3 transition-all duration-300 hover:border-[#C9A96E] hover:shadow-md">
              <Shirt size={18} className="mb-2 text-[#C9A96E]" />

              <p className="text-xs text-stone-500">Style</p>

              <p className="font-medium">{recommendation.formality}</p>
            </div>

            <div className="border p-3 transition-all duration-300 hover:border-[#C9A96E] hover:shadow-md">
              <CalendarDays size={18} className="mb-2 text-[#C9A96E]" />

              <p className="text-xs text-stone-500">Occasion</p>

              <p className="font-medium">{recommendation.occasion}</p>
            </div>

            <div className="border p-3 transition-all duration-300 hover:border-[#C9A96E] hover:shadow-md">
              <Wallet size={18} className="mb-2 text-[#C9A96E]" />

              <p className="text-xs text-stone-500">Budget</p>

              <p className="font-medium">₹{recommendation.maxBudget}</p>
            </div>
          </div>

          {/* Colors */}
          <div className="mt-6">
            <h3 className="mb-3 font-medium">Recommended Colors</h3>

            <div className="flex flex-wrap gap-4">
              {recommendation.preferredColors?.map((color: any) => (
                <div key={color} className="flex flex-col items-center gap-2">
                  <div
                    className="h-10 w-10 rounded-full border-2 border-white shadow-md transition-transform duration-300"
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
              {recommendation.keywords?.map((keyword: any) => (
                <span
                  key={keyword}
                  className="rounded-full border border-[#eadfcf] bg-[#f7f2eb] px-4 py-2 text-sm transition-all duration-300 hover:border-[#C9A96E] hover:bg-[#C9A96E] hover:text-white"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Why */}
          <div className="mt-6 border border-[#eadfcf] bg-[#f7f2eb] p-4 text-[#7A6E63]">
            <h3 className="mb-3 font-semibold text-green-700">
              Why we recommend this
            </h3>

            <div className="grid gap-2 text-sm text-green-800">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-[#C9A96E]" />
                Matches your detected style
              </div>

              <div className="flex items-center gap-2">
                <Check size={16} className="text-[#C9A96E]" />
                Fits your occasion
              </div>

              <div className="flex items-center gap-2">
                <Check size={16} className="text-[#C9A96E]" />
                Within your budget
              </div>

              <div className="flex items-center gap-2">
                <Check size={16} className="text-[#C9A96E]" />
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
          {products.length === 0 ? (
            <div className="col-span-full flex min-h-[420px] flex-col items-center justify-center border border-[#ece6dc] bg-[#fdfcf9] px-8 py-20 text-center">
              <div className="mb-6 h-px w-16 bg-[#C9A96E]" />

              <p className="mb-3 text-[10px] tracking-[0.3em] text-[#B5ADA3] uppercase">
                Refined Search
              </p>

              <h2 className="mb-4 font-['Cormorant_Garamond'] text-4xl font-light text-[#1b1c1a] md:text-5xl">
                No Pieces Found
              </h2>

              <p className="max-w-md text-sm leading-relaxed text-[#7A6E63]">
                We couldn't find any pieces matching your current selection.
                Adjust your filters or explore our complete collection.
              </p>

              <div className="mt-8 h-px w-24 bg-[#ece6dc]" />

              <button
                // onClick={() => {
                //   setSearch("");
                //   setSelectedCategory("");
                //   setSelectedSubCategory("");
                // }}
                className="mt-8 border border-[#1b1c1a] px-8 py-4 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 hover:bg-[#1b1c1a] hover:text-white"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            products?.map((item, index) => {
              const product = item.product;

              return (
                <div
                  key={product._id}
                  className="group overflow-hidden border border-[#ece6dc] bg-[#fdfcf9] transition-all duration-500 hover:-translate-y-1 hover:border-[#d8c6a5] hover:shadow-[0_25px_80px_rgba(27,28,26,0.08)]"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product.images?.[0]?.url}
                      alt={product.title}
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />

                    {/* Match Badge */}
                    <div className="absolute top-4 left-4 border border-[#d8c6a5] bg-[#fbf9f6]/95 px-4 py-2 backdrop-blur-sm">
                      <p className="text-[9px] tracking-[0.22em] text-[#7A6E63] uppercase">
                        AI Match
                      </p>

                      <p className="font-['Cormorant_Garamond'] text-xl text-[#745a27]">
                        {Math.round(item.score)}%
                      </p>
                    </div>

                    {/* Best Match */}
                    {index === 0 && (
                      <div className="absolute top-4 right-4 bg-[#C9A96E] px-4 py-2">
                        <span className="text-[9px] tracking-[0.22em] text-white uppercase">
                          Best Match
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4 h-px w-12 bg-[#C9A96E]" />

                    <h3 className="font-['Cormorant_Garamond'] text-2xl leading-tight text-[#1b1c1a]">
                      {product.title}
                    </h3>

                    <p className="mt-2 text-[10px] tracking-[0.2em] text-[#7A6E63] uppercase">
                      Curated Recommendation
                    </p>

                    {/* Price */}
                    <div className="mt-5">
                      <p className="text-[10px] tracking-[0.2em] text-[#7A6E63] uppercase">
                        Investment
                      </p>

                      <p className="font-['Cormorant_Garamond'] text-3xl text-[#1b1c1a]">
                        ₹{product.price?.amount?.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* Match Bar */}
                    <div className="mt-6">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[10px] tracking-[0.15em] text-[#7A6E63] uppercase">
                          Compatibility
                        </span>

                        <span className="text-[10px] tracking-[0.15em] text-[#745a27] uppercase">
                          {Math.round(item.score)}%
                        </span>
                      </div>

                      <div className="h-[2px] bg-[#ece6dc]">
                        <div
                          className="h-full bg-[#C9A96E] transition-all duration-1000"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="mt-8 w-full border border-[#1b1c1a] py-4 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 hover:bg-[#1b1c1a] hover:text-white"
                    >
                      View Piece
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AiRecommendedCard;
