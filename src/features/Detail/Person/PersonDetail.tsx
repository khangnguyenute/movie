import { PERSON_PATH } from "@constants/routeConstant";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";

import { LoadingOverlay } from "@components/Loading";
import useDocumentTitle from "@hooks/useDocumentTitle";
import useToast from "@hooks/useToast";
import { PersonDataType } from "@interfaces/Common";
import { personService } from "@services/index";
import { showToastError } from "@utils/Helpers";

import PersonCredit from "./Credit/Credit";
import PersonInformation from "./PersonInformation";
import PersonOverview from "./PersonOverview";

const PersonDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const toast = useToast();

  const [personData, setPersonData] = useState<PersonDataType | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getPersonById = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await personService.getPersonById(Number(id));
      setPersonData(response);
    } catch (error) {
      showToastError(error, toast.error);
    } finally {
      setIsLoading(false);
    }
  }, [id, toast]);

  useDocumentTitle(`${personData?.name || personData?.original_name || t("person")}`);

  useEffect(() => {
    getPersonById();
  }, [getPersonById]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (!personData) {
    return <Navigate to={PERSON_PATH.PERSON_LIST} />;
  }

  return (
    <div className="mx-auto grid w-full max-w-layout grid-cols-4 gap-8">
      <div className="col-span-1 flex flex-col space-y-8 py-8">
        <PersonInformation person={personData} />
      </div>
      <div className="col-span-3 flex flex-col py-8">
        <PersonOverview person={personData} isLoading={isLoading} />
        <PersonCredit combinedCredits={personData.combined_credits} />
      </div>
    </div>
  );
};

export default memo(PersonDetail);
