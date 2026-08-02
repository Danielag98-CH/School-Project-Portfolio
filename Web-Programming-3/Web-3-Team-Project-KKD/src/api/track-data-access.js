import axios, { errorHandler } from "./axios-config";

// Tracks API
export function getAllTracks() {
  return axios.get("tracks/").then(resp => resp.data).catch(errorHandler);
}
export function getTrackById(id) {
  return axios.get("tracks/" + id).then(resp => resp.data).catch(errorHandler);
}
export function insertTrack(track) {
  return axios.post("tracks/", track).then(resp => resp.data).catch(errorHandler);
}
export function updateTrack(track) {
  return axios.put("tracks/" + track.id, track).then(resp => resp.data).catch(errorHandler);
}
export function deleteTrack(id) {
  return axios.delete("tracks/" + id).then(resp => resp.data).catch(errorHandler);
}