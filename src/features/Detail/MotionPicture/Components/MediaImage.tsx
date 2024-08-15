import { LINK_PATH } from "@constants/commonConstant";
import { isEmpty } from "lodash";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { MediaEnum } from "@enums/commonEnum";
import { ImageDataType } from "@interfaces/Common";

interface MotionPictureMediaImageProps {
  data: ImageDataType[];
  type: MediaEnum;
  className?: string;
  onSeeMore: () => void;
}

const MotionPictureMediaImage = ({ data, type, className, onSeeMore }: MotionPictureMediaImageProps) => {
  const { t } = useTranslation();

  const externalPath = useCallback(
    (path: string) => {
      if (type === MediaEnum.BACKDROPS) {
        return LINK_PATH.IMAGE_WIDTH_PATH(path);
      }
      if (type === MediaEnum.POSTERS) {
        return LINK_PATH.IMAGE_HEIGHT_PATH(path);
      }
      return LINK_PATH.IMAGE_ORIGINAL_PATH(path);
    },
    [type],
  );

  if (isEmpty(data)) {
    return <div>{t("emptyImages", { type })}</div>;
  }

  return (
    <div
      className={twMerge(
        "grid grid-cols-9 grid-rows-4 gap-2 rounded-lg",
        type === MediaEnum.POSTERS && "grid-cols-6 grid-rows-2",
        className,
      )}
    >
      <img
        src={externalPath(data[0].file_path)}
        alt=""
        className={twMerge(
          "col-span-6 row-span-4 h-full w-full rounded-lg border border-gray-300 object-cover object-center p-1 shadow-lg",
          type === MediaEnum.POSTERS && "col-span-2 row-span-2",
        )}
      />
      {data.slice(1, type === MediaEnum.POSTERS ? 9 : 3).map((image, index) => {
        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={twMerge(
              "group relative col-span-3 row-span-2 w-full rounded-lg border border-gray-300 p-1 shadow-lg",
              type === MediaEnum.POSTERS && "col-span-1 row-span-1",
            )}
          >
            <img src={externalPath(data[0].file_path)} alt="" className="object-cover object-center" />
            <div
              role="button"
              tabIndex={0}
              className="absolute inset-0 hidden h-full w-full items-center justify-center rounded-lg bg-gray-400/70 text-2xl font-semibold text-primary group-last:flex hover:bg-gray-400/80"
              onClick={onSeeMore}
            >
              {t("seeMore")}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(MotionPictureMediaImage);
