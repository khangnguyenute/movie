import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import useDocumentTitle from "@hooks/useDocumentTitle";
import useToast from "@hooks/useToast";
import { BaseListQueryType, PersonDataType } from "@interfaces/Common";
import { personService } from "@services/index";
import { showToastError } from "@utils/Helpers";

import PersonGrid from "./Components/Grid";
import PersonTable from "./Components/Table";

const PersonManagement = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const [personData, setPersonData] = useState<PersonDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [queryParam, setQueryParam] = useState<BaseListQueryType | null>(null);
  const [totalRows, setTotalRows] = useState<number>(0);

  const getPeople = useCallback(async () => {
    if (!queryParam) {
      return;
    }

    setIsLoading(true);

    try {
      const { data, meta } = await personService.getPeople(queryParam);

      setPersonData(data);
      setTotalRows(meta.totalResults);
    } catch (error) {
      showToastError(error, toast.error);
    } finally {
      setIsLoading(false);
    }
  }, [queryParam, toast]);

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  useDocumentTitle(t("popularPeople"));

  return (
    <div className="mx-auto w-full max-w-layout py-8">
      <div className="mb-6 text-2xl font-semibold">{t("popularPeople")}</div>
      <PersonTable
        data={personData}
        isLoading={isLoading}
        totalRows={totalRows}
        onChangeState={setQueryParam}
      >
        <PersonGrid people={personData} isLoading={isLoading} />
      </PersonTable>
    </div>
  );
};

export default memo(PersonManagement);
