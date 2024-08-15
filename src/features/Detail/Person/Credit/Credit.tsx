/* eslint-disable @typescript-eslint/no-unused-vars */
import { chain } from "lodash";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { CastOfMotionPictureDataType, CrewOfMotionPictureDataType } from "@interfaces/Common";

import PersonCreditList from "./CreditList";

interface PersonCreditProps {
  combinedCredits: {
    cast: CastOfMotionPictureDataType[];
    crew: CrewOfMotionPictureDataType[];
  };
}

const PersonCredit = ({ combinedCredits }: PersonCreditProps) => {
  const { t } = useTranslation();

  const groupedCrewByDeparment = useMemo(
    () =>
      chain(combinedCredits.crew)
        .groupBy("department")
        .map((values, department) => ({ values, department }))
        .value(),
    [combinedCredits.crew],
  );

  return (
    <div className="mx-auto grid w-full max-w-layout grid-cols-1">
      <PersonCreditList data={combinedCredits.cast} department={t("acting")} />
      <div className="my-4 flex flex-col space-y-4">
        {groupedCrewByDeparment.map((sortCrew) => (
          <PersonCreditList
            key={sortCrew.department}
            data={sortCrew.values}
            department={sortCrew.department}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(PersonCredit);
