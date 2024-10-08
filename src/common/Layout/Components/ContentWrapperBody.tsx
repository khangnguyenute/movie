import { twMerge } from "tailwind-merge";

import { LayoutContentWrapperBodyProps } from "../interface";

const LayoutContentWrapperBody = ({
  isBlank,
  isTab = false,
  isBorder = true,
  children,
  className,
}: LayoutContentWrapperBodyProps) => {
  return (
    <div
      className={twMerge(
        !isBlank && "m-8 rounded-lg border-2 bg-white p-6 shadow md:p-8",
        !className && "border-0 p-0 shadow-none lg:border-2 lg:p-6 lg:shadow",
        isBlank && isBorder && "border-t-2",
        isTab && "m-4 rounded-t-none",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default LayoutContentWrapperBody;
