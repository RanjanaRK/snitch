const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col rounded-2xl">
      {/* Image Skeleton */}
      <div className="relative mb-6 aspect-4/5 overflow-hidden bg-[#e9e5df]">
        <div className="absolute inset-0 animate-pulse bg-[#e9e5df]" />
      </div>

      {/* Product Details Skeleton */}
      <div className="flex flex-col gap-3">
        {/* Curated Piece */}
        <div className="h-3 w-24 animate-pulse rounded bg-[#e4e0da]" />

        {/* Title */}
        <div className="h-6 w-3/4 animate-pulse rounded bg-[#e4e0da]" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-[#e9e5df]" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-[#e9e5df]" />
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center justify-between">
          <div className="h-4 w-20 animate-pulse rounded bg-[#e4e0da]" />

          <div className="h-3 w-16 animate-pulse rounded bg-[#e9e5df]" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
