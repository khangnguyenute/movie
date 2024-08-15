import { LINK_PATH } from "@constants/commonConstant";
import { memo } from "react";

import { NetworkDataType } from "@interfaces/Common";

interface TVShowNetworkProps {
  networks: NetworkDataType[];
}

const TVShowNetwork = ({ networks }: TVShowNetworkProps) => {
  return (
    <div className="flex flex-col items-start space-y-2">
      {networks.map((network) => (
        <img key={network.id} src={LINK_PATH.NETWORK_PATH(network.logo_path)} alt={network.name} />
      ))}
    </div>
  );
};

export default memo(TVShowNetwork);
