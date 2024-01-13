import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { AddCommentRequest, CommentModel, UpdateCommentRequest } from '../model/Comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  addComment(model: AddCommentRequest | FormData): Observable<void>{
    return this.http.post<void>(environment.CommentApi, model)
  }

  getAllComments(): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(environment.CommentApi);
  }

  getCompanyComment(companyID: any): Observable<CommentModel[]> {
    return this.getAllComments().pipe(
      map(Comments => Comments.filter(data => data.companyID == companyID))
    );
  }

  getComment(id: string): Observable<CommentModel>{
    return this.http.get<CommentModel>(`${environment.CommentApi}/GetCommentById?id=${id}`);
  }

  updateComment(id: string, updateCommentRequest: UpdateCommentRequest | FormData): Observable<CommentModel>{
    return this.http.put<CommentModel>(`${environment.CommentApi}/EditComment/${id}`, updateCommentRequest);
  }

  deleteComment(id: string): Observable<CommentModel>{
    return this.http.delete<CommentModel>(`${environment.CommentApi}/DeleteComment?id=${id}`);
  }
}
