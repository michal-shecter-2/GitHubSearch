import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Repository } from '../models/repository.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private apiUrl = 'https://localhost:7196/api/bookmarks';
  private _bookmarks$ = new BehaviorSubject<Repository[]>([]);

  bookmarks$ = this._bookmarks$.asObservable();

  constructor(private http: HttpClient) {}

  getBookmarks(): Observable<Repository[]> {
    return this.http.get<Repository[]>(this.apiUrl, { withCredentials: true }).pipe(
      tap(bookmarks => this._bookmarks$.next(bookmarks))
    );
  }

  addBookmark(repo: Repository): Observable<Repository[]> {
    return this.http.post<Repository[]>(this.apiUrl, repo, { withCredentials: true }).pipe(
      tap(bookmarks => this._bookmarks$.next(bookmarks))
    );
  }

 
  removeBookmark(repoId: number): Observable<Repository[]> {
    const url = `${this.apiUrl}/${repoId}`;
    return this.http.delete<Repository[]>(url, { withCredentials: true }).pipe(
        tap(bookmarks => this._bookmarks$.next(bookmarks))
    );
  }
}