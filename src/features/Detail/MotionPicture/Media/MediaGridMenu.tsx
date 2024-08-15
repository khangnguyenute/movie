import { memo, useCallback, useState } from "react";

import { MediaEnum } from "@enums/commonEnum";

import MotionPictureMediaGridMenuItem from "./MediaGridMenuItem";

interface MotionPictureMediaGridMenuProps {
  select: MediaEnum;
  onChangeMedia: (mediaType: MediaEnum) => void;
}

const MotionPictureMediaGridMenu = ({ select, onChangeMedia }: MotionPictureMediaGridMenuProps) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaEnum>(select);

  const handleChangeMedia = useCallback(
    (media: MediaEnum) => {
      setSelectedMedia(media);
      onChangeMedia(media);
    },
    [onChangeMedia],
  );

  return (
    <div>
      {Object.values(MediaEnum).map((media) => (
        <MotionPictureMediaGridMenuItem
          key={media}
          media={media}
          selectedMedia={selectedMedia}
          onChangeMedia={handleChangeMedia}
        />
      ))}
    </div>
  );
};

export default memo(MotionPictureMediaGridMenu);
