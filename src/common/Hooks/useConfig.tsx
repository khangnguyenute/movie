import { isArray } from "lodash";
import { useCallback } from "react";

import { ConfigKeyEnum } from "@enums/configEnum";

import useSelector from "./useSelector";

const useConfig = () => {
  const configs = useSelector((state) => state.common.configs);
  const getConfig = useCallback(
    (configKey: ConfigKeyEnum, defaultValue?: string) => {
      if (!isArray(configs)) {
        return undefined;
      }
      const config = configs.find((item) => item.key === configKey);
      return config?.value ?? defaultValue;
    },
    [configs],
  );

  return getConfig;
};

export default useConfig;
