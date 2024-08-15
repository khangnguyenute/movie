import { memo } from "react";

import ToggleItem from "./ToggleItem";

interface ToggleProps {
  values: string[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const Toggle = ({ values, selectedValue, onChange }: ToggleProps) => {
  return (
    <div className="flex items-center overflow-hidden rounded-full border border-primary">
      {values.map((value, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ToggleItem key={index} value={value} selectedValue={selectedValue} onChange={onChange} />
      ))}
    </div>
  );
};

export default memo(Toggle);
