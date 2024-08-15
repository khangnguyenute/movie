import { memo } from "react";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { twMerge } from "tailwind-merge";

import { DirectionEnum } from "@enums/commonEnum";
import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import { MovieDataType, TVShowDataType } from "@interfaces/Common";

import MotionPictureHorizontalCard from "./HorizontalCard";
import MotionPictureVerticalCard from "./VerticalCard";
import MotionPictureVerticalCardSkeleton from "./VerticalCardSkeleton";

interface MotionPictureSliderProps {
  sliders: Array<MovieDataType | TVShowDataType>;
  slidesPerView: number;
  mediaType?: MotionPictureCategoryEnum;
  direction?: DirectionEnum;
  isLoop?: boolean;
  isLoading?: boolean;
  className?: string;
  contentClassName?: string;
}

const MotionPictureSlider = ({
  sliders,
  mediaType,
  isLoop,
  isLoading,
  direction = DirectionEnum.VERTICAL,
  slidesPerView,
  className,
  contentClassName,
}: MotionPictureSliderProps) => {
  if (isLoading) {
    return (
      <div className={twMerge("flex space-x-3 overflow-hidden", className)}>
        {Array.from({ length: Math.ceil(slidesPerView) }).map((_, index) => {
          return (
            <MotionPictureVerticalCardSkeleton
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              isBorder={false}
              className={twMerge("flex-none", className)}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className={twMerge("w-full", className)}>
      <Swiper
        loop={isLoop}
        {...(slidesPerView && { slidesPerView })}
        spaceBetween={12}
        modules={[FreeMode, Navigation]}
      >
        {sliders?.map((slide) => (
          <SwiperSlide key={slide.id} className={contentClassName}>
            {direction === DirectionEnum.VERTICAL && (
              <MotionPictureVerticalCard
                motionPicture={slide}
                mediaType={mediaType ?? slide.media_type}
                isBorder={false}
                className={className}
              />
            )}
            {direction === DirectionEnum.HORIZONTAL && (
              <MotionPictureHorizontalCard
                motionPicture={slide}
                mediaType={mediaType ?? slide.media_type}
                isBorder={false}
                className={className}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default memo(MotionPictureSlider);
