// // // import { useParams } from "react-router";
// // // import ReviewSummary from "../components/ReviewSummary";
// // // import ReviewsSection from "../components/ReviewsSection";

// // // const Reviews = () => {
// // //   const { productId } = useParams<{ productId: string }>();

// // //   if (!productId) {
// // //     return <div>Product ID not found</div>;
// // //   }

// // //   return (
// // //     <div>
// // //       <ReviewSummary productId={productId} />
// // //       <ReviewsSection productId={productId} showAll />
// // //     </div>
// // //   );
// // // };

// // // export default Reviews;

// // import { ArrowLeft } from "lucide-react";
// // import { Link, useParams } from "react-router";
// // import ReviewSummary from "../components/ReviewSummary";
// // import ReviewsSection from "../components/ReviewsSection";

// // const Reviews = () => {
// //   const { productId } = useParams<{ productId: string }>();

// //   if (!productId) {
// //     return (
// //       <div className="flex min-h-[60vh] items-center justify-center px-6">
// //         <div className="text-center">
// //           <p className="text-sm text-gray-500">Product ID not found</p>

// //           <Link
// //             to="/"
// //             className="mt-4 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
// //           >
// //             <ArrowLeft size={15} />
// //             Back to shopping
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <main className="min-h-screen bg-[#faf9f7]">
// //       <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
// //         {/* Back */}
// //         <Link
// //           to={`/product/${productId}`}
// //           className="mb-10 inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-[#555] uppercase transition-colors hover:text-[#A8874F]"
// //         >
// //           <ArrowLeft size={14} strokeWidth={1.5} />
// //           Back to product
// //         </Link>

// //         {/* Header */}
// //         <header className="mb-14 max-w-2xl">
// //           <p className="mb-3 text-[10px] font-medium tracking-[0.3em] text-[#A8874F] uppercase">
// //             Customer Experience
// //           </p>

// //           <h1
// //             className="text-5xl leading-[0.95] font-light tracking-tight text-[#1b1c1a] sm:text-6xl"
// //             style={{
// //               fontFamily: "'Cormorant Garamond', serif",
// //             }}
// //           >
// //             What Our Customers
// //             <br />
// //             <span className="italic">Really Think</span>
// //           </h1>

// //           <p className="mt-6 max-w-xl text-sm leading-7 text-[#777]">
// //             Honest experiences from customers who have purchased and worn this
// //             product.
// //           </p>
// //         </header>

// //         {/* Main content */}
// //         <div className="space-y-16">
// //           {/* AI Review Summary */}
// //           <section className="rounded-sm border border-[#e8e4dd] bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
// //             <ReviewSummary productId={productId} />
// //           </section>

// //           {/* Divider */}
// //           <div className="flex items-center gap-5">
// //             <div className="h-px flex-1 bg-[#dedad2]" />

// //             <span className="text-[10px] tracking-[0.25em] text-[#A8874F] uppercase">
// //               All Reviews
// //             </span>

// //             <div className="h-px flex-1 bg-[#dedad2]" />
// //           </div>

// //           {/* Reviews */}
// //           <section>
// //             <ReviewsSection productId={productId} showAll />
// //           </section>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // };

// // export default Reviews;

// import { ArrowLeft } from "lucide-react";
// import { Link, useParams } from "react-router";
// import ReviewSummary from "../components/ReviewSummary";
// import ReviewsSection from "../components/ReviewsSection";

// const Reviews = () => {
//   const { productId } = useParams<{ productId: string }>();

//   if (!productId) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <p className="text-sm text-gray-500">Product ID not found</p>
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-white">
//       <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
//         {/* Top navigation */}
//         <div className="mb-8">
//           <Link
//             to={`/product/${productId}`}
//             className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
//           >
//             <ArrowLeft size={16} />
//             Back to product
//           </Link>
//         </div>

//         {/* Page heading */}
//         <div className="border-b border-gray-200 pb-8">
//           <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
//             Customer Reviews
//           </h1>

//           <p className="mt-2 text-sm text-gray-500">
//             See what customers are saying about this product.
//           </p>
//         </div>

//         {/* Review summary */}
//         <section className="border-b border-gray-200 py-10">
//           <ReviewSummary productId={productId} />
//         </section>

//         {/* Reviews */}
//         <section className="py-10">
//           <ReviewsSection productId={productId} showAll />
//         </section>
//       </div>
//     </main>
//   );
// };

// export default Reviews;

import { ArrowLeft, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router";
import ReviewSummary from "../components/ReviewSummary";
import ReviewsSection from "../components/ReviewsSection";

const Reviews = () => {
  const { productId } = useParams<{ productId: string }>();

  if (!productId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fbf9f6]">
        <div className="text-center">
          <p className="text-[10px] tracking-[0.25em] text-[#A8874F] uppercase">
            VESTRA.
          </p>

          <p className="mt-3 text-sm text-[#7A6E63]">Product ID not found</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbf9f6]">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        {/* Back navigation */}
        <div className="mb-12">
          <Link
            to={`/product/${productId}`}
            className="group inline-flex items-center gap-2 text-[10px] tracking-[0.18em] text-[#7A6E63] uppercase transition-colors duration-300 hover:text-[#A8874F]"
          >
            <ArrowLeft
              size={15}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to product
          </Link>
        </div>

        {/* Hero */}
        <header className="border-b border-[#e4e0da] pb-12 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C9A96E]" />

            <p className="text-[10px] tracking-[0.3em] text-[#A8874F] uppercase">
              Customer Experience
            </p>

            <span className="h-px w-8 bg-[#C9A96E]" />
          </div>

          <h1
            className="text-5xl font-light tracking-tight text-[#1b1c1a] sm:text-6xl"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            What Our Customers Say
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#7A6E63]">
            Discover authentic experiences from customers who have purchased and
            experienced this piece.
          </p>
        </header>

        {/* Summary */}
        <section className="border-b border-[#e4e0da] py-12">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3eee5]">
              <Sparkles
                size={16}
                strokeWidth={1.5}
                className="text-[#A8874F]"
              />
            </div>

            <div>
              <p className="text-[10px] tracking-[0.2em] text-[#A8874F] uppercase">
                Review Insights
              </p>

              <p className="mt-0.5 text-xs text-[#9a9188]">
                A quick look at customer feedback
              </p>
            </div>
          </div>

          <div className="border border-[#e5e0d8] bg-white p-6 shadow-[0_10px_40px_rgba(80,65,45,0.04)] sm:p-8">
            <ReviewSummary productId={productId} />
          </div>
        </section>

        {/* Reviews */}
        <section className="">
          {/* Section heading */}
          {/* <div className="mb-8 flex items-end justify-between border-b border-[#e4e0da] pb-6"></div> */}
          <ReviewsSection productId={productId} showAll />

          {/* Review list */}
        </section>
      </div>
    </main>
  );
};

export default Reviews;
