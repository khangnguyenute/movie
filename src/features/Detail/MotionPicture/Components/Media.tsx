import { MOTION_PICTURE_LIST_PATH } from "@constants/routeConstant";
import { capitalize, omit } from "lodash";
import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { MediaEnum } from "@enums/commonEnum";
import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import { MotionPictureImageDataType } from "@interfaces/Common";

import MotionPictureMediaImage from "./MediaImage";

interface MotionPictureMediaProps {
  id: number;
  images: MotionPictureImageDataType;
  mediaType: MotionPictureCategoryEnum;
}

const MotionPictureMedia = ({ id, images, mediaType }: MotionPictureMediaProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [activatedMedia, setActivatedMedia] = useState<MediaEnum>(MediaEnum.BACKDROPS);

  const handleChangeMedia = useCallback((selectedMedia: MediaEnum) => {
    setActivatedMedia(selectedMedia);
  }, []);

  const handleSeeMore = useCallback(() => {
    navigate(MOTION_PICTURE_LIST_PATH.MOTION_PICTURE_MEDIA(mediaType, id, activatedMedia));
  }, [navigate, mediaType, id, activatedMedia]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between space-x-6 font-semibold">
        <div className="flex items-center space-x-6">
          <div className="text-2xl">{t("media")}</div>
          {Object.values(omit(MediaEnum, "VIDEOS")).map((media) => (
            <div key={media} className="relative">
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  handleChangeMedia(media);
                }}
              >
                {t(media)}
              </div>
              {media === activatedMedia && <div className="absolute -bottom-1 h-1 w-full bg-black" />}
            </div>
          ))}
        </div>

        <div role="button" tabIndex={0} className="hover:text-slate-500" onClick={handleSeeMore}>
          {t("seeAll", { name: capitalize(activatedMedia) })}
        </div>
      </div>

      <MotionPictureMediaImage
        data={images[activatedMedia]}
        type={activatedMedia}
        onSeeMore={handleSeeMore}
      />
    </div>
  );
};

export default memo(MotionPictureMedia);
