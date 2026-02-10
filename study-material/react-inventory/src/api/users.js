const APP_URL = process.env.REACT_APP_URL + "/users";
const token = localStorage.getItem("token");

export const getUsers = async () => {
  try {
    const response = await fetch(APP_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const data = await response.json();
    return data.status === 200 ? data.data : [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getUser = async (id) => {
  try {
    const response = await fetch(`${APP_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const data = await response.json();
    return data.status === 200 ? data.data : null;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    return null;
  }
};

export const createUser = async (name, email, password, role) => {
  try {
    await fetch(APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ name, email, password, role }),
    });
  } catch (error) {
    console.error("Error adding user:", error);
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
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(updatedData),
    });
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const deleteUser = async (id) => {
  try {
    await fetch(`${APP_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
