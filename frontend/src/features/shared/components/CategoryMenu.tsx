import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { RootState } from "../../../app/app.store";
import { useEffect } from "react";
import { useCategory } from "../../category/hooks/useCategory";

const CategoryMenu = () => {
  const navigate = useNavigate();

  const categories = useSelector(
    (state: RootState) => state.category.categories,
  );

  const { handleGetCategories } = useCategory();

  const handleCategoryClick = (categoryId: string) => {
    console.log(categoryId);
    console.log("clicked");

    navigate(`/?category=${categoryId}`);
  };

  useEffect(() => {
    if (categories.length === 0) {
      handleGetCategories();
    }
  }, []);
  return (
    <div className="flex gap-6">
      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() => handleCategoryClick(category._id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryMenu;
