const APP_URL = process.env.REACT_APP_URL + "/categories";
const token = localStorage.getItem("token");

export const getCategories = async () => {
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
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getCategory = async (id) => {
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
    console.error(`Error fetching category with ID ${id}:`, error);
    return null;
  }
};

export const createCategory = async (name) => {
  try {
    await fetch(APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ name }),
    });
  } catch (error) {
    console.error("Error adding category:", error);
  }
};

export const updateCategory = async (id, name) => {
  try {
    await fetch(`${APP_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ name }),
    });
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

export const deleteCategory = async (id) => {
  try {
    await fetch(`${APP_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};
