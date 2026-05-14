const SellerProductDetails = () => {
  return (
    <>
      {/* Add Variant Button */}
      <div className="mb-8 flex justify-end">
        <button className="cursor-pointer bg-[#745a27] px-6 py-3 text-sm tracking-[0.2em] text-white uppercase transition hover:opacity-90">
          Add Variant
        </button>
      </div>

      {/* Variant Form */}
      <div className="mb-10 border border-[#ece7df] bg-white p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-[Cormorant_Garamond] text-2xl tracking-[0.2em] text-[#1b1c1a] uppercase">
            Create Variant
          </h2>

          <button className="cursor-pointer text-sm tracking-[0.2em] text-[#8b8175] uppercase hover:text-black">
            Close
          </button>
        </div>

        {/* Color & Price */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-3 block text-xs tracking-[0.2em] text-[#8b8175] uppercase">
              Color
            </label>

            <input
              type="text"
              placeholder="Black"
              className="w-full border-b border-[#d8d1c7] bg-transparent py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-3 block text-xs tracking-[0.2em] text-[#8b8175] uppercase">
              Price
            </label>

            <input
              type="number"
              placeholder="799"
              className="w-full border-b border-[#d8d1c7] bg-transparent py-3 outline-none focus:border-black"
            />
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-8">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-sm tracking-[0.15em] text-[#5c5348] uppercase">
              Sizes & Stock
            </h3>

            <button className="cursor-pointer border border-black px-4 py-2 text-xs tracking-[0.2em] uppercase transition hover:bg-black hover:text-white">
              Add Size
            </button>
          </div>

          {/* Size Row */}
          <div className="mb-4 grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Size"
              className="border-b border-[#d8d1c7] bg-transparent py-3 outline-none focus:border-black"
            />

            <input
              type="number"
              placeholder="Stock"
              className="border-b border-[#d8d1c7] bg-transparent py-3 outline-none focus:border-black"
            />

            <button className="cursor-pointer border border-red-400 text-xs tracking-[0.2em] text-red-500 uppercase transition hover:bg-red-500 hover:text-white">
              Remove
            </button>
          </div>
        </div>

        {/* Upload */}
        <div className="mb-10">
          <label className="mb-4 block text-xs tracking-[0.2em] text-[#8b8175] uppercase">
            Upload Images
          </label>

          <input
            type="file"
            multiple
            className="block w-full cursor-pointer text-sm text-[#6e6258] file:mr-4 file:border-0 file:bg-[#f5f3f0] file:px-5 file:py-3 file:text-xs file:tracking-[0.2em] file:text-[#1b1c1a] file:uppercase hover:file:bg-[#ebe7e2]"
          />
        </div>

        {/* Submit */}
        <button className="w-full cursor-pointer bg-gradient-to-r from-[#745a27] to-[#c9a96e] py-4 text-sm tracking-[0.2em] text-white uppercase transition hover:opacity-90">
          Save Variant
        </button>
      </div>
    </>
  );
};

export default SellerProductDetails;
