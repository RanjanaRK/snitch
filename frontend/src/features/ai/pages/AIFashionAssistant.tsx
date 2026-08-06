import { Sparkles, UploadCloud } from "lucide-react";

const AIFashionAssistant = () => {
  return (
    <>
      <div className="">
        <h1>AI Fashion Assistant</h1>
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
          <div className="w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            {/* Header */}
            <div className="mb-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-100">
                <Sparkles className="h-7 w-7 text-violet-600" />
              </div>

              <h1 className="mt-4 text-3xl font-bold text-slate-900">
                AI Fashion Assistant
              </h1>

              <p className="mt-2 text-slate-500">
                Upload an outfit inspiration image and let AI recommend similar
                fashion products.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Upload Section */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Upload Image
                </label>

                <label className="flex h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-violet-500 hover:bg-violet-50">
                  <UploadCloud className="mb-4 h-12 w-12 text-slate-400" />

                  <p className="font-medium text-slate-700">
                    Drag & Drop Image
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    PNG, JPG, WEBP (Max 5MB)
                  </p>

                  <span className="mt-5 rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white">
                    Choose Image
                  </span>

                  <input type="file" className="hidden" />
                </label>
              </div>

              {/* Form */}
              <div className="space-y-5">
                {/* Prompt */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Prompt (Optional)
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Example: Find a black party dress with long sleeves..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  />
                </div>

                {/* Occasion */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Occasion
                  </label>

                  <select className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500">
                    <option>Casual</option>
                    <option>Party</option>
                    <option>Wedding</option>
                    <option>Office</option>
                    <option>Vacation</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Budget
                  </label>

                  <input
                    type="number"
                    placeholder="₹ 3000"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500"
                  />
                </div>

                {/* Button */}
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-4 font-semibold text-white transition hover:bg-violet-700">
                  <Sparkles size={20} />
                  Get Recommendation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIFashionAssistant;
