import axios, { errorHandler } from "./axios-config";

// Artists API
export function getAllArtists() {
  return axios.get("artists/").then(resp => resp.data).catch(errorHandler);
}
export function getArtistById(id) {
  return axios.get("artists/" + id).then(resp => resp.data).catch(errorHandler);
}
export function insertArtist(artist) {
  return axios.post("artists/", artist).then(resp => resp.data).catch(errorHandler);
}
export function updateArtist(artist) {
  return axios.put("artists/" + artist.id, artist).then(resp => resp.data).catch(errorHandler);
}
/* ARTISTS CANNOT BE DELETED:
export function deleteArtist(id) {
  return axios.delete("artists/" + id).then(resp => resp.data).catch(errorHandler);
}
  */