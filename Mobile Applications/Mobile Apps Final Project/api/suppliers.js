import api from "./axios-config";

// GET /suppliers
export async function getAllSuppliers() {
  const resp = await api.get("supplier");
  return resp.data;
}

// GET /suppliers/:id
export async function getSupplierById(id) {
  const resp = await api.get(`supplier/${id}`);
  return resp.data;
}

// POST /suppliers
// backend expects { id: 0, Name, email, phone }
export async function insertSupplier({ Name, email, phone }) {
  const resp = await api.post("supplier", {
    id: 0,
    Name,
    email,
    phone
  });
  return resp.data; // { message, id }
}

// PUT /suppliers/:id
// backend requires params id == body.id
export async function updateSupplier({ id, Name, email, phone }) {
  const resp = await api.put(`supplier/${id}`, {
    id,
    Name,
    email,
    phone
  });
  return resp.data; // { message }
}

// DELETE /suppliers/:id
export async function removeSupplier(id) {
  const resp = await api.delete(`supplier/${id}`);
  return resp.data; // { message }
}