import { useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";
import { useEffect, useState, type ChangeEvent } from "react";
import type { Product, Variant } from "../utils/productTypes";
import { PlusIcon, TrashIcon } from "lucide-react";

interface NewVariantState {
  images: {
    file: File;
    previewUrl: string;
  }[];
  stock: number;
  attributes: Record<string, string>;
  price: {
    amount: string;
    currency: string;
  };
}

const SellerProductDetails = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [localVariants, setLocalVariants] = useState<Variant[]>([]);
  const [isAddingVariant, setIsAddingVariant] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attributeInputs, setAttributeInputs] = useState([
    { key: "", value: "" },
  ]);

  const [newVariant, setNewVariant] = useState<NewVariantState>({
    images: [],
    stock: 0,
    attributes: {},
    price: { amount: "", currency: "INR" },
  });

  const { productId } = useParams<{ productId: string }>();

  const { handleGetProductDetails, handleAddProductVariant } = useProduct();

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const data = await handleGetProductDetails(productId!);
      const prod = data?.product || data;
      setProduct(prod);
      // Initialize variants locally
      if (prod?.variants) {
        setLocalVariants(prod.variants);
      }
      console.log(prod);
    } catch (error) {
      console.error("Failed to fetch product details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const handleStockChange = (index: number, newStock: string) => {
    const updatedVariants = [...localVariants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      stock: Number(newStock),
    };
    setLocalVariants(updatedVariants);
  };

  // Handlers for New Variant Form
  const handleAddNewVariant = async () => {
    // Validate required at least one attribute to be filled
    const hasValidAttribute = attributeInputs.some(
      (attr) => attr.key.trim() && attr.value.trim(),
    );
    if (!hasValidAttribute) {
      alert("At least one valid attribute is required.");
      return;
    }

    // Maps preview URL so the variant list can display the image locally
    const cleanImages = newVariant.images.map((img) => ({
      url: img.previewUrl,
      file: img.file,
    }));

    // Attributes is already an object in newVariant, just use it safely
    const cleanAttributes = { ...newVariant.attributes };

    const variantToSave: Variant = {
      images: cleanImages,
      stock: Number(newVariant.stock),
      attributes: cleanAttributes,
      price: newVariant.price.amount
        ? {
            amount: Number(newVariant.price.amount),
            currency: newVariant.price.currency,
          }
        : undefined,
    };

    setLocalVariants([...localVariants, variantToSave]);
    setIsAddingVariant(false);

    await handleAddProductVariant(productId!, variantToSave);

    // Reset form
    // Note: should ideally revoke old object URLs as well to prevent memory leaks if it were a long-lived SPA
    setAttributeInputs([{ key: "", value: "" }]);
    setNewVariant({
      images: [],
      stock: 0,
      attributes: {},
      price: { amount: "", currency: "INR" },
    });
  };

  const handleAddAttribute = () => {
    setAttributeInputs((prev) => [...prev, { key: "", value: "" }]);
  };

  const handleAttributeChange = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    const updatedInputs = [...attributeInputs];
    updatedInputs[index][field] = value;
    setAttributeInputs(updatedInputs);

    // Synchronize to object format
    const newAttrsObj: Record<string, string> = {};
    updatedInputs.forEach((attr) => {
      if (attr.key.trim() !== "") {
        newAttrsObj[attr.key.trim()] = attr.value;
      }
    });
    setNewVariant((prev) => ({ ...prev, attributes: newAttrsObj }));
  };

  const handleRemoveAttribute = (index: number) => {
    const updatedInputs = attributeInputs.filter((_, i) => i !== index);
    setAttributeInputs(updatedInputs);

    // Synchronize to object format
    const newAttrsObj: Record<string, string> = {};
    updatedInputs.forEach((attr) => {
      if (attr.key.trim() !== "") {
        newAttrsObj[attr.key.trim()] = attr.value;
      }
    });
    setNewVariant((prev) => ({ ...prev, attributes: newAttrsObj }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const availableSlots = 7 - newVariant.images.length;
    const filesToAdd = files.slice(0, availableSlots);

    if (files.length > availableSlots) {
      alert(`You can only upload up to 7 images. ${filesToAdd.length} added.`);
    }

    const newImageObjects = filesToAdd.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setNewVariant((prev) => ({
      ...prev,
      images: [...prev.images, ...newImageObjects],
    }));

    // Clear the input so identical files can be selected again if needed
    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    const imageToRemove = newVariant.images[index];
    if (imageToRemove?.previewUrl) {
      URL.revokeObjectURL(imageToRemove.previewUrl);
    }
    const updatedImages = newVariant.images.filter((_, i) => i !== index);
    setNewVariant((prev) => ({ ...prev, images: updatedImages }));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbf9f6] font-serif text-[#1b1c1a]">
        Loading gallery...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbf9f6] font-serif text-[#1b1c1a]">
        Product Not Found
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#fbf9f6] pb-24 font-sans text-[#1b1c1a]">
        {/* Top Banner / Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between bg-[#fbf9f6]/80 px-6 py-4 backdrop-blur-md">
          <h1 className="font-serif text-xl tracking-wide uppercase">
            {product.title?.substring(0, 20)}
            {product.title?.length > 20 ? "..." : ""}
          </h1>
        </header>

        <main className="mx-auto mt-8 max-w-6xl px-4 md:px-8">
          {/* Base Product Info */}
          <section className="mb-16 flex flex-col gap-8 md:flex-row">
            <div className="w-full md:w-1/2">
              {/* Gallery placeholder */}
              <div className="aspect-4/5 w-full overflow-hidden bg-[#f5f3f0]">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0].url}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[#7f7668]">
                    No Image
                  </div>
                )}
              </div>
              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="mt-2 flex gap-2 overflow-x-auto">
                  {product.images.slice(1).map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      alt={`Thumb ${i}`}
                      className="h-20 w-16 shrink-0 bg-[#f5f3f0] object-cover"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex w-full flex-col justify-center md:w-1/2">
              <h2 className="mb-4 font-serif text-4xl leading-tight uppercase md:text-5xl">
                {product.title}
              </h2>
              <p className="mb-6 max-w-md text-lg leading-relaxed text-[#6e6258]">
                {product.description}
              </p>
              <div className="mb-8 text-2xl font-light tracking-wide">
                {product.price?.amount} {product.price?.currency}
              </div>
            </div>
          </section>

          {/* Variants & Inventory */}
          <section className="bg-[#f5f3f0] p-6 md:p-12">
            <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <h3 className="font-serif text-3xl uppercase">
                Variants & Inventory
              </h3>
              {!isAddingVariant && (
                <button
                  onClick={() => setIsAddingVariant(true)}
                  className="flex cursor-pointer items-center gap-2 bg-[#745a27] px-6 py-3 text-sm tracking-wider text-[#ffffff] uppercase transition-colors hover:bg-[#5a4312]"
                >
                  <PlusIcon /> Add New Variant
                </button>
              )}
            </div>

            {/* Add New Variant Form */}
            {isAddingVariant && (
              <div className="mb-12 bg-[#ffffff] p-6 shadow-[0_20px_40px_rgba(27,28,26,0.04)] md:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <h4 className="font-serif text-xl uppercase">
                    Create Variant
                  </h4>
                  <button
                    onClick={() => setIsAddingVariant(false)}
                    className="cursor-pointer text-sm tracking-wider text-[#7f7668] uppercase hover:text-[#1b1c1a]"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {/* Form Left Col: Attributes & Basics */}
                  <div className="space-y-6">
                    {/* Dynamic Attributes */}
                    <div>
                      <label className="mb-3 block text-sm tracking-wider text-[#6e6258] uppercase">
                        Attributes (e.g. Size, Color) *
                      </label>
                      <div className="space-y-3">
                        {attributeInputs.map((attr, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="Key (e.g., Size)"
                              value={attr.key}
                              onChange={(e) =>
                                handleAttributeChange(
                                  index,
                                  "key",
                                  e.target.value,
                                )
                              }
                              className="w-1/2 border-b border-[#d0c5b5] bg-transparent py-2 placeholder:text-[#d0c5b5] focus:border-[#745a27] focus:outline-none"
                            />
                            <input
                              type="text"
                              placeholder="Value (e.g., M)"
                              value={attr.value}
                              onChange={(e) =>
                                handleAttributeChange(
                                  index,
                                  "value",
                                  e.target.value,
                                )
                              }
                              className="w-1/2 border-b border-[#d0c5b5] bg-transparent py-2 placeholder:text-[#d0c5b5] focus:border-[#745a27] focus:outline-none"
                            />
                            {attributeInputs.length > 1 && (
                              <button
                                onClick={() => handleRemoveAttribute(index)}
                                className="cursor-pointer p-2 text-[#ba1a1a] transition-colors hover:bg-[#ffdad6]"
                              >
                                <TrashIcon />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={handleAddAttribute}
                        className="mt-3 flex cursor-pointer items-center gap-1 text-sm tracking-wider text-[#745a27] uppercase hover:text-[#5a4312]"
                      >
                        <PlusIcon /> Add Attribute
                      </button>
                    </div>

                    {/* Stock & Price */}
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label className="mb-2 block text-sm tracking-wider text-[#6e6258] uppercase">
                          Initial Stock
                        </label>
                        <input
                          type="number"
                          value={newVariant.stock}
                          onChange={(e) =>
                            setNewVariant({
                              ...newVariant,
                              stock: Number(e.target.value),
                            })
                          }
                          className="w-full border-b border-[#d0c5b5] bg-transparent py-2 focus:border-[#745a27] focus:outline-none"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="mb-2 block text-sm tracking-wider text-[#6e6258] uppercase">
                          Price Amount (Optional)
                        </label>
                        <input
                          type="number"
                          value={newVariant.price.amount}
                          onChange={(e) =>
                            setNewVariant({
                              ...newVariant,
                              price: {
                                ...newVariant.price,
                                amount: e.target.value,
                              },
                            })
                          }
                          placeholder="Default if empty"
                          className="w-full border-b border-[#d0c5b5] bg-transparent py-2 placeholder:text-[#d0c5b5] focus:border-[#745a27] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Right Col: Images */}
                  <div>
                    <div className="mb-3 flex items-end justify-between">
                      <label className="block text-sm tracking-wider text-[#6e6258] uppercase">
                        Image Upload (Max 7, Optional)
                      </label>
                      <span className="text-xs text-[#7f7668]">
                        {newVariant.images.length}/7
                      </span>
                    </div>

                    {newVariant.images.length > 0 && (
                      <div className="mb-4 grid grid-cols-3 gap-2">
                        {newVariant.images.map((img, index) => (
                          <div
                            key={index}
                            className="relative aspect-4/5 bg-[#f5f3f0]"
                          >
                            <img
                              src={img.previewUrl}
                              alt="Preview"
                              className="h-full w-full object-cover"
                            />
                            <button
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-1 right-1 cursor-pointer bg-white/80 p-1 text-[#ba1a1a] transition-colors hover:bg-white"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {newVariant.images.length < 7 && (
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="block w-full cursor-pointer text-sm text-[#6e6258] file:mr-4 file:cursor-pointer file:border-0 file:bg-[#f5f3f0] file:px-4 file:py-2 file:font-serif file:text-xs file:tracking-wider file:text-[#1b1c1a] file:uppercase hover:file:bg-[#e4e2df]"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    onClick={handleAddNewVariant}
                    className="cursor-pointer bg-linear-to-r from-[#745a27] to-[#c9a96e] px-8 py-3 text-sm tracking-wider text-[#ffffff] uppercase transition-opacity hover:opacity-90"
                  >
                    Save Variant
                  </button>
                </div>
              </div>
            )}

            {/* Variants List */}
            {localVariants.length === 0 ? (
              <div className="py-12 text-center text-[#6e6258]">
                <p>No variants have been created yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {localVariants.map((variant, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col bg-[#ffffff] pt-4 shadow-[0_20px_40px_rgba(27,28,26,0.02)]"
                  >
                    <div className="mb-4 flex h-24 gap-4 px-6">
                      {/* Variant Thumb */}
                      <div className="h-20 w-16 shrink-0 bg-[#f5f3f0]">
                        {variant.images && variant.images.length > 0 ? (
                          <img
                            src={variant.images[0].url}
                            alt="Variant"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-[#7f7668]">
                            N/A
                          </div>
                        )}
                      </div>
                      {/* Attributes */}
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap gap-2">
                          {Object.entries(variant.attributes || {}).map(
                            ([key, val]) => (
                              <span
                                key={key}
                                className="bg-[#f5f3f0] px-2 py-1 text-xs tracking-wider text-[#4d463a] uppercase"
                              >
                                <span className="text-[#a8a094]">{key}:</span>{" "}
                                {val}
                              </span>
                            ),
                          )}
                        </div>
                        <div className="text-sm font-light">
                          {variant.price?.amount
                            ? `${variant.price.amount} ${variant.price.currency}`
                            : "Base Price"}
                        </div>
                      </div>
                    </div>

                    {/* Stock Management Row */}
                    <div className="mt-auto flex items-center justify-between border-t border-[#f5f3f0] bg-[#fbf9f6] px-6 py-3">
                      <label className="text-sm tracking-wider text-[#6e6258] uppercase">
                        Current Stock
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={variant.stock || 0}
                          onChange={(e) =>
                            handleStockChange(idx, e.target.value)
                          }
                          className="w-20 border-b border-[#d0c5b5] bg-transparent py-1 text-right font-serif text-lg focus:border-[#745a27] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default SellerProductDetails;
