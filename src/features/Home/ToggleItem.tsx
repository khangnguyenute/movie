import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

interface ToggleItemProps {
  value: string;
  selectedValue: string;
  onChange: (value: string) => void;
}

const ToggleItem = ({ value, selectedValue, onChange }: ToggleItemProps) => {
  const { t } = useTranslation();

  const isSelected = useMemo(() => value === selectedValue, [selectedValue, value]);

  const handleChange = useCallback(() => {
    onChange(value);
  }, [onChange, value]);

  return (
    <div
      className={twMerge("rounded-full px-5 py-1 text-center", isSelected && "bg-primary")}
      role="button"
      tabIndex={0}
      onClick={handleChange}
    >
      <div
        className={twMerge(
          "font-semibold",
          isSelected &&
            "bg-gradient-to-r from-white to-tertiary to-30% bg-clip-text text-transparent transition duration-300",
        )}
      >
        {t(value)}
      </div>
    </div>
  );
};

export default memo(ToggleItem);
