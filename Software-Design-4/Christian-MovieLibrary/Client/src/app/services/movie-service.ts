import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private _http = inject(HttpClient);

  // BehaviorSubjects
  private _movieListSubject: BehaviorSubject<Movie[]> =
    new BehaviorSubject<Movie[]>([] as Movie[]);

  private _movieSubject: BehaviorSubject<Movie | null> =
    new BehaviorSubject<Movie | null>(null);

  private _searchResultsSubject: BehaviorSubject<Movie[]> =
    new BehaviorSubject<Movie[]>([] as Movie[]);

  // Observables
  public movieList$: Observable<Movie[]> =
    this._movieListSubject.asObservable();

  public movie$: Observable<Movie | null> =
    this._movieSubject.asObservable();

  public searchResults$: Observable<Movie[]> =
    this._searchResultsSubject.asObservable();

  // Getters
  public get movieList(): Movie[] {
    return this._movieListSubject.value;
  }

  public get movie(): Movie | null {
    return this._movieSubject.value;
  }

  public get searchResults(): Movie[] {
    return this._searchResultsSubject.value;
  }

  public getAllMovies(): Observable<Movie[]> {
    return this._http.get<Movie[]>(`/api/movies`).pipe(
      tap((movies) => {
        this._movieListSubject.next(movies);
      })
    );
  }

  public getMovieById(movieId: number): Observable<Movie> {
    return this._http.get<Movie>(`/api/movies/${movieId}`).pipe(
      tap((movie) => {
        this._movieSubject.next(movie);
      })
    );
  }

  public searchMovies(title: string): Observable<Movie[]> {
    const params = new HttpParams().set('title', title);

    return this._http.get<Movie[]>(`/api/movies/search`, { params }).pipe(
      tap((movies) => {
        this._searchResultsSubject.next(movies);
      })
    );
  }

  public select(movie: Movie | null): void {
    this._movieSubject.next(movie);
  }

  public clearSearchResults(): void {
    this._searchResultsSubject.next([]);
  }
}