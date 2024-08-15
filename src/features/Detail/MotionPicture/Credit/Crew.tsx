import { chain, isEmpty } from "lodash";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { CreditListItem, CreditListSkeleton } from "@components/Credit";
import { CrewDataType } from "@interfaces/Common";

interface MotionPictureCrewProps {
  crews: CrewDataType[];
  isLoading: boolean;
}

const MotionPictureCrew = ({ crews, isLoading }: MotionPictureCrewProps) => {
  const { t } = useTranslation();

  const groupedCrewByDeparment = useMemo(
    () =>
      chain(crews)
        .groupBy("department")
        .map((values, department) => ({ values, department }))
        .sort((a, b) => a.department.localeCompare(b.department))
        .value(),
    [crews],
  );

  const groupedCrewById = useCallback(
    (data: CrewDataType[]) =>
      chain(data)
        .groupBy("id")
        .map((values) => ({ ...values[0], job: values.map((item) => item.job).join(", ") }))
        .sort((a, b) => a.job.localeCompare(b.job))
        .value(),
    [],
  );

  const quantityOfCrew = useMemo(
    () => groupedCrewByDeparment.reduce((sum, { values }) => sum + groupedCrewById(values).length, 0),
    [groupedCrewByDeparment, groupedCrewById],
  );

  if (isLoading) {
    return <CreditListSkeleton />;
  }

  if (isEmpty(crews)) {
    return <div />;
  }

  return (
    <div className="my-4 flex flex-col space-y-4">
      <div className="text-2xl">
        <span className="mr-2 font-bold">{t("crew")}</span>
        <span className="text-slate-500">{quantityOfCrew}</span>
      </div>

      {groupedCrewByDeparment.map((groupedCrew) => (
        <div key={groupedCrew.department} className="flex flex-col space-y-3">
          <div className="font-bold">{groupedCrew.department}</div>
          {groupedCrewById(groupedCrew.values).map((crew) => (
            <CreditListItem key={crew.id} credit={crew} subtitle={crew.job} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default memo(MotionPictureCrew);
