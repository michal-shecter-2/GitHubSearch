import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GitHubSearchResult } from '../models/repository.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://localhost:7196/api/github'; 

  constructor(private http: HttpClient) { }

  searchRepositories(query: string): Observable<GitHubSearchResult> {
    const params = new HttpParams().set('query', query);
    return this.http.get<GitHubSearchResult>(`${this.apiUrl}/search`, { params });
  }
}