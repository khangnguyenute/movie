import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { MotionPictureSlider } from "@components/MotionPicture";
import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import useToast from "@hooks/useToast";
import { MovieDataType, TVShowDataType } from "@interfaces/Common";
import { trendingService } from "@services/index";
import { showToastError } from "@utils/Helpers";

import Toggle from "./Toggle";

const Trending = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const [trendingData, setTrendingData] = useState<MovieDataType[] | TVShowDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mediaType, setMediaType] = useState<MotionPictureCategoryEnum>(MotionPictureCategoryEnum.MOVIE);

  const handleChangeToggle = useCallback((value: string) => {
    setMediaType(value as MotionPictureCategoryEnum);
  }, []);

  const getTrendings = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await trendingService.getTrendings(mediaType);

      setTrendingData(data);
    } catch (error) {
      showToastError(error, toast.error);
    } finally {
      setIsLoading(false);
    }
  }, [toast, mediaType]);

  useEffect(() => {
    getTrendings();
  }, [getTrendings]);

  return (
    <div className="relative">
      <div
        className="absolute bottom-8 h-48 w-full bg-contain bg-center bg-repeat-x"
        style={{
          backgroundImage: `url(/trendingbackground.png)`,
        }}
      />
      <div className="absolute bottom-8 h-48 w-full bg-gradient-to-t from-gray-50" />

      <div className="mb-4 flex items-center justify-start space-x-4">
        <div className="text-xl font-semibold">{t("trending")}</div>
        <Toggle
          values={[MotionPictureCategoryEnum.MOVIE, MotionPictureCategoryEnum.TV]}
          selectedValue={mediaType}
          onChange={handleChangeToggle}
        />
      </div>
      <MotionPictureSlider
        sliders={trendingData}
        isLoading={isLoading}
        mediaType={mediaType}
        slidesPerView={7.5}
      />
    </div>
  );
};

export default memo(Trending);
