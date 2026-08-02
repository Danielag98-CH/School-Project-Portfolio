import axios, { errorHandler } from "./axios-config";

// Media Types API
export function getAllMediaTypes() {
  return axios.get("media-types/").then(resp => resp.data).catch(errorHandler);
}
export function getMediaTypesById(id) {
  return axios.get("media-types/" + id).then(resp => resp.data).catch(errorHandler);
}
export function insertMediaTypes(mediaType) {
  return axios.post("media-types/", mediaType).then(resp => resp.data).catch(errorHandler);
}
export function updateMediaTypes(mediaType) {
  return axios.put("media-types/" + mediaType.id, mediaType).then(resp => resp.data).catch(errorHandler);
}
/* MEDIA TYPES CANNOT BE DELETED:
export function deleteMediaTypes(id) {
  return axios.delete("media-types/" + id).then(resp => resp.data).catch(errorHandler);
}
*/