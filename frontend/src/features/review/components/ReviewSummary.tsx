// import { useEffect, useState } from "react";
// import useReview from "../hooks/useReview";
// import type { ReviewSummary as ReviewSummaryType } from "../utils/types";

// type Props = {
//   productId: string;
// };

// const ReviewSummary = ({ productId }: Props) => {
//   const { handleGetReviewSummary } = useReview();

//   const [summary, setSummary] = useState<ReviewSummaryType | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         const response = await handleGetReviewSummary(productId);

//         setSummary(response.summary);
//         console.log({ summary });
//       } catch (error) {
//         // 404 simply means summary hasn't been generated yet
//         setSummary(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSummary();
//   }, [productId]);

//   if (loading) {
//     return <p>Loading customer insights...</p>;
//   }

//   if (!summary) {
//     return null;
//   }

//   //   const { handleRegenerateReviewSummary } = useReview();

//   //   const [, setRegenerating] = useState(false);

//   //   const handleRegenerate = async () => {
//   //     try {
//   //       setRegenerating(true);

//   //       const response = await handleRegenerateReviewSummary(productId);

//   //       setSummary(response.savedSummary);
//   //     } catch (error) {
//   //       console.error(error);
//   //     } finally {
//   //       setRegenerating(false);
//   //     }
//   //   };

//   return (
//     <section className="space-y-6">
//       <div>
//         <h2 className="text-xl font-semibold">What Customers Say</h2>

//         <p className="mt-2 text-sm text-gray-600">{summary.summary} aaa</p>

//         <p className="mt-2 text-xs text-gray-500">
//           Based on {summary.generatedFromReviewCount} reviews
//         </p>
//       </div>

//       <div>
//         <h3 className="font-semibold">Pros</h3>

//         <ul className="mt-2 space-y-2">
//           {summary.pros.map((pro) => (
//             <li key={pro}>✓ {pro}</li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h3 className="font-semibold">Cons</h3>

//         <ul className="mt-2 space-y-2">
//           {summary.cons.map((con) => (
//             <li key={con}>× {con}</li>
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// };

// export default ReviewSummary;

import { Check, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import useReview from "../hooks/useReview";
import type { ReviewSummary as ReviewSummaryType } from "../utils/types";

type Props = {
  productId: string;
};

const ReviewSummary = ({ productId }: Props) => {
  const { handleGetReviewSummary } = useReview();

  const [summary, setSummary] = useState<ReviewSummaryType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await handleGetReviewSummary(productId);

        setSummary(response.summary);
      } catch (error) {
        setSummary(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [productId]);

  /* Loading */
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="mb-6 h-5 w-40 rounded bg-[#eee9e2]" />
        <div className="h-4 w-full rounded bg-[#eee9e2]" />
        <div className="mt-2 h-4 w-4/5 rounded bg-[#eee9e2]" />

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="h-32 rounded-2xl bg-[#f5f1eb]" />
          <div className="h-32 rounded-2xl bg-[#f5f1eb]" />
        </div>
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <section className="relative overflow-hidden">
      {/* subtle decorative glow */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[#C9A96E]/[0.05] blur-3xl" />

      {/* HEADER */}
      <div className="relative mb-8 flex items-end justify-between gap-6">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Sparkles size={13} strokeWidth={1.5} className="text-[#A8874F]" />

            <span className="text-[9px] font-medium tracking-[0.25em] text-[#A8874F] uppercase">
              AI Customer Insights
            </span>
          </div>

          <h2
            className="text-3xl font-light tracking-tight text-[#1b1c1a] sm:text-4xl"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            What Customers Say
          </h2>

          <p className="mt-1.5 max-w-xl text-xs leading-5 text-[#7A6E63]">
            A concise AI-generated overview of customer feedback.
          </p>
        </div>

        {/* REVIEW COUNT */}
        <div className="hidden border-l border-[#ded9d1] pl-5 text-right sm:block">
          <p className="text-2xl font-light text-[#1b1c1a]">
            {summary.generatedFromReviewCount}
          </p>

          <p className="mt-0.5 text-[8px] tracking-[0.16em] text-[#aaa19a] uppercase">
            Reviews analyzed
          </p>
        </div>
      </div>

      {/* MAIN SUMMARY */}
      <div className="relative border-y border-[#dcd7cf] py-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-px w-6 bg-[#C9A96E]" />

          <span className="text-[8px] font-medium tracking-[0.22em] text-[#A8874F] uppercase">
            The overall feeling
          </span>
        </div>

        <p className="max-w-4xl text-[15px] leading-7 text-[#3f3934]">
          {summary.summary}
        </p>

        <p className="mt-3 text-[8px] tracking-[0.14em] text-[#aaa19a] uppercase">
          Based on {summary.generatedFromReviewCount} customer reviews
        </p>
      </div>

      {/* PROS / CONS */}
      <div className="grid border-b border-[#dcd7cf] sm:grid-cols-2">
        {/* PROS */}
        <div className="py-6 sm:border-r sm:border-[#dcd7cf] sm:pr-8">
          <div className="mb-4 flex items-center gap-2.5">
            <Check size={15} strokeWidth={1.7} className="text-[#64745d]" />

            <div>
              <h3 className="text-xs font-medium text-[#1b1c1a]">
                What customers love
              </h3>

              <p className="mt-0.5 text-[8px] tracking-[0.15em] text-[#aaa19a] uppercase">
                Highlights
              </p>
            </div>
          </div>

          <ul className="space-y-2.5">
            {summary.pros.map((pro, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 text-xs leading-5 text-[#554e48]"
              >
                <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-[#C9A96E]" />

                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CONS */}
        <div className="border-t border-[#dcd7cf] py-6 sm:border-t-0 sm:pl-8">
          <div className="mb-4 flex items-center gap-2.5">
            <X size={15} strokeWidth={1.7} className="text-[#a27868]" />

            <div>
              <h3 className="text-xs font-medium text-[#1b1c1a]">
                Things to consider
              </h3>

              <p className="mt-0.5 text-[8px] tracking-[0.15em] text-[#aaa19a] uppercase">
                Customer concerns
              </p>
            </div>
          </div>

          <ul className="space-y-2.5">
            {summary.cons.map((con, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 text-xs leading-5 text-[#554e48]"
              >
                <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-[#b89582]" />

                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-end gap-1.5 pt-4">
        <Sparkles size={10} strokeWidth={1.5} className="text-[#C9A96E]" />

        <span className="text-[8px] tracking-[0.16em] text-[#aaa19a] uppercase">
          AI-generated from customer reviews
        </span>
      </div>
    </section>
  );
};

export default ReviewSummary;
