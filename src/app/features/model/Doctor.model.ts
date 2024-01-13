export interface DoctorModel {
    id: string;
    companyID: number;
    code: string;
    name: string;
}

export interface AddDoctorRequest {
    companyID: number;
    code: string;
    name: string;
}

export interface UpdateDoctorRequest {
    companyID: number;
    code: string;
    name: string;
}