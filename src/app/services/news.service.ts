import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class NewsService {

  private apiURL = 'https://api.spaceflightnewsapi.net/v4/articles/';

  constructor(private http: HttpClient) { }

  getNews(url:string): Observable<any> {
    return this.http.get<any>(url);
  }

  search(query:string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}?has_event=false&has_launch=false&limit=10&search=${query}`);
  }

  orderByTitle(): Observable<any> {
    const url = `${this.apiURL}?has_event=false&has_launch=false&limit=10&ordering=published_at`;
    return this.http.get<any>(url);
  }
}