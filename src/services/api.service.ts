import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.api.base;

  constructor(private http: HttpClient) {}

  index<R>(
    path: string,
    per_page: number = 10,
    search: string = '',
    page: number | string = ''
  ): Observable<R> {
    return this.http.get<R>(`${this.apiUrl}/${path}`, {
      params: {
        search: search,
        per_page: per_page.toString(),
        page: page.toString(),
      },
    });
  }

  store<T, R>(path: string, data: T): Observable<R> {
    return this.http.post<R>(`${this.apiUrl}/${path}`, data);
  }

  update<T, R>(path: string, id: string, data: T): Observable<R> {
    return this.http.put<R>(`${this.apiUrl}/${path}/${id}`, data);
  }

  destroy<T, R>(path: string, id?: string, data?: T): Observable<R> {
    const url = id ? `${this.apiUrl}/${path}/${id}` : `${this.apiUrl}/${path}`;
    return this.http.delete<R>(url, {
      body: data,
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.http
      .get(`${this.apiUrl}/authenticated-user`, { withCredentials: true })
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
}
