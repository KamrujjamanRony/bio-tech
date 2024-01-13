export interface AdviceModel {
    id: string;
    companyID: number;
    code: string;
    advices: string;
}

export interface AddAdviceRequest {
    companyID: number;
    code: string;
    advices: string;
}

export interface UpdateAdviceRequest {
    companyID: number;
    code: string;
    advices: string;
}