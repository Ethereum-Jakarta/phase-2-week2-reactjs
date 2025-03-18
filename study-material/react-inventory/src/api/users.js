const APP_URL = process.env.REACT_APP_URL + "/users";

export const getUsers = async () => {
  try {
    const response = await fetch(APP_URL);
    const data = await response.json();
    return data.status === 200 ? data.data : [];
  } catch (error) {
    console.error("Error fetching Users:", error);
    return [];
  }
};

export const getUser = async (id) => {
  try {
    const response = await fetch(`${APP_URL}/${id}`);
    const data = await response.json();
    return data.status === 200 ? data.data : null;
  } catch (error) {
    console.error(`Error fetching User with ID ${id}:`, error);
    return null;
  }
};

export const createUser = async (name, email, password, role) => {
  try {
    await fetch(APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
  } catch (error) {
    console.error("Error adding User:", error);
  }
};

export const updateUser = async (id, name, email, password, role) => {
  try {
    const updatedData = { name, email, role };
    if (password) {
      updatedData.password = password;
    }

    await fetch(`${APP_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
  } catch (error) {
    console.error("Error updating User:", error);
  }
};

export const deleteUser = async (id) => {
  try {
    await fetch(`${APP_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error deleting User:", error);
  }
};
