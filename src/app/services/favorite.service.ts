import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const urlBase = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http:HttpClient) { }

  save(data: any) {
    console.log(data);
    return this.http.post(`${urlBase}/news/`, data);
  }

  getNewsFavorites(numPage: any) {
    const url = `${urlBase}/news/page/${numPage}`;
    return this.http.get(url);
  }

  delete(id: any) { 
    const url = `${urlBase}/news/${id}`;
    return this.http.delete(url);
  } 

  searchNewsFavorites(term: any,  numPage: any) {
    const url = `${urlBase}/news/filter/${term}/page/${numPage}`;
    return this.http.get(url);
  }
}
