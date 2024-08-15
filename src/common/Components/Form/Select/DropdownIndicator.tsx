import { memo } from "react";
import { DropdownIndicatorProps, components } from "react-select";

import { LoadingSpinner } from "@components/Loading";

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator className="px-2" {...props}>
      <LoadingSpinner className="h-3.5 w-3.5 border border-slate-700" />
    </components.DropdownIndicator>
  );
};

export default memo(DropdownIndicator);
