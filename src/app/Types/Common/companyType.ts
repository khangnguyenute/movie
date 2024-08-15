import { BaseDataType, Nullable } from "./commonType";

export interface CompanyDataType extends BaseDataType {
  description: string;
  headquarters: string;
  homepage: string;
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
  parent_company: string | null;
}

export interface CompanyFormDataType extends Nullable<Partial<CompanyDataType>> {}
