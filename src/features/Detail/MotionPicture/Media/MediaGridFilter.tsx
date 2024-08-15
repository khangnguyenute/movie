import { memo, useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface MotionPictureMediaGridFilterProps {
  language: string;
  quantity: number;
  selectedLanguage: string | null;
  onChangeLanguage: (language: string) => void;
}

const MotionPictureMediaGridFilter = ({
  language,
  quantity,
  selectedLanguage,
  onChangeLanguage,
}: MotionPictureMediaGridFilterProps) => {
  const isSelected = useMemo(() => language === selectedLanguage, [language, selectedLanguage]);

  const handleChangeLanguage = useCallback(() => {
    onChangeLanguage(language);
  }, [language, onChangeLanguage]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleChangeLanguage}
      className={twMerge(
        "group flex items-center justify-between px-5 py-3 hover:bg-gray-200",
        isSelected && "bg-gray-200",
      )}
    >
      <div className={twMerge(isSelected && "font-semibold")}>{language}</div>
      <div
        className={twMerge(
          "rounded-lg bg-gray-200 px-3 text-sm group-hover:bg-white",
          isSelected && "bg-white",
        )}
      >
        {quantity}
      </div>
    </div>
  );
};

export default memo(MotionPictureMediaGridFilter);
