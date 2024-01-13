import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddSealRequest, SealModel, UpdateSealRequest } from '../model/Seal.model';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SealService {

  constructor(private http: HttpClient) { }

  addSeal(model: AddSealRequest | FormData): Observable<void>{
    return this.http.post<void>(environment.SealApi, model)
  }

  getAllSeals(): Observable<SealModel[]> {
    return this.http.get<SealModel[]>(environment.SealApi);
  }

  getCompanySeals(companyID: any): Observable<SealModel[]> {
    return this.getAllSeals().pipe(
      map(Seals => Seals.filter(data => data.companyID == companyID))
    );
  }

  getSeal(id: string): Observable<SealModel>{
    return this.http.get<SealModel>(`${environment.SealApi}/GetSetSealById?id=${id}`);
  }

  updateSeal(id: string, updateSealRequest: UpdateSealRequest | FormData): Observable<SealModel>{
    return this.http.put<SealModel>(`${environment.SealApi}/EditSetSeal/${id}`, updateSealRequest);
  }

  deleteSeal(id: string): Observable<SealModel>{
    return this.http.delete<SealModel>(`${environment.SealApi}/DeleteSetSeal?id=${id}`);
  }
}
