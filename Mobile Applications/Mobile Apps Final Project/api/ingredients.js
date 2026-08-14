import api from "./axios-config";

export async function getAllIngredients() {
  const resp = await api.get("ingredient");
  return resp.data;
}

export async function getIngredientById(id) {
  const resp = await api.get(`ingredient/${id}`);
  return resp.data;
}