import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { ChevronDown } from "lucide-react";
import type { RootState } from "../../../app/app.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useCategory } from "../../category/hooks/useCategory";

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
    <div className="flex gap-8">
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

          <DropdownMenuContent
            align="start"
            sideOffset={18}
            className="w-64 border border-[#e8e2d9] bg-[#fbf9f6]/95 p-2 shadow-[0_25px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl"
          >
            <div className="px-3 py-2">
              <p className="text-[9px] tracking-[0.3em] text-[#C9A96E] uppercase">
                Collection
              </p>
            </div>
            <DropdownMenuItem
              onClick={() => navigate(`/?parentCategory=${category._id}`)}
              className="cursor-pointer border-b border-[#ece7de] py-3 text-[11px] tracking-[0.15em] text-[#1b1c1a] uppercase transition-all duration-300 hover:bg-[#f4eee5] hover:text-[#C9A96E]"
            >
              View All {category.name}
            </DropdownMenuItem>

            {subCategoriesMap[category._id]?.map((subcategory) => (
              <DropdownMenuItem
                key={subcategory._id}
                onClick={() => navigate(`/?category=${subcategory._id}`)}
                className="group cursor-pointer py-3 text-sm text-[#7A6E63] transition-all duration-300 hover:bg-[#f4eee5] hover:text-[#1b1c1a]"
              >
                <span className="flex w-full items-center justify-between">
                  {subcategory.name}

                  <span className="translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    →
                  </span>
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
  );
};

export default CategoryMenu;
