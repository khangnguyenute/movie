import { MOTION_PICTURE_LIST_PATH } from "@constants/routeConstant";
import { memo, useCallback, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { LoadingOverlay } from "@components/Loading";
import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import useToast from "@hooks/useToast";
import { MovieDataType, TVShowDataType } from "@interfaces/Common";
import { motionPictureService } from "@services/index";
import { showToastError } from "@utils/Helpers";

import {
  MotionPictureCredit,
  MotionPictureMedia,
  MotionPictureOverview,
  MotionPictureRecommendation,
  MotionPictureReview,
  MotionPictureSimilar,
  MotionPictureSocial,
} from "./Components";
import MovieInformation from "./Movie/MovieInformation";
import { TVShowInformation } from "./TVShow";

const MotionPictureDetail = () => {
  const toast = useToast();

  const { category, id } = useParams();

  const [motionPictureData, setMotionPictureData] = useState<MovieDataType | TVShowDataType | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getMotionPictureById = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await motionPictureService.getMotionPictureById(
        category as MotionPictureCategoryEnum,
        Number(id),
      );
      setMotionPictureData(response);
    } catch (error) {
      showToastError(error, toast.error);
    } finally {
      setIsLoading(false);
    }
  }, [category, id, toast]);

  useEffect(() => {
    getMotionPictureById();
  }, [getMotionPictureById]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (!motionPictureData) {
    return (
      <Navigate to={MOTION_PICTURE_LIST_PATH.MOTION_PICTURE_LIST(category as MotionPictureCategoryEnum)} />
    );
  }

  return (
    <>
      <MotionPictureOverview
        motionPicture={motionPictureData}
        mediaType={category as MotionPictureCategoryEnum}
      />
      <div className="mx-auto grid w-full max-w-layout grid-cols-5 gap-8">
        <div className="col-span-4 flex flex-col space-y-8 py-8">
          <MotionPictureCredit
            id={motionPictureData.id}
            casts={motionPictureData.credits.cast}
            mediaType={category as MotionPictureCategoryEnum}
          />
          <MotionPictureMedia
            id={motionPictureData.id}
            images={motionPictureData.images}
            mediaType={category as MotionPictureCategoryEnum}
          />
          <MotionPictureReview
            id={motionPictureData.id}
            reviews={motionPictureData.reviews.results}
            mediaType={category as MotionPictureCategoryEnum}
          />
          <MotionPictureSimilar
            similarMovies={motionPictureData.similar.results}
            mediaType={category as MotionPictureCategoryEnum}
          />
          <MotionPictureRecommendation
            recommendations={motionPictureData.recommendations.results}
            mediaType={category as MotionPictureCategoryEnum}
          />
        </div>
        <div className="col-span-1 flex flex-col space-y-8 py-8">
          <MotionPictureSocial
            externalIds={motionPictureData.external_ids}
            homepage={motionPictureData.homepage}
          />
          {category === MotionPictureCategoryEnum.MOVIE && (
            <MovieInformation movie={motionPictureData as MovieDataType} />
          )}
          {category === MotionPictureCategoryEnum.TV && (
            <TVShowInformation tvShow={motionPictureData as TVShowDataType} />
          )}
        </div>
      </div>
    </>
  );
};

export default memo(MotionPictureDetail);
