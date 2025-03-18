const APP_URL = process.env.REACT_APP_URL + "/orders";
const token = localStorage.getItem("token");

export const getOrders = async () => {
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
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const getOrder = async (id) => {
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
    console.error(`Error fetching order with ID ${id}:`, error);
    return null;
  }
};

export const getOrderItemsByOrderId = async (id) => {
  try {
    const response = await fetch(`${APP_URL}/${id}/order-items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const data = await response.json();
    return data.status === 200 ? data.data : [];
  } catch (error) {
    console.error(`Error fetching order items for order ID ${id}:`, error);
    return [];
  }
};
