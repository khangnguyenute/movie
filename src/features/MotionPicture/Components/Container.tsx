import { VisibilityState } from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";

import { MotionPictureCategoryEnum } from "@enums/movieEnum";
import useToast from "@hooks/useToast";
import { BaseListQueryType, MovieDataType, TVShowDataType } from "@interfaces/Common";
import { motionPictureService } from "@services/index";
import { showToastError } from "@utils/Helpers";

import MotionPictureGrid from "./Grid";
import MotionPictureTable from "./Table";

interface MotionPictureContainerProps {
  title: string;
  category: MotionPictureCategoryEnum;
  motionPictureParam: Record<string, unknown>;
  columnVisibility?: VisibilityState;
  isShowClearAll?: boolean;
  isSummaryCard?: boolean;
  onChangeCategory?: (option: unknown) => void;
}

const MotionPictureContainer = ({
  title,
  category,
  motionPictureParam,
  columnVisibility,
  isShowClearAll,
  isSummaryCard,
  onChangeCategory,
}: MotionPictureContainerProps) => {
  const toast = useToast();

  const [motionPictureData, setMotionPictureData] = useState<MovieDataType[] | TVShowDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [queryParam, setQueryParam] = useState<BaseListQueryType | null>(null);
  const [totalRows, setTotalRows] = useState<number>(0);

  const getMotionPictures = useCallback(async () => {
    if (!queryParam) {
      return;
    }

    setIsLoading(true);

    try {
      const { data, meta } = await motionPictureService.getMotionPictures(
        category as MotionPictureCategoryEnum,
        motionPictureParam,
        queryParam,
      );

      setMotionPictureData(data);
      setTotalRows(meta.totalResults);
    } catch (error) {
      showToastError(error, toast.error);
    } finally {
      setIsLoading(false);
    }
  }, [category, motionPictureParam, queryParam, toast]);

  useEffect(() => {
    getMotionPictures();
  }, [getMotionPictures]);

  return (
    <div>
      <div className="bg-secondary py-3">
        <div className="mx-auto flex w-full max-w-layout items-center justify-end space-x-2 text-xl text-white">
          <div className="font-bold">{title}</div>
          <div className="font-semibold">({totalRows})</div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-layout py-8">
        <MotionPictureTable
          data={motionPictureData}
          isLoading={isLoading}
          isShowClearAll={isShowClearAll}
          totalRows={totalRows}
          columnVisibility={columnVisibility}
          onChangeCategory={onChangeCategory}
          onChangeState={setQueryParam}
        >
          <MotionPictureGrid
            isLoading={isLoading}
            motionPictures={motionPictureData}
            mediaType={category as MotionPictureCategoryEnum}
            isSummaryCard={isSummaryCard}
          />
        </MotionPictureTable>
      </div>
    </div>
  );
};

export default MotionPictureContainer;
