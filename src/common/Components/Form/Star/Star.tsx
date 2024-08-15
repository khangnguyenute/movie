import { omit } from "lodash";
import { memo, useCallback } from "react";
import { useController } from "react-hook-form";

import { StarProps } from "../interface";
import UncontrolledStar from "./UncontrolledStar";

const Star = ({ control, name, ...props }: StarProps) => {
  if (!control?.register) {
    return <UncontrolledStar {...props} />;
  }

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const handleChange = useCallback(
    (newStar: number) => {
      onChange(newStar);
    },
    [onChange],
  );

  return <UncontrolledStar value={value} onChange={handleChange} {...omit(props, ["value", "onChange"])} />;
};

export default memo(Star);
