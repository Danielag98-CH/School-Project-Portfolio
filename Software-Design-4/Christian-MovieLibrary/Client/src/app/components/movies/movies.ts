import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class Movies implements OnInit {
  movies$: Observable<Movie[]>;

  constructor(private _movieService: MovieService) {
    this.movies$ = this._movieService.movieList$;
  }

  ngOnInit(): void {
    this._movieService.getAllMovies().subscribe();
  }
  trackByMovieId(index: number, movie: Movie): number {
    return movie.id;
  }
}