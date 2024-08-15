import { ReactNode, memo, useMemo } from "react";
import { Tooltip } from "react-tooltip";
import { twMerge } from "tailwind-merge";

import { ComponentSizeType } from "@components/interface";

interface ButtonTooltipProps {
  label: string | ReactNode;
  content?: string;
  size?: ComponentSizeType;
  className?: string;
}

const ButtonTooltip = ({ label, content, size = "normal", className }: ButtonTooltipProps) => {
  const tooltipId = useMemo(() => `button-tooltip-${Math.random()}`, []);

  let sizeClassNames = "";
  switch (size) {
    case "xs":
      sizeClassNames += "h-8 w-8 text-sm";
      break;
    case "sm":
      sizeClassNames += "h-10 w-10 text-md";
      break;
    default:
      sizeClassNames += "h-12 w-12 text-lg";
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={twMerge(
        "flex items-center justify-center rounded-full bg-primary",
        className,
        sizeClassNames,
      )}
      data-tooltip-id={tooltipId}
      data-tooltip-position-strategy="fixed"
    >
      {label}
      {content && <Tooltip id={tooltipId} content={content} place="top" positionStrategy="absolute" />}
    </div>
  );
};

export default memo(ButtonTooltip);
