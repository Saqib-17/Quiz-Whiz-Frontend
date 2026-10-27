const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "https://quiz-whiz-backend.vercel.app"
).replace(/\/+$/, "");

export function apiUrl(path) {
  return `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
}
