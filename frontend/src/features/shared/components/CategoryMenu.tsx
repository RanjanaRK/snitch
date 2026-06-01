import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import type { RootState } from "../../../app/app.store";
import { useCategory } from "../../category/hooks/useCategory";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const CategoryMenu = () => {
  const navigate = useNavigate();

  const categories = useSelector(
    (state: RootState) => state.category.categories,
  );

  const { handleGetCategories, handleGetSubCategories } = useCategory();
  const [selectedParent, setSelectedParent] = useState("");
  const [, setSubCategories] = useState<any[]>([]);
  const [subCategoriesMap, setSubCategoriesMap] = useState<
    Record<string, any[]>
  >({});

  useEffect(() => {
    if (categories.length === 0) {
      handleGetCategories();
    }
  }, []);

  // Auto load first category's subcategories
  useEffect(() => {
    const loadInitialSubCategories = async () => {
      if (categories.length > 0 && !selectedParent) {
        const firstCategory = categories[0];

        setSelectedParent(firstCategory._id);

        const data = await handleGetSubCategories(firstCategory._id);

        setSubCategories(data);
      }
    };

    loadInitialSubCategories();
  }, [categories]);

  const handleParentCategoryHover = async (parentId: string) => {
    if (subCategoriesMap[parentId]) return;

    const data = await handleGetSubCategories(parentId);

    setSubCategoriesMap((prev) => ({
      ...prev,
      [parentId]: data,
    }));
  };
  return (
    <div className="flex border-b border-[#e4e2df] bg-[#fbf9f6]">
      {categories.map((category) => (
        <DropdownMenu key={category._id}>
          <DropdownMenuTrigger asChild>
            <button
              onMouseEnter={() => handleParentCategoryHover(category._id)}
              className="flex items-center gap-2 text-sm tracking-[0.2em] uppercase"
            >
              {category.name}
              <ChevronDown size={14} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem
              onClick={() => navigate(`/?parentCategory=${category._id}`)}
            >
              All {category.name}
            </DropdownMenuItem>

            {subCategoriesMap[category._id]?.map((subcategory) => (
              <DropdownMenuItem
                key={subcategory._id}
                onClick={() => navigate(`/?category=${subcategory._id}`)}
              >
                {subcategory.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
  );
};

export default CategoryMenu;
