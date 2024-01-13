import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environments';
import { AddDoctorRequest, DoctorModel, UpdateDoctorRequest } from '../model/Doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  addDoctor(model: AddDoctorRequest | FormData): Observable<void>{
    return this.http.post<void>(environment.DoctorApi, model)
  }

  getAllDoctors(): Observable<DoctorModel[]> {
    return this.http.get<DoctorModel[]>(environment.DoctorApi);
  }

  getCompanyDoctors(companyID: any): Observable<DoctorModel[]> {
    return this.getAllDoctors().pipe(
      map(doctors => doctors.filter(data => data.companyID == companyID))
    );
  }

  getDoctor(id: string): Observable<DoctorModel>{
    return this.http.get<DoctorModel>(`${environment.DoctorApi}/GetRefDrById?id=${id}`);
  }

  updateDoctor(id: string, updateDoctorRequest: UpdateDoctorRequest | FormData): Observable<DoctorModel>{
    return this.http.put<DoctorModel>(`${environment.DoctorApi}/EditRefDr/${id}`, updateDoctorRequest);
  }

  deleteDoctor(id: string): Observable<DoctorModel>{
    return this.http.delete<DoctorModel>(`${environment.DoctorApi}/DeleteRefDr?id=${id}`);
  }
}
