import { LINK_PATH } from "@constants/commonConstant";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";

import { Title } from "@components/Title";
import { MediaEnum } from "@enums/commonEnum";
import { ImageDataType } from "@interfaces/Common";

interface MotionPictureMediaGridItemProps {
  image: ImageDataType;
  media: MediaEnum;
}

const MotionPictureMediaGridItem = ({ image, media }: MotionPictureMediaGridItemProps) => {
  const { t } = useTranslation();

  const path = useMemo(() => {
    if (media === MediaEnum.BACKDROPS) {
      return LINK_PATH.IMAGE_WIDTH_PATH(image.file_path);
    }
    if (media === MediaEnum.POSTERS) {
      return LINK_PATH.IMAGE_HEIGHT_PATH(image.file_path);
    }
    return LINK_PATH.IMAGE_ORIGINAL_PATH(image.file_path);
  }, [image.file_path, media]);

  return (
    <div className="h-fit overflow-hidden rounded-lg border-2 shadow-lg">
      <div className="group relative">
        <Link to={LINK_PATH.IMAGE_ORIGINAL_PATH(image.file_path)} target="_blank">
          <img alt={image.file_path} src={path} className="w-full" />
        </Link>
        <div
          role="button"
          tabIndex={0}
          className="absolute bottom-0 hidden w-full bg-gray-300 p-3 text-black opacity-80 duration-300 group-hover:block"
        >
          <AiFillLike />
        </div>
      </div>

      <div className="border-b-2 px-4 py-2 font-semibold">{t("information")}</div>

      <div className="flex flex-col space-y-2 px-4 py-2">
        <Title
          title={t("size")}
          subtitle={`${image.width}x${image.height}`}
          titleClassname="font-normal text-base cursor-default"
        />
        <Title
          title={t("language")}
          subtitle={image.iso_639_1}
          titleClassname="font-normal text-base cursor-default"
        />
      </div>
    </div>
  );
};

export default memo(MotionPictureMediaGridItem);
