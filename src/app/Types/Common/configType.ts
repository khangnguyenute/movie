import { ConfigTypeEnum } from "../../Enums";

export interface ConfigDataType {
  key: string;
  name: string;
  type: ConfigTypeEnum[];
  value: string;
}
