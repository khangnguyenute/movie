import dayjs from "dayjs";
import { memo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { Star } from "@components/Form/Star";
import { PersonImage } from "@components/Image";
import { ReviewDataType } from "@interfaces/Common";

interface MotionPictureReviewItemProps {
  review: ReviewDataType;
}

const MotionPictureReviewItem = ({ review }: MotionPictureReviewItemProps) => {
  const { t } = useTranslation();

  return (
    <div className={twMerge("rounded-lg border p-4 shadow-lg")}>
      <div className="mb-4 flex items-center space-x-4">
        <PersonImage
          alt={review.author}
          src={review.author_details.avatar_path}
          isAvatar
          containerClassName="h-10 w-10 flex-none rounded-full"
          className="h-10 w-10 rounded-full"
        />

        <div>
          <Trans
            i18nKey="reviewBy"
            values={{ name: review.author }}
            components={{ span: <i className="font-bold" /> }}
          />
          <div className="flex items-center space-x-2">
            <Star name="star" value={review.author_details.rating} />
            <span>{dayjs(review.updated_at).format(t("dateFormat"))}</span>
          </div>
        </div>
      </div>

      <div className="break-words">
        {review.content.length > 500 ? `${review.content.substring(0, 500)}...` : review.content}
      </div>
    </div>
  );
};

export default memo(MotionPictureReviewItem);
