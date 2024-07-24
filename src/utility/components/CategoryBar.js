import React, { useState } from "react";

const CategoryBar = ({
  selectedCategory,
  onSelectCategory,
  categories,
  color = {},
}) => {
  const [showAll, setShowAll] = useState(false);
  const initialCategoriesCount = 5;

  const allCategories = ["All", ...categories];
  const visibleCategories = showAll
    ? allCategories
    : allCategories.slice(0, initialCategoriesCount.sm);

  return (
    <div className="mb-3 md:mb-8">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
        {visibleCategories.map((category) => (
          <button
            key={category}
            className={`py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 mb-2 ${
              selectedCategory === category
                ? category === "All"
                  ? "bg-green-500 text-white"
                  : `${color[category] || "bg-blue-500"} text-white`
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
        {allCategories.length > initialCategoriesCount.sm && (
          <button
            className={`py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 mb-2 ${
              showAll
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-purple-500 text-white hover:bg-purple-400"
            }`}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Less" : "More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryBar;
