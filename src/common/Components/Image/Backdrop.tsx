import { LINK_PATH } from "@constants/commonConstant";
import { memo, useMemo } from "react";

interface BackdropImageProps {
  src?: string | null;
  alt?: string;
  className?: string;
}

const BackdropImage = ({ alt, src, className }: BackdropImageProps) => {
  const image = useMemo(() => {
    if (src) {
      return LINK_PATH.IMAGE_WIDTH_PATH(src);
    }

    return "/default_background.png";
  }, [src]);

  return <img alt={alt} src={image} className={className} />;
};

export default memo(BackdropImage);
