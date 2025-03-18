const APP_URL = process.env.REACT_APP_URL + "/products";
const token = localStorage.getItem("token");

export const getProducts = async () => {
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
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProduct = async (id) => {
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
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
};

export const createProduct = async (name, description, price, quantityInStock, categoryId, userId) => {
  try {
    await fetch(APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        name,
        description,
        price: Number(parseFloat(price).toFixed(2)),
        quantityInStock: Number(quantityInStock),
        categoryId,
        userId,
      }),
    });
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

export const updateProduct = async (id, name, description, price, quantityInStock, categoryId, userId) => {
  try {
    await fetch(`${APP_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        name,
        description,
        price: Number(parseFloat(price).toFixed(2)),
        quantityInStock: Number(quantityInStock),
        categoryId,
        userId,
      }),
    });
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

export const deleteProduct = async (id) => {
  try {
    await fetch(`${APP_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};
