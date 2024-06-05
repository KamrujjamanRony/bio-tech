import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AddMainUIRequest, MainUIModel, UpdateMainUIRequest } from '../model/MainUI.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MainUIService {

  constructor(private http: HttpClient) { }

  addMainUI(model: AddMainUIRequest | FormData): Observable<void>{
    return this.http.post<void>(environment.MainUIApi, model)
  }

  getAllMainUIs(): Observable<MainUIModel[]> {
    return this.http.get<MainUIModel[]>(environment.MainUIApi);
  }

  getCompanyMainUIs(companyID: any): Observable<MainUIModel[]> {
    return this.http.get<MainUIModel[]>(`${environment.MainUIApi}/GetCompanyId?filterOn=CompanyID&filterQuery=${companyID}`);
  }

  getMainUI(id: string): Observable<MainUIModel>{
    return this.http.get<MainUIModel>(`${environment.MainUIApi}/GetMainUIById?id=${id}`);
  }

  updateMainUI(id: string, updateMainUIRequest: UpdateMainUIRequest | FormData): Observable<MainUIModel>{
    return this.http.put<MainUIModel>(`${environment.MainUIApi}/EditMainUI/${id}`, updateMainUIRequest);
  }

  deleteMainUI(id: string): Observable<MainUIModel>{
    return this.http.delete<MainUIModel>(`${environment.MainUIApi}/DeleteMainUI?id=${id}`);
  }

  companyWiseTest( data: any | FormData ): Observable<any>{
    return this.http.post<any>(`${environment.MainUIApi}/GetCompanyIDwiseTotal`, data);
  }
}
