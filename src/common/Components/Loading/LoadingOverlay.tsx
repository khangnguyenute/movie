import { memo, useLayoutEffect } from "react";
import { twMerge } from "tailwind-merge";

interface LoadingOverlayProps {
  className?: string;
}

const LoadingOverlay = ({ className }: LoadingOverlayProps) => {
  useLayoutEffect(() => {
    window.document.body.style.overflow = "hidden";

    return () => {
      window.document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary">
      <div
        className={twMerge(
          "border-primary-500 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent",
          className,
        )}
      />
    </div>
  );
};

export default memo(LoadingOverlay);
