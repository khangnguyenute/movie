import { isEmpty } from "lodash";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { CreditListItem, CreditListSkeleton } from "@components/Credit";
import { CastDataType } from "@interfaces/Common";

interface MotionPictureCastProps {
  casts: CastDataType[];
  isLoading: boolean;
}

const MotionPictureCast = ({ casts, isLoading }: MotionPictureCastProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <CreditListSkeleton />;
  }

  if (isEmpty(casts)) {
    return <div />;
  }

  return (
    <div>
      <div className="my-4 flex flex-col space-y-3">
        <div className="mb-4 text-2xl">
          <span className="mr-2 font-bold">{t("cast")}</span>
          <span className="text-slate-500">{casts.length}</span>
        </div>

        {casts.map((cast) => (
          <CreditListItem key={cast.id} credit={cast} subtitle={cast.character} />
        ))}
      </div>
    </div>
  );
};

export default memo(MotionPictureCast);
