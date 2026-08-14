import api from "./axios-config";

// GET /soap-ingredient
export async function getAllSoapIngredients() {
  const resp = await api.get("soap-ingredient");
  return resp.data;
}

// GET /soap-ingredient/soap/:soapId
export async function getSoapIngredientsForSoap(soapId) {
  const resp = await api.get(`soap-ingredient/soap/${soapId}`);
  return resp.data;
}

// GET /soap-ingredient/:soapId/:ingredientId
export async function getSoapIngredientOne(soapId, ingredientId) {
  const resp = await api.get(`soap-ingredient/${soapId}/${ingredientId}`);
  return resp.data;
}

// POST /soap-ingredient
export async function insertSoapIngredient({ soap_id, ingredient_id, amount_used }) {
  const resp = await api.post("soap-ingredient", {
    soap_id,
    ingredient_id,
    amount_used
  });
  return resp.data;
}

// PUT /soap-ingredient/:soapId/:ingredientId
export async function updateSoapIngredient({ soap_id, ingredient_id, amount_used }) {
  const resp = await api.put(`soap-ingredient/${soap_id}/${ingredient_id}`, {
    soap_id,
    ingredient_id,
    amount_used
  });
  return resp.data;
}

// DELETE /soap-ingredient/:soapId/:ingredientId
export async function removeSoapIngredient(soapId, ingredientId) {
  const resp = await api.delete(`soap-ingredient/${soapId}/${ingredientId}`);
  return resp.data;
}