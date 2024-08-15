import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { MediaEnum } from "@enums/commonEnum";

interface MotionPictureMediaGridMenuItemProps {
  media: MediaEnum;
  selectedMedia: MediaEnum;
  onChangeMedia: (media: MediaEnum) => void;
}

const MotionPictureMediaGridMenuItem = ({
  media,
  selectedMedia,
  onChangeMedia,
}: MotionPictureMediaGridMenuItemProps) => {
  const { t } = useTranslation();

  const handleClick = useCallback(() => {
    if (selectedMedia === media) {
      return;
    }
    onChangeMedia(media);
  }, [media, onChangeMedia, selectedMedia]);

  return (
    <div
      role="button"
      tabIndex={0}
      className={twMerge(
        "px-4 py-2 hover:bg-gray-200",
        selectedMedia === media && "bg-gray-200 font-semibold",
      )}
      onClick={handleClick}
    >
      {t(media)}
    </div>
  );
};

export default memo(MotionPictureMediaGridMenuItem);
