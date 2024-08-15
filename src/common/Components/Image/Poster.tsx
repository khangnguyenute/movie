import { LINK_PATH } from "@constants/commonConstant";
import { memo, useMemo } from "react";

interface PosterImageProps {
  src?: string | null;
  alt?: string;
  className?: string;
}

const PosterImage = ({ alt, src, className }: PosterImageProps) => {
  const image = useMemo(() => {
    if (src) {
      return LINK_PATH.IMAGE_HEIGHT_PATH(src);
    }

    return "/default_image.png";
  }, [src]);

  return <img alt={alt} src={image} className={className} />;
};

export default memo(PosterImage);
