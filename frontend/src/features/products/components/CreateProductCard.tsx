import { useForm } from "react-hook-form";
import {
  productSchema,
  type ImageType,
  type ProductFormDataType,
} from "../utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useProduct } from "../hooks/useProduct";

const CURRENCIES = ["INR", "USD", "EUR", "GBP"];
const MAX_IMAGES = 7;

// type ImageType = {
//   file: File;
//   preview: string;
// };

const CreateProductCard = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [images, setImages] = useState<ImageType[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleCreateProduct } = useProduct();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormDataType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      priceAmount: 0,
      priceCurrency: "INR",
    },
  });

  const addImages = (files: FileList | File[]) => {
    const remainingSlots = MAX_IMAGES - images.length;

    const selectedFiles = Array.from(files).slice(0, remainingSlots);

    const mappedImages = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...mappedImages]);
  };

  // FILE CHANGE
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addImages(e.target.files);
    }
  };

  // DROP
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setIsDragging(false);

    if (e.dataTransfer.files) {
      addImages(e.dataTransfer.files);
    }
  };

  // DRAG OVER
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setIsDragging(true);
  };

  // DRAG LEAVE
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // REMOVE IMAGE
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProductFormDataType) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("title", data.title);

      formData.append("description", data.description);

      formData.append("priceAmount", String(data.priceAmount));

      formData.append("priceCurrency", data.priceCurrency);

      images.forEach((img) => {
        formData.append("images", img.file);
      });

      await handleCreateProduct(formData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div
        className="min-h-screen flex flex-col lg:flex-row justify-center selection:bg-[#C9A96E]/30"
        style={{
          backgroundColor: "#fbf9f6",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* RIGHT PANEL */}
        <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen px-8 sm:px-14 lg:px-20 py-16">
          <div className="w-full max-w-lg">
            {/* HEADER */}
            <div className="mb-14">
              <p className="text-[10px] uppercase tracking-[0.22em] mb-4 font-medium text-[#C9A96E]">
                Seller Dashboard
              </p>

              <h1 className="text-[2.6rem] xl:text-5xl font-light leading-[1.1] text-[#1b1c1a]">
                Create Product
              </h1>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-10"
            >
              {/* TITLE */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#7A6E63]">
                  Product Title
                </label>

                <input
                  type="text"
                  placeholder="Oversized Linen Shirt"
                  {...register("title")}
                  className="w-full bg-transparent outline-none py-3 text-sm border-b border-[#d0c5b5]"
                />

                {errors.title && (
                  <span className="text-[10px] text-red-500">
                    {errors.title.message}
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#7A6E63]">
                  Description
                </label>

                <textarea
                  rows={4}
                  placeholder="Describe your product..."
                  {...register("description")}
                  className="w-full bg-transparent outline-none py-3 text-sm border-b border-[#d0c5b5] resize-none"
                />

                {errors.description && (
                  <span className="text-[10px] text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </div>

              {/* PRICE */}
              <div className="grid grid-cols-2 gap-6">
                {/* AMOUNT */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#7A6E63]">
                    Price
                  </label>

                  <input
                    type="number"
                    placeholder="999"
                    {...register("priceAmount")}
                    className="w-full bg-transparent outline-none py-3 text-sm border-b border-[#d0c5b5]"
                  />

                  {errors.priceAmount && (
                    <span className="text-[10px] text-red-500">
                      {errors.priceAmount.message}
                    </span>
                  )}
                </div>

                {/* CURRENCY */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#7A6E63]">
                    Currency
                  </label>

                  <select
                    {...register("priceCurrency")}
                    className="w-full bg-transparent outline-none py-3 text-sm border-b border-[#d0c5b5]"
                  >
                    {CURRENCIES.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}

                    <option value="">INR</option>
                  </select>
                </div>
              </div>

              {/* IMAGE UPLOAD */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#7A6E63]">
                    Product Images
                  </label>

                  <span className="text-[10px] text-[#B5ADA3]">
                    {images.length}/{MAX_IMAGES}
                  </span>
                </div>

                {/* DROP ZONE */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-[#d0c5b5] px-6 py-12 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor: isDragging
                      ? "rgba(201,169,110,0.06)"
                      : "transparent",
                  }}
                >
                  <div className="w-10 h-10 border border-[#d0c5b5] flex items-center justify-center text-[#B5ADA3]">
                    +
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-[#7A6E63]">
                      Drag & drop images or{" "}
                      <span className="text-[#C9A96E] underline">browse</span>
                    </p>

                    <p className="text-[10px] uppercase tracking-[0.15em] mt-2 text-[#B5ADA3]">
                      Maximum {MAX_IMAGES} images
                    </p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* PREVIEW */}
                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="relative group overflow-hidden"
                      >
                        <img
                          src={img.preview}
                          alt="preview"
                          className="w-full h-28 object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] uppercase tracking-widest"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-[11px] hover:bg-[#8e7e61] uppercase tracking-[0.25em] font-medium transition-all duration-300 mt-2 bg-[#1b1c1a] text-[#fbf9f6]"
              >
                {isSubmitting ? "Publishing..." : "Publish Product"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProductCard;
