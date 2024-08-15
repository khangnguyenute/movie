import { flatMap } from "lodash";
import { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { MotionPictureSlider } from "@components/MotionPicture";
import { DirectionEnum } from "@enums/commonEnum";
import { PersonDataType } from "@interfaces/Common";

interface PersonOverviewProps {
  person: PersonDataType;
  isLoading: boolean;
}

const maxHeight = 144;

const PersonOverview = ({ person, isLoading }: PersonOverviewProps) => {
  const { t } = useTranslation();

  const [isReadMore, setIsReadMore] = useState(true);

  const name = useMemo(() => person.name ?? person.original_name, [person.name, person.original_name]);

  const height = useMemo(() => document.getElementById("my-element")?.clientHeight ?? 0, []);

  const handleReadMore = useCallback(() => {
    setIsReadMore((prev) => !prev);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-layout flex-col space-y-6">
      <div className="text-4xl font-bold">{name}</div>
      <div className="relative">
        <div className="mb-2 text-lg font-semibold leading-none">{t("biography")}</div>
        <div id="biography" className={twMerge(isReadMore && "line-clamp-6")}>
          {person.biography ? person.biography : t("emptyBiography", { name })}
        </div>
        {isReadMore && height >= maxHeight && (
          <div
            role="button"
            tabIndex={0}
            className="absolute bottom-0 w-full bg-gradient-to-l from-gray-50 from-10% text-right font-semibold text-secondary"
            onClick={handleReadMore}
          >
            {t("readMore")}
          </div>
        )}
      </div>

      <div>
        <div className="mb-3 text-xl font-semibold">{t("knownFor")}</div>
        <MotionPictureSlider
          sliders={flatMap(person.combined_credits)}
          direction={DirectionEnum.HORIZONTAL}
          isLoading={isLoading}
          slidesPerView={4}
          className="h-44"
        />
      </div>
    </div>
  );
};

export default memo(PersonOverview);
