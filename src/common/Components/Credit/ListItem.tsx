import { PERSON_PATH } from "@constants/routeConstant";
import { memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { PersonImage } from "@components/Image";
import { Title } from "@components/Title";
import { PersonDataType } from "@interfaces/Common";
import { getNameMotionPicture } from "@utils/Helpers";

interface CreditListItemProps {
  credit: PersonDataType;
  subtitle?: string | null;
}

const CreditListItem = ({ credit, subtitle }: CreditListItemProps) => {
  const navigate = useNavigate();

  const motionPictures = useMemo(
    () => credit.known_for?.map((motionPicture) => getNameMotionPicture(motionPicture)).join(", "),
    [credit.known_for],
  );

  const handleClick = useCallback(() => {
    navigate(PERSON_PATH.PERSON_DETAIL(credit.id));
  }, [credit.id, navigate]);

  return (
    <div className="flex items-center space-x-3">
      <PersonImage
        alt={credit.name ?? credit.original_name}
        src={credit.profile_path}
        gender={credit.gender}
        isAvatar
        className="h-16 w-16 rounded-lg"
        onClick={handleClick}
      />

      <Title
        title={credit.name ?? credit.original_name}
        subtitle={subtitle ?? motionPictures}
        titleClassname="font-bold text-base"
        onClick={handleClick}
      />
    </div>
  );
};

export default memo(CreditListItem);
