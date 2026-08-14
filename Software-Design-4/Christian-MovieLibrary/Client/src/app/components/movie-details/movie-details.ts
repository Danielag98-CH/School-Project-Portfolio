import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails implements OnInit {
  movie$: Observable<Movie | null>;

  constructor(
    private _route: ActivatedRoute,
    private _movieService: MovieService
  ) {
    this.movie$ = this._movieService.movie$;
  }

  ngOnInit(): void {
    const id = Number(this._route.snapshot.paramMap.get('movieId'));
    this._movieService.getMovieById(id).subscribe({
        error: err => console.error('Failed to load movie', err)
      });
  }
}