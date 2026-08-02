import axios, { errorHandler } from "./axios-config";

// Genres API
export function getAllGenres() {
  return axios.get("genres/").then(resp => resp.data).catch(errorHandler);
}
export function getGenreById(id) {
  return axios.get("genres/" + id).then(resp => resp.data).catch(errorHandler);
}
export function insertGenre(genre) {
  return axios.post("genres/", genre).then(resp => resp.data).catch(errorHandler);
}
export function updateGenre(genre) {
  return axios.put("genres/" + genre.id, genre).then(resp => resp.data).catch(errorHandler);
}
/* GENRES CANNOT BE DELETED:
export function deleteGenre(id) {
  return axios.delete("genres/" + id).then(resp => resp.data).catch(errorHandler);
}
*/