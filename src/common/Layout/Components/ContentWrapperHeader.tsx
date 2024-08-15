import { DefaultTFuncReturn } from "i18next";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

export interface LayoutContentWrapperHeaderProps {
  title?: JSX.Element | DefaultTFuncReturn;
  actions?: JSX.Element;
  className?: string;
}

const LayoutContentWrapperHeader = ({ title, actions, className }: LayoutContentWrapperHeaderProps) => {
  return (
    <div
      className={twMerge(
        "flex min-h-20 items-center justify-between border-b bg-white px-4 sm:px-4 md:px-8",
        className,
      )}
    >
      <div className="flex-1 text-lg font-semibold">{title}</div>
      {actions && <div className="flex justify-end">{actions}</div>}
    </div>
  );
};

export default memo(LayoutContentWrapperHeader);
