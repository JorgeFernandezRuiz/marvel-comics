import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchResults: Observable<any>;
  constructor(private httpClient: HttpClient) { }

  search(parameters: object): Observable<any>{
      const params = this.convertObjectToParams(parameters);
      this.searchResults = this.httpClient.get(`/v1/public/characters`, {params: params});
      return this.searchResults;

  }

  private convertObjectToParams(parameters: object): HttpParams {
    const keys = Object.keys(parameters);
    let params = new HttpParams();
    for (const item of keys) {
      params = params.append(item, parameters[item]);
    }
    console.log(parameters);
    return params;
  }
}
