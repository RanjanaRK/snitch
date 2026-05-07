import CreateProductCard from "../components/CreateProductCard";

// type ImageType = { file: File; preview: string };

// const MAX_IMAGES = 5;

// const CURRENCIES = ["INR", "USD", "EUR"];

const CreateProduct = () => {
  //   const navigate = useNavigate();
  //   const { handleCreateProduct } = useProduct();
  //   const fileInputRef = useRef<HTMLInputElement | null>(null);
  //   const [images, setImages] = useState<ImageType[]>([]);
  //   const [isDragging, setIsDragging] = useState(false);
  //   const [isSubmitting, setIsSubmitting] = useState(false);
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<ProductFormData>({
  //     resolver: zodResolver(productSchema),
  //     defaultValues: {
  //       title: "",
  //       description: "",
  //       priceAmount: 0,
  //       priceCurrency: "INR",
  //     },
  //   });
  //   const addImages = (files: FileList | File[]) => {
  //     const remainingSlots = MAX_IMAGES - images.length;
  //     const selectedFiles = Array.from(files).slice(0, remainingSlots);
  //     const mappedImages = selectedFiles.map((file) => ({
  //       file,
  //       preview: URL.createObjectURL(file),
  //     }));
  //     setImages((prev) => [...prev, ...mappedImages]);
  //   };
  //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (e.target.files) {
  //       addImages(e.target.files);
  //     }
  //   };
  //   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  //     e.preventDefault();
  //     setIsDragging(false);
  //     if (e.dataTransfer.files) {
  //       addImages(e.dataTransfer.files);
  //     }
  //   };
  //   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  //     e.preventDefault();
  //     setIsDragging(true);
  //   };
  //   const handleDragLeave = () => {
  //     setIsDragging(false);
  //   };
  //   const removeImage = (index: number) => {
  //     setImages((prev) => prev.filter((_, i) => i !== index));
  //   };
  //   const onSubmit = async (data: ProductFormData) => {
  //     try {
  //       if (images.length === 0) {
  //         return toast.error("Please upload at least one image");
  //       }
  //       setIsSubmitting(true);
  //       const formData = new FormData();
  //       formData.append("title", data.title);
  //       formData.append("description", data.description);
  //       formData.append("priceAmount", String(data.priceAmount));
  //       formData.append("priceCurrency", data.priceCurrency);
  //       images.forEach((img) => {
  //         formData.append("images", img.file);
  //       });
  //       const response = await handleCreateProduct(formData);
  //       toast.success(response.message);
  //       navigate("/");
  //     } catch (error: any) {
  //       toast.error(error.message || "Failed to create product");
  //     } finally {
  //       setIsSubmitting(false);
  //     }
  //   };
  return (
    <>
      <CreateProductCard />
    </>
  );
};
export default CreateProduct;
