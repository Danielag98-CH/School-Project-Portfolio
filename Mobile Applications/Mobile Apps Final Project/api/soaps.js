import api from "./axios-config";

export async function getAllSoaps() {
  const resp = await api.get("soap");
  return resp.data;
}

export async function getSoapById(id) {
  const resp = await api.get(`soap/${id}`);
  return resp.data;
}

export async function insertSoap({ soap_name, description = "", created_by }) {
  const resp = await api.post("soap", {
    soap_id: 0,
    soap_name,
    description,
    created_by
  });
  return resp.data;
}

export async function updateSoap({ soap_id, soap_name, description = "", created_by }) {
  const resp = await api.put(`soap/${soap_id}`, {
    soap_id,
    soap_name,
    description,
    created_by
  });
  return resp.data;
}

export async function removeSoap(id) {
  const resp = await api.delete(`soap/${id}`);
  return resp.data;
}