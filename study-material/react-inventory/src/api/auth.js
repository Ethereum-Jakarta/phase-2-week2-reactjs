const APP_URL = process.env.REACT_APP_URL + "/auth";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${APP_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return {
        token: data.data.token, 
        user: data.data.user
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
