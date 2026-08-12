import { ArrowLeft, Heart, Sparkles, ShoppingBag } from "lucide-react";

type Recommendation = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type FashionResultsProps = {
  //   image: string | null;
  occasion: string;
  budget: number;
  recommendations: Recommendation[];
  //   onBack: () => void;
};

function AiRecommendedCard({
  //   image,
  occasion,
  budget,
  recommendations,
  //   onBack,
}: FashionResultsProps) {
  return (
    <>
      <div className="">
        <div className="">
          <img src="" alt="" />
        </div>
        <div className=""></div>
      </div>

      <div className="flex h-full flex-col bg-[#faf9f7]">
        {/* Header */}
        <div className="border-b border-[#e4e2df] bg-white px-6 py-5">
          <button
            // onClick={onBack}
            className="mb-5 flex items-center gap-2 text-xs text-[#7a6e63] transition hover:text-[#1b1c1a]"
          >
            <ArrowLeft size={15} />
            Back
          </button>

          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{
                backgroundColor: "#C9A96E",
              }}
            >
              <Sparkles size={17} color="white" />
            </div>

            <div>
              <h2
                className="text-xl text-[#1b1c1a]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Your Perfect Look
              </h2>

              <p className="text-[11px] text-[#8a8178]">Curated just for you</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Style Summary */}
          <div className="mb-7 rounded-2xl border border-[#e7e2dc] bg-white p-4">
            <div className="flex gap-4">
              {/* Uploaded image */}
              {/* <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f5f0e8]">
                {image && (
                  <img
                    src={image}
                    alt="Your inspiration"
                    className="h-full w-full object-cover"
                  />
                )}
              </div> */}

              {/* Details */}
              <div className="py-1">
                <p className="mb-1 text-[10px] font-medium tracking-[0.16em] text-[#9a9188] uppercase">
                  Your style
                </p>

                <h3
                  className="text-xl text-[#1b1c1a]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  Elegant & Modern
                </h3>

                <p className="mt-2 text-xs leading-5 text-[#7a6e63]">
                  Perfect pieces selected for your {occasion || "occasion"}.
                </p>

                <div className="mt-3 flex gap-2">
                  <span className="rounded-full bg-[#f5f0e8] px-3 py-1 text-[10px] text-[#7a6e63]">
                    {occasion}
                  </span>

                  <span className="rounded-full bg-[#f5f0e8] px-3 py-1 text-[10px] text-[#7a6e63]">
                    ₹{budget.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation heading */}
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-medium tracking-[0.18em] text-[#9a9188] uppercase">
                AI curated
              </p>

              <h3
                className="mt-1 text-2xl text-[#1b1c1a]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Recommended for you
              </h3>
            </div>

            <span className="text-xs text-[#aaa29a]">
              {recommendations.length} items
            </span>
          </div>

          {/* Products */}
          <div className="grid grid-cols-2 gap-3">
            {recommendations.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-[#e7e2dc] bg-white"
              >
                {/* Product image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f0e8]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <button
                    type="button"
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm"
                  >
                    <Heart
                      size={15}
                      strokeWidth={1.6}
                      className="text-[#7a6e63]"
                    />
                  </button>
                </div>

                {/* Product info */}
                <div className="p-3">
                  <p className="line-clamp-1 text-xs font-medium text-[#3d3935]">
                    {product.name}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-[#1b1c1a]">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>

                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1b1c1a] text-white transition hover:bg-[#C9A96E]"
                    >
                      <ShoppingBag size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why recommendation */}
          <div className="mt-7 rounded-2xl bg-[#f5f0e8] p-5">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-[#C9A96E]" />

              <h4 className="text-sm font-medium text-[#3d3935]">
                Why this look?
              </h4>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="text-[#C9A96E]">✦</span>

                <p className="text-xs leading-5 text-[#7a6e63]">
                  Selected to complement your uploaded style.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="text-[#C9A96E]">✦</span>

                <p className="text-xs leading-5 text-[#7a6e63]">
                  Suitable for your selected occasion.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="text-[#C9A96E]">✦</span>

                <p className="text-xs leading-5 text-[#7a6e63]">
                  Recommendations stay within your budget.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom button */}
          <button
            type="button"
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1b1c1a] text-sm font-medium text-white transition hover:opacity-90"
          >
            <ShoppingBag size={16} />
            View All Recommendations
          </button>

          <p className="mt-4 text-center text-[10px] tracking-wide text-[#aaa29a]">
            Powered by Snitch AI
          </p>
        </div>
      </div>
    </>
  );
}

export default AiRecommendedCard;
