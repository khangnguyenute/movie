import { COLLECTION_API_PATH } from "@constants/apiConstant";

import { CollectionDataType } from "@interfaces/Common";
import { axiosInstance } from "@utils/Axios";

const getCollectionById = async (id: number): Promise<CollectionDataType> => {
  const response = await axiosInstance.get(COLLECTION_API_PATH.COLLECTION_DETAIL(id));

  return response.data;
};

export { getCollectionById };
