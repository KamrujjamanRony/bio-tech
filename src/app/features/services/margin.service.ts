import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddMarginRequest, MarginModel, UpdateMarginRequest } from '../model/Margin.model';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MarginService {

  constructor(private http: HttpClient) { }

  addMargin(model: AddMarginRequest | FormData): Observable<void>{
    return this.http.post<void>(environment.MarginApi, model)
  }

  getAllMargin(): Observable<MarginModel[]> {
    return this.http.get<MarginModel[]>(environment.MarginApi);
  }

  getCompanyMargin(companyID: any): Observable<MarginModel | undefined> {
    return this.getAllMargin().pipe(
      map(Margins => Margins.find(data => data.companyID == companyID))
    );
  }

  getMargin(id: string): Observable<MarginModel>{
    return this.http.get<MarginModel>(`${environment.MarginApi}/GetMarginById?id=${id}`);
  }

  updateMargin(id: string, updateMarginRequest: UpdateMarginRequest | FormData): Observable<MarginModel>{
    return this.http.put<MarginModel>(`${environment.MarginApi}/EditMargin/${id}`, updateMarginRequest);
  }

  deleteMargin(id: string): Observable<MarginModel>{
    return this.http.delete<MarginModel>(`${environment.MarginApi}/DeleteMargin?id=${id}`);
  }
}
