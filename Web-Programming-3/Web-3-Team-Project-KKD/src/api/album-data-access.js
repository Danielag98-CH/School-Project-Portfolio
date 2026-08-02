import axios, { errorHandler } from "./axios-config";

// Albums API
export function getAllAlbums() {
  return axios.get("albums/").then(resp => resp.data).catch(errorHandler);
}
export function getAlbumById(id) {
  return axios.get("albums/" + id).then(resp => resp.data).catch(errorHandler);
}
export function insertAlbum(album) {
  return axios.post("albums/", album).then(resp => resp.data).catch(errorHandler);
}
export function updateAlbum(album) {
  return axios.put("albums/" + album.id, album).then(resp => resp.data).catch(errorHandler);
}
/* ALBUMS CANNOT BE DELETED:
export function deleteAlbum(id) {
  return axios.delete("albums/" + id).then(resp => resp.data).catch(errorHandler);
}
*/