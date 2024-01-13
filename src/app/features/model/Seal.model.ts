export interface SealModel {
  id: string;
  companyID: number;
  code: string;
  name: string;
  degree: string;
  position: string;
}

export interface AddSealRequest {
  companyID: number;
  name: string;
  degree: string;
  position: string;
}

export interface UpdateSealRequest {
  companyID: number;
  name: string;
  degree: string;
  position: string;
}