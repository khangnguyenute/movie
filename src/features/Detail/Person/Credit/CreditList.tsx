import dayjs from "dayjs";
import { chain, isEmpty, orderBy } from "lodash";
import { memo, useMemo } from "react";

import { CastOfMotionPictureDataType, CrewOfMotionPictureDataType } from "@interfaces/Common";

import MotionPictureCreditItem from "./CreditItem";

interface PersonCreditListProps {
  data: Array<CastOfMotionPictureDataType | CrewOfMotionPictureDataType>;
  department: string;
}

const PersonCreditList = ({ data, department }: PersonCreditListProps) => {
  const sortedDataByDate = useMemo(
    () => orderBy(data, (item) => item.release_date ?? item.last_air_date, "desc"),
    [data],
  );

  const groupedDataByYear = useMemo(
    () =>
      chain(sortedDataByDate)
        .groupBy((sortedItem) => dayjs(sortedItem.release_date ?? sortedItem.first_air_date).year())
        .map((values, year) => ({ values, year }))
        .value(),
    [sortedDataByDate],
  );

  if (isEmpty(data)) {
    return <div />;
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="mb-2 text-xl font-semibold">{department}</div>
      <div className="border-2 shadow-lg">
        {groupedDataByYear.reverse().map((groupedData) => (
          <div key={groupedData.year} className="flex flex-col space-y-2 border-b-2 p-3 last:border-none">
            {groupedData.values.map((item) => (
              <MotionPictureCreditItem key={item.id} creditOfMotionPicture={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(PersonCreditList);
