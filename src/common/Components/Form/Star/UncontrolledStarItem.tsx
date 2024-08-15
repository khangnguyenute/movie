import { isFunction } from "lodash";
import { memo, useCallback } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import { UncontrolledStarItemProps } from "../interface";

const UncontrolledStarItem = ({
  index,
  star,
  isLoading,
  starClassName,
  disabled,
  onChange,
}: UncontrolledStarItemProps) => {
  const handleChangeStar = useCallback(() => {
    if (disabled || !isFunction(onChange)) {
      return;
    }
    onChange(index + 1);
  }, [disabled, index, onChange]);

  if (isLoading) {
    return <AiFillStar className="animate-pulse rounded-lg bg-gray-200" />;
  }

  return (
    <div role="button" tabIndex={0} onClick={handleChangeStar}>
      {index < star ? (
        <AiFillStar color="orange" className={starClassName} />
      ) : (
        <AiOutlineStar color="orange" className={starClassName} />
      )}
    </div>
  );
};

export default memo(UncontrolledStarItem);
