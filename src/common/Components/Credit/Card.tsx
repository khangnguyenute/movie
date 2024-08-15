import { PERSON_PATH } from "@constants/routeConstant";
import { memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { PersonImage } from "@components/Image";
import { Title } from "@components/Title";
import { PersonDataType } from "@interfaces/Common";
import { getNameMotionPicture } from "@utils/Helpers";

interface CreditCardProps {
  credit: PersonDataType;
  subtitle?: string | null;
  className?: string;
}

const CreditCard = ({ credit, subtitle, className }: CreditCardProps) => {
  const navigate = useNavigate();

  const motionPictures = useMemo(
    () => credit.known_for?.map((motionPicture) => getNameMotionPicture(motionPicture)).join(", "),
    [credit.known_for],
  );

  const handleClick = useCallback(() => {
    navigate(PERSON_PATH.PERSON_DETAIL(credit.id));
  }, [credit.id, navigate]);

  return (
    <div className={twMerge("relative h-full overflow-hidden rounded-lg border shadow-md", className)}>
      <PersonImage
        alt={credit.name ?? credit.original_name}
        src={credit.profile_path}
        gender={credit.gender}
        className="aspect-3/4 w-full object-cover"
        onClick={handleClick}
      />

      <Title
        title={credit.name ?? credit.original_name}
        subtitle={subtitle ?? motionPictures}
        className="mt-1 px-3 py-2"
        titleClassname="hover:text-secondary line-clamp-2"
        subtitleClassname="line-clamp-1"
        onClick={handleClick}
      />
    </div>
  );
};

export default memo(CreditCard);
