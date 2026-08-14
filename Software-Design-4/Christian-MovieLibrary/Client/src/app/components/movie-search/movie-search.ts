import { Component } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './movie-search.html',
  styleUrl: './movie-search.css'
})
export class MovieSearch {
  title = '';
  results$: Observable<Movie[]>;

  constructor(private _movieService: MovieService) {
    this.results$ = this._movieService.searchResults$;
  }

  search(): void {
    const trimmedTitle = this.title.trim();

    if (!trimmedTitle) {
      this._movieService.clearSearchResults();
      return;
    }

    this._movieService.searchMovies(trimmedTitle).subscribe({
      error: (err) => console.error('Search failed', err)
    });
  }
}