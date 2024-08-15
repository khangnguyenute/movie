import { DEFAULT_STAR } from "@constants/commonConstant";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

import { UncontrolledStarProps } from "../interface";
import UncontrolledStarItem from "./UncontrolledStarItem";

const UncontrolledStar = ({
  value,
  isLoading,
  disabled = false,
  className,
  starClassName,
  onChange,
}: UncontrolledStarProps) => {
  return (
    <div className={twMerge("flex items-center justify-center", className)}>
      {Array.from({ length: DEFAULT_STAR }).map((_, index) => (
        <UncontrolledStarItem
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          index={index}
          star={value}
          isLoading={isLoading}
          disabled={disabled}
          starClassName={starClassName}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default memo(UncontrolledStar);
