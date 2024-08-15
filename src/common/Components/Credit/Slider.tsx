import { memo } from "react";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { twMerge } from "tailwind-merge";

import { CastDataType, CrewDataType } from "@interfaces/Common";

import { LoadingSkeleton } from "../Loading";
import CreditCard from "./Card";

interface CreditSliderProps {
  sliders: Array<CastDataType | CrewDataType>;
  slidesPerView: number;
  isLoop?: boolean;
  isLoading?: boolean;
  className?: string;
  contentClassName?: string;
}

const CreditSlider = ({
  sliders,
  isLoop,
  isLoading,
  slidesPerView,
  className,
  contentClassName,
}: CreditSliderProps) => {
  const getJob = (credit: CastDataType | CrewDataType) => {
    if ("character" in credit) {
      return credit.character;
    }
    if ("job" in credit) {
      return credit.job;
    }
    return "N/A";
  };

  if (isLoading) {
    return (
      <div
        className={twMerge("grid w-full gap-3", className)}
        style={{ gridTemplateColumns: `repeat(${slidesPerView}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: slidesPerView }).map((_, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <LoadingSkeleton key={index} className={contentClassName} />;
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
        scrollbar
      >
        {sliders.map((slide) => (
          <SwiperSlide key={slide.id} className={contentClassName}>
            <CreditCard credit={slide} className={className} subtitle={getJob(slide)} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default memo(CreditSlider);
