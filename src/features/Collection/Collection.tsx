import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import useDocumentTitle from "@hooks/useDocumentTitle";
import useToast from "@hooks/useToast";
import { CollectionDataType } from "@interfaces/Common";
import { collectionService } from "@services/index";
import { showToastError } from "@utils/Helpers";

import CollectionMotionPicture from "./CollectionMotionPicture";
import CollectionOverview from "./CollectionOverview";

const Collection = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const { id } = useParams();

  const [collectionData, setCollectionData] = useState<CollectionDataType | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCollectionById = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await collectionService.getCollectionById(Number(id));
      setCollectionData(response);
    } catch (error) {
      showToastError(error, toast.error);
    } finally {
      setIsLoading(false);
    }
  }, [id, toast]);

  useEffect(() => {
    getCollectionById();
  }, [getCollectionById]);

  useDocumentTitle(t("collection"));

  if (isLoading || !collectionData) {
    return null;
  }

  return (
    <>
      <CollectionOverview collection={collectionData} />
      <div className="mx-auto flex w-full max-w-layout flex-col space-y-8 py-8">
        <CollectionMotionPicture motionPictures={collectionData.parts} />
      </div>
    </>
  );
};

export default memo(Collection);
