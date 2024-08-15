import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { MotionPictureSlider } from "@components/MotionPicture";
import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import useToast from "@hooks/useToast";
import { MovieDataType, TVShowDataType } from "@interfaces/Common";
import { motionPictureService } from "@services/index";
import { showToastError } from "@utils/Helpers";

import Toggle from "./Toggle";

const Discover = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const [discoverData, setDiscoverData] = useState<MovieDataType[] | TVShowDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mediaType, setMediaType] = useState<MotionPictureCategoryEnum>(MotionPictureCategoryEnum.MOVIE);

  const handleChangeToggle = useCallback((value: string) => {
    setMediaType(value as MotionPictureCategoryEnum);
  }, []);

  const getDiscovers = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await motionPictureService.getMotionPictures(mediaType);

      setDiscoverData(data);
    } catch (error) {
      showToastError(error, toast.error);
    } finally {
      setIsLoading(false);
    }
  }, [toast, mediaType]);

  useEffect(() => {
    getDiscovers();
  }, [getDiscovers]);

  return (
    <div>
      <div className="flex items-center justify-start space-x-4">
        <div className="mb-4 text-xl font-semibold">{t("discover")}</div>
        <Toggle
          values={[MotionPictureCategoryEnum.MOVIE, MotionPictureCategoryEnum.TV]}
          selectedValue={mediaType}
          onChange={handleChangeToggle}
        />
      </div>

      <MotionPictureSlider
        sliders={discoverData}
        mediaType={mediaType}
        isLoading={isLoading}
        slidesPerView={7.5}
      />
    </div>
  );
};

export default memo(Discover);
