import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { SearchEnum } from "@enums/movieEnum";

interface SearchCategoryProps {
  category: SearchEnum;
  selectedCategory: SearchEnum;
  onChangeCategory: (category: SearchEnum) => void;
}

const SearchCategory = ({ category, selectedCategory, onChangeCategory }: SearchCategoryProps) => {
  const { t } = useTranslation();

  const handleClick = useCallback(() => {
    if (selectedCategory === category) {
      return;
    }
    onChangeCategory(category);
  }, [category, onChangeCategory, selectedCategory]);

  return (
    <div
      role="button"
      tabIndex={0}
      className={twMerge(
        "px-4 py-2 hover:bg-gray-200",
        selectedCategory === category && "bg-gray-200 font-semibold",
      )}
      onClick={handleClick}
    >
      {t(category)}
    </div>
  );
};

export default memo(SearchCategory);
