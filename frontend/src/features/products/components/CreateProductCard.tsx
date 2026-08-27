import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import type { RootState } from "../../../app/app.store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { OCCASIONS, STYLES } from "../../../constants/product";
import { useCategory } from "../../category/hooks/useCategory";
import type { Category } from "../../category/utils/types";
import { useProduct } from "../hooks/useProduct";
import {
  productSchema,
  type ImageType,
  type ProductFormDataType,
} from "../utils/zodSchema";

const CURRENCIES = ["INR", "USD", "EUR", "GBP"];
const MAX_IMAGES = 7;

const CreateProductCard = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [images, setImages] = useState<ImageType[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedParent, setSelectedParent] = useState("");
  const [subCategories, setSubCategories] = useState<Category[]>([]);

  const { handleCreateProduct } = useProduct();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormDataType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      priceAmount: 0,
      priceCurrency: "INR",
      category: "",
      style: "",
      occasions: [],
      keywords: "",
      color: "",
      images: [],
    },
  });

  const categories = useSelector(
    (state: RootState) => state.category.categories,
  );

  // console.log({ categories });

  const { handleGetSubCategories, handleGetCategories } = useCategory();

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

      formData.append("style", data.style);

      data.occasions.forEach((occasion) => {
        formData.append("occasions", occasion);
      });

      formData.append("color", data.color);

      const keywordArray = data.keywords
        .split(",")
        .map((keyword) => keyword.trim().toLowerCase())
        .filter(Boolean);

      formData.append("keywords", JSON.stringify(keywordArray));

      images.forEach((img: any) => {
        formData.append("images", img.file);
      });

      const res = await handleCreateProduct(formData);

      setImages([]);
      setSelectedParent("");
      setSubCategories([]);

      reset();

      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      handleGetCategories();
    }
    // handleGetSubCategories(selectedParent);
  }, []);

  return (
    <>
      <div
        className="flex min-h-screen flex-col justify-center selection:bg-[#B89455]/30 lg:flex-row"
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
              <p className="mb-4 text-[10px] tracking-[0.22em] text-[#B89455] uppercase">
                Seller Dashboard
              </p>

              <h1
                className="text-5xl font-light"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Create New Piece
              </h1>

              <p className="mt-4 text-sm text-[#7A6E63]">
                Add a product to your luxury collection.
              </p>
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

              {/* GENDER */}

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-medium tracking-[0.22em] text-[#7A6E63] uppercase">
                  Gender
                </label>

                <Select
                  value={selectedParent}
                  onValueChange={async (parentId) => {
                    setSelectedParent(parentId);

                    if (!parentId) {
                      setSubCategories([]);
                      return;
                    }

                    const data = await handleGetSubCategories(parentId);
                    setSubCategories(data);
                  }}
                >
                  <SelectTrigger className="h-12 w-full rounded-none border-0 border-b border-[#d0c5b5] bg-transparent px-0 shadow-none focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>

                  <SelectContent
                    className="border-[#e4e2df] bg-[#fbf9f6] shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                    position="popper"
                  >
                    {categories.map((category) => (
                      <SelectItem
                        key={category._id}
                        value={category._id}
                        className="cursor-pointer text-[#1b1c1a] focus:bg-[#f3ede4] focus:text-[#1b1c1a]"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* CATEGORY */}

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-medium tracking-[0.22em] text-[#7A6E63] uppercase">
                  Category
                </label>

                <Select onValueChange={(value) => setValue("category", value)}>
                  <SelectTrigger className="h-12 w-full rounded-none border-0 border-b border-[#d0c5b5] bg-transparent px-0 shadow-none focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>

                  <SelectContent
                    className="border-[#e4e2df] bg-[#fbf9f6] shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                    position="popper"
                  >
                    {subCategories.map((subcategory: any) => (
                      <SelectItem
                        key={subcategory._id}
                        value={subcategory._id}
                        className="cursor-pointer text-[#1b1c1a] focus:bg-[#f3ede4] focus:text-[#1b1c1a]"
                      >
                        {subcategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* STYLE */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-medium tracking-[0.22em] text-[#7A6E63] uppercase">
                  Style
                </label>

                {/* <Select>
                  <SelectTrigger className="w-full rounded-none border-b border-[#d0c5b5] bg-transparent">
                    <SelectValue placeholder="Select Style" />
                  </SelectTrigger>

                  <SelectContent className="border-[#e4e2df] bg-[#fbf9f6]">
                    {STYLES.map((style) => (
                      <SelectItem
                        key={style}
                        value={style}
                        className="cursor-pointer tracking-wide hover:bg-[#f3ede4] focus:bg-[#f3ede4]"
                      >
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}

                <Select onValueChange={(value) => setValue("style", value)}>
                  <SelectTrigger className="w-full rounded-none border-b border-[#d0c5b5] bg-transparent">
                    <SelectValue placeholder="Select Style" />
                  </SelectTrigger>

                  <SelectContent className="border-[#e4e2df] bg-[#fbf9f6]">
                    {STYLES.map((style) => (
                      <SelectItem
                        key={style}
                        value={style}
                        className="cursor-pointer tracking-wide hover:bg-[#f3ede4] focus:bg-[#f3ede4]"
                      >
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.style && (
                  <p className="text-[11px] text-red-500">
                    {errors.style.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label>Occasions</label>

                <div className="grid grid-cols-2 gap-3">
                  {OCCASIONS.map((occasion) => (
                    <label className="flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        value={occasion}
                        {...register("occasions")}
                        className="h-4 w-4 accent-[#B89455]"
                      />

                      <span className="text-sm text-[#1b1c1a]">{occasion}</span>
                    </label>
                  ))}
                </div>

                {errors.occasions && (
                  <p className="text-sm text-red-500">
                    {errors.occasions.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-medium tracking-[0.18em] text-[#7A6E63] uppercase">
                  Color
                </label>

                <input
                  type="text"
                  placeholder="eg. Red"
                  {...register("color")}
                  className="w-full border-b border-[#d0c5b5] bg-transparent py-3 text-sm outline-none"
                />

                {errors.color && (
                  <span className="text-[10px] text-red-500">
                    {errors.color.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-medium tracking-[0.18em] text-[#7A6E63] uppercase">
                  Keywords
                </label>

                <input
                  type="text"
                  className="w-full border-b border-[#d0c5b5] bg-transparent py-3 text-sm outline-none"
                  placeholder="eg. denim, high waist, straight fit, casual, ribbed, A-line"
                  {...register("keywords")}
                />
              </div>

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
                  // className="border border-dashed border-[#d0c5b5] py-16 transition-all duration-300 hover:border-[#B89455]"
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
                      <span className="text-[#B89455] underline">browse</span>
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
                        className="group relative border border-[#e4e2df]"
                      >
                        <img
                          src={img.preview}
                          alt="preview"
                          className="h-32 w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                className="sticky bottom-6 w-full bg-[#1b1c1a] py-4 text-[11px] tracking-[0.25em] text-white uppercase transition-all duration-300 hover:bg-[#B89455] hover:text-[#1b1c1a]"
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
