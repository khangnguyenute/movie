import { MOTION_PICTURE_LIST_PATH } from "@constants/routeConstant";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { CreditSlider } from "@components/Credit";
import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import { CastDataType, CrewDataType } from "@interfaces/Common";

interface MotionPictureCreditProps {
  id: number;
  casts: Array<CastDataType | CrewDataType>;
  mediaType: MotionPictureCategoryEnum;
}

const MotionPictureCredit = ({ id, casts, mediaType }: MotionPictureCreditProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const title = useMemo(
    () => (mediaType === MotionPictureCategoryEnum.MOVIE ? t("topBilledCast") : t("seriesCast")),
    [mediaType, t],
  );

  const handleClick = useCallback(() => {
    navigate(MOTION_PICTURE_LIST_PATH.MOTION_PICTURE_CAST(mediaType, id));
  }, [navigate, mediaType, id]);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between font-semibold">
        <div className="text-2xl">{title}</div>
        <div role="button" tabIndex={0} className="hover:text-slate-500" onClick={handleClick}>
          {t("fullCastAndCrew")}
        </div>
      </div>
      <CreditSlider sliders={casts} slidesPerView={6} contentClassName="h-80" />
    </div>
  );
};

export default memo(MotionPictureCredit);
