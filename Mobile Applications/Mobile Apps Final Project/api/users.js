import api from "./axios-config";

// GET /users
export async function getAllUsers() {
  const resp = await api.get("users");
  return resp.data;
}

// GET /users/:id
export async function getUserById(id) {
  const resp = await api.get(`users/${id}`);
  return resp.data;
}

// POST /users (admin-only)
export async function insertUser({ firstName, lastName, email, roleId = 2, active = true }) {
  const resp = await api.post("users", {
    id: 0,
    firstName,
    lastName,
    email,
    roleId,
    active
  });
  return resp.data; 
}

// PUT /users/:id
// Use this for: activate/deactivate AND reset password (password optional)
export async function updateUser({ id, firstName, lastName, email, roleId, active, password }) {
  const body = {
    id,
    firstName,
    lastName,
    email,
    roleId,
    active
  };

  if (password) {
    body.password = password;
  }

  const resp = await api.put(`users/${id}`, body);
  return resp.data;
}

export async function createUserAsAdmin({ firstName, lastName, email, password }) {
  const resp = await api.post("users", {
    id: 0,
    firstName,
    lastName,
    email,
    roleId: 2,
    active: true,
    password
  });
  return resp.data;
}

export async function setUserPasswordAsAdmin({ id, firstName, lastName, email, password }) {
  const resp = await api.put(`users/${id}`, {
    id,
    firstName,
    lastName,
    email,
    password,
    roleId: 2,
    active: true
  });
  return resp.data;
}


export async function createStandardUserWithPassword({ firstName, lastName, email, password }) {
  const created = await insertUser({ firstName, lastName, email, password, roleId: 2, active: true });
  const newId = created?.id;

  if (!newId) {
    throw new Error("User created but no id returned.");
  }

  await updateUser({
    id: newId,
    firstName,
    lastName,
    email,
    password,
    roleId: 2,
    active: true
  });

  return resp.data;
}