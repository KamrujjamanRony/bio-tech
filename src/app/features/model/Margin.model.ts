export interface MarginModel {
    id: string;
    companyID: number;
    code: string;
    type: string;
  }
  
  export interface AddMarginRequest {
    companyID: number;
    code: string;
  }
  
  export interface UpdateMarginRequest {
    companyID: number;
    code: string;
  }
