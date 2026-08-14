const SOAP_PHOTOS_BY_ID = {
  1: require("../assets/soaps/lavender-bliss.jpg"),
  2: require("../assets/soaps/rose-radiance.jpg")
};

export function getSoapPhotoById(soapId) {
  return SOAP_PHOTOS_BY_ID[Number(soapId)] || null;
}