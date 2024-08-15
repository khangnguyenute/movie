import { isEmpty } from "lodash";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { BackdropImage, PosterImage } from "@components/Image";
import { ProgressBar } from "@components/Progress";
import { Title } from "@components/Title";
import { CollectionDataType } from "@interfaces/Common";

interface CollectionOverviewProps {
  collection: CollectionDataType;
}

const CollectionOverview = ({ collection }: CollectionOverviewProps) => {
  const { t } = useTranslation();

  const voteAverage = useMemo(() => {
    if (isEmpty(collection.parts)) {
      return 0;
    }
    return collection.parts.reduce((sum, part) => sum + part.vote_average, 0) / collection.parts.length;
  }, [collection.parts]);

  return (
    <div className="relative py-12 text-white">
      <BackdropImage
        alt={collection.name}
        src={collection.backdrop_path}
        className="absolute inset-0 h-full w-full"
      />

      <div className="absolute inset-0 h-full w-full bg-black/70" />

      <div className="relative mx-auto w-full max-w-layout">
        <div className="grid grid-cols-4 gap-10">
          <PosterImage
            alt={collection.name}
            src={collection.poster_path}
            className="col-span-1 aspect-2/3 w-full rounded-lg"
          />

          <div className="col-span-3 my-auto flex flex-col space-y-6">
            <div className="text-4xl font-bold hover:text-slate-300">{collection.name}</div>

            <div className="flex items-center">
              <ProgressBar percentage={Number((voteAverage * 10).toFixed(0))} className="h-16 w-16" />
              <span className="font-semibold">
                User <br />
                Score
              </span>
            </div>
            <Title title={t("overview")} subtitle={collection.overview} titleClassname="mb-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CollectionOverview);
