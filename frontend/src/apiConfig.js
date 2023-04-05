const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://wecare247-backend.onrender.com"
    : "";

export default API_BASE_URL;
