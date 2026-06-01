import { useForm } from "react-hook-form";
import {
  productSchema,
  type ImageType,
  type ProductFormDataType,
} from "../utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useProduct } from "../hooks/useProduct";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/app.store";

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

  const categories = useSelector(
    (state: RootState) => state.category.categories,
  );

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

      formData.append("category", data.category);

      images.forEach((img) => {
        formData.append("images", img.file);
      });

      const res = await handleCreateProduct(formData);

      setImages([]);

      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div
        className="flex min-h-screen flex-col justify-center selection:bg-[#C9A96E]/30 lg:flex-row"
        style={{
          backgroundColor: "#fbf9f6",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* RIGHT PANEL */}
        <div className="flex min-h-screen w-full items-center justify-center px-8 py-16 sm:px-14 lg:w-1/2 lg:px-20">
          <div className="w-full max-w-lg">
            {/* HEADER */}
            <div className="mb-14">
              <p className="mb-4 text-[10px] font-medium tracking-[0.22em] text-[#C9A96E] uppercase">
                Seller Dashboard
              </p>

              <h1 className="text-[2.6rem] leading-[1.1] font-light text-[#1b1c1a] xl:text-5xl">
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
                <label className="text-[10px] font-medium tracking-[0.18em] text-[#7A6E63] uppercase">
                  Product Title
                </label>

                <input
                  type="text"
                  placeholder="Oversized Linen Shirt"
                  {...register("title")}
                  className="w-full border-b border-[#d0c5b5] bg-transparent py-3 text-sm outline-none"
                />

                {errors.title && (
                  <span className="text-[10px] text-red-500">
                    {errors.title.message}
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-medium tracking-[0.18em] text-[#7A6E63] uppercase">
                  Description
                </label>

                <textarea
                  rows={4}
                  placeholder="Describe your product..."
                  {...register("description")}
                  className="w-full resize-none border-b border-[#d0c5b5] bg-transparent py-3 text-sm outline-none"
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
                  <label className="text-[10px] font-medium tracking-[0.18em] text-[#7A6E63] uppercase">
                    Price
                  </label>

                  <input
                    type="number"
                    placeholder="999"
                    {...register("priceAmount", {
                      valueAsNumber: true,
                    })}
                    className="w-full border-b border-[#d0c5b5] bg-transparent py-3 text-sm outline-none"
                  />

                  {errors.priceAmount && (
                    <span className="text-[10px] text-red-500">
                      {errors.priceAmount.message}
                    </span>
                  )}
                </div>

                {/* CURRENCY */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-medium tracking-[0.18em] text-[#7A6E63] uppercase">
                    Currency
                  </label>

                  <select
                    {...register("priceCurrency")}
                    className="w-full border-b border-[#d0c5b5] bg-transparent py-3 text-sm outline-none"
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

              {/* category */}

              <select {...register("category")}>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {/* IMAGE UPLOAD */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-medium tracking-[0.18em] text-[#7A6E63] uppercase">
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
                  className="flex cursor-pointer flex-col items-center justify-center gap-3 border border-dashed border-[#d0c5b5] px-6 py-12 transition-all duration-300"
                  style={{
                    backgroundColor: isDragging
                      ? "rgba(201,169,110,0.06)"
                      : "transparent",
                  }}
                >
                  <div className="flex h-10 w-10 items-center justify-center border border-[#d0c5b5] text-[#B5ADA3]">
                    +
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-[#7A6E63]">
                      Drag & drop images or{" "}
                      <span className="text-[#C9A96E] underline">browse</span>
                    </p>

                    <p className="mt-2 text-[10px] tracking-[0.15em] text-[#B5ADA3] uppercase">
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
                  <div className="mt-2 grid grid-cols-3 gap-3">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden"
                      >
                        <img
                          src={img.preview}
                          alt="preview"
                          className="h-28 w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute inset-0 bg-black/50 text-[10px] tracking-widest text-white uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100"
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
                className="mt-2 w-full bg-[#1b1c1a] py-4 text-[11px] font-medium tracking-[0.25em] text-[#fbf9f6] uppercase transition-all duration-300 hover:bg-[#8e7e61]"
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
