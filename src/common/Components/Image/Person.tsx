import { LINK_PATH } from "@constants/commonConstant";
import { memo, useCallback, useMemo } from "react";

interface PersonImageProps {
  src?: string | null;
  alt?: string;
  gender?: number;
  isAvatar?: boolean;
  containerClassName?: string;
  className?: string;
  onClick?: () => void;
}

const PersonImage = ({
  alt,
  src,
  gender,
  isAvatar = false,
  containerClassName,
  className,
  onClick,
}: PersonImageProps) => {
  const linkPath = useCallback(
    (path: string) => {
      if (isAvatar) {
        return LINK_PATH.IMAGE_ORIGINAL_PATH(path);
      }
      return LINK_PATH.IMAGE_HEIGHT_PATH(path);
    },
    [isAvatar],
  );

  const image = useMemo(() => {
    if (src) {
      return linkPath(src);
    }
    if (gender === 1) {
      return "/default_female.png";
    }
    return "/default_male.png";
  }, [gender, linkPath, src]);

  return (
    <div role="button" tabIndex={0} onClick={onClick} className={containerClassName}>
      <img src={image} alt={alt} className={className} />
    </div>
  );
};

export default memo(PersonImage);
