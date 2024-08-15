import { chain, isEmpty } from "lodash";
import { memo, useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronRight } from "react-icons/fa6";

import { Dropdown } from "@components/Dropdown";
import { MediaEnum } from "@enums/commonEnum";
import useWatchParam from "@hooks/useWatchParam";
import { ImageDataType } from "@interfaces/Common";

import MotionPictureMediaGridFilter from "./MediaGridFilter";
import MotionPictureMediaGridItem from "./MediaGridItem";
import MotionPictureMediaGridMenu from "./MediaGridMenu";
import MotionPictureMediaGridSkeleton from "./MediaGridSkeleton";

interface MotionPictureMediaGridProps {
  media: MediaEnum;
  data: ImageDataType[];
  isLoading: boolean;
  onChangeMedia: (mediaType: MediaEnum) => void;
}

const MotionPictureMediaGrid = ({ media, data, isLoading, onChangeMedia }: MotionPictureMediaGridProps) => {
  const { t } = useTranslation();

  const [imageLanguage, setImageLanguageParam] = useWatchParam("image_language");

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>("en");

  const groupedDataByLanguage = useMemo(
    () =>
      chain(data)
        .groupBy("iso_639_1")
        .map((values, language) => ({ values, language }))
        .sort((a, b) => a.language.localeCompare(b.language))
        .value(),
    [data],
  );

  const handleChangeLanguage = useCallback(
    (lanaguage: string) => {
      setImageLanguageParam(lanaguage);
      setSelectedLanguage(lanaguage);
    },
    [setImageLanguageParam],
  );

  const handleChangeMedia = useCallback(
    (mediaType: MediaEnum) => {
      onChangeMedia(mediaType);
      setSelectedLanguage("en");
    },
    [onChangeMedia],
  );

  useLayoutEffect(() => {
    if (!imageLanguage) {
      return;
    }
    setSelectedLanguage(imageLanguage);
  }, [imageLanguage]);

  if (isLoading) {
    return <MotionPictureMediaGridSkeleton media={media} />;
  }

  if (isEmpty(data)) {
    return <div className="my-8">{t("emptyImages", { type: media })}</div>;
  }

  return (
    <div className="my-8 grid grid-cols-5 gap-6">
      <div className="col-span-1 mb-4 h-fit overflow-hidden rounded-lg border-2 shadow-lg">
        <div className="bg-gray-800 px-5 py-4 text-xl font-semibold text-white">
          <Dropdown
            menu={<MotionPictureMediaGridMenu select={media} onChangeMedia={handleChangeMedia} />}
            menuClassName="px-0 py-3 overflow-hidden"
            position="left"
          >
            <div className="flex cursor-pointer items-center">
              {t(media)}
              <FaChevronRight className="ml-2" size={16} />
            </div>
          </Dropdown>
        </div>

        {groupedDataByLanguage.map((groupedItem) => (
          <MotionPictureMediaGridFilter
            key={groupedItem.language}
            language={groupedItem.language}
            quantity={groupedItem.values.length}
            selectedLanguage={selectedLanguage}
            onChangeLanguage={handleChangeLanguage}
          />
        ))}
      </div>
      <div className="col-span-4 grid grid-cols-4 gap-6">
        {groupedDataByLanguage
          .find((groupedItem) => groupedItem.language === selectedLanguage)
          ?.values.map((groupedItem) => (
            <MotionPictureMediaGridItem key={groupedItem.file_path} image={groupedItem} media={media} />
          ))}
      </div>
    </div>
  );
};

export default memo(MotionPictureMediaGrid);
