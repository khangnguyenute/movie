import { memo } from "react";
import { twMerge } from "tailwind-merge";

export interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div
      className={twMerge(
        "border-primary-500 h-12 w-12 animate-spin rounded-full border-4",
        className,
        "border-t-transparent",
      )}
    />
  );
};

export default memo(LoadingSpinner);
