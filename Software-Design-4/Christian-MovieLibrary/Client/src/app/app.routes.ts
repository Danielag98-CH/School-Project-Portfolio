import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Movies } from './components/movies/movies';
import { MovieDetails } from './components/movie-details/movie-details';
import { MovieSearch } from './components/movie-search/movie-search';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'movies', component: Movies },
  { path: 'movies/search', component: MovieSearch },
  { path: 'movies/:movieId', component: MovieDetails }
];