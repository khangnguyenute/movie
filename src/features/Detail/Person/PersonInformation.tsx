import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { PersonImage } from "@components/Image";
import { Title } from "@components/Title";
import { PersonDataType } from "@interfaces/Common";

interface PersonInformationProps {
  person: PersonDataType;
}

const PersonInformation = ({ person }: PersonInformationProps) => {
  const { t } = useTranslation();

  const gender = useMemo(() => {
    if (person.gender === 1) {
      return t("female");
    }
    if (person.gender === 2) {
      return t("male");
    }
    if (person.gender === 3) {
      return t("nonBinary");
    }
    return "-";
  }, [person.gender, t]);

  return (
    <div className="flex flex-col items-start space-y-4">
      <PersonImage
        alt={person.name ?? person.original_name}
        src={person.profile_path}
        gender={person.gender}
        containerClassName="flex aspect-2/3 w-full items-center overflow-hidden rounded-lg bg-gray-300"
        className="w-full"
      />

      <div className="mb-3 text-2xl font-semibold">{t("personalInfo")}</div>
      <Title title={t("knownFor")} subtitle={person.known_for_department} />
      <Title
        title={t("knownCredits")}
        subtitle={person.combined_credits.cast.length + person.combined_credits.crew.length}
      />
      <Title title={t("gender")} subtitle={gender} />
      <Title
        title={t("birthday")}
        subtitle={person.birthday ? dayjs(person.birthday).format(t("dateFormat")) : null}
      />
      <Title title={t("placeOfBirth")} subtitle={person.place_of_birth} />
      <Title
        title={t("alsoKnownAs")}
        subtitle={
          !isEmpty(person.also_known_as) ? (
            <div>
              {person.also_known_as.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          ) : null
        }
      />
    </div>
  );
};

export default memo(PersonInformation);
