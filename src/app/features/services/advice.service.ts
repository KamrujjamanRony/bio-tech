import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddAdviceRequest, AdviceModel, UpdateAdviceRequest } from '../model/Advice.model';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AdviceService {

  constructor(private http: HttpClient) { }

  addAdvice(model: AddAdviceRequest | FormData): Observable<void>{
    return this.http.post<void>(environment.AdviceApi, model)
  }

  getAllAdvices(): Observable<AdviceModel[]> {
    return this.http.get<AdviceModel[]>(environment.AdviceApi);
  }

  getCompanyAdvice(companyID: any): Observable<AdviceModel[]> {
    return this.getAllAdvices().pipe(
      map(advice => advice.filter(data => data.companyID == companyID))
    );
  }

  getAdvice(id: string): Observable<AdviceModel>{
    return this.http.get<AdviceModel>(`${environment.AdviceApi}/GetAdviceById?id=${id}`);
  }

  updateAdvice(id: string, updateAdviceRequest: UpdateAdviceRequest | FormData): Observable<AdviceModel>{
    return this.http.put<AdviceModel>(`${environment.AdviceApi}/EditAdvice/${id}`, updateAdviceRequest);
  }

  deleteAdvice(id: string): Observable<AdviceModel>{
    return this.http.delete<AdviceModel>(`${environment.AdviceApi}/DeleteAdvice?id=${id}`);
  }
}
