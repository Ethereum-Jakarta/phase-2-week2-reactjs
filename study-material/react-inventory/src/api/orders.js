const APP_URL = process.env.REACT_APP_URL + "/orders";

export const getOrders = async () => {
  try {
    const response = await fetch(APP_URL);
    const data = await response.json();
    return data.status === 200 ? data.data : [];
  } catch (error) {
    console.error("Error fetching Orders:", error);
    return [];
  }
};

export const getOrder = async (id) => {
  try {
    const response = await fetch(`${APP_URL}/${id}`);
    const data = await response.json();
    return data.status === 200 ? data.data : null;
  } catch (error) {
    console.error(`Error fetching Order with ID ${id}:`, error);
    return null;
  }
};

export const getOrderItemsByOrderId = async (id) => {
  try {
    const response = await fetch(`${APP_URL}/${id}/order-items`);
    const data = await response.json();
    return data.status === 200 ? data.data : [];
  } catch (error) {
    console.error(`Error fetching Order Items for Order ID ${id}:`, error);
    return [];
  }
};
