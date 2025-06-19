import api from "./api"

export const authService = {
  // Đăng nhập
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password })
    if (response.accessToken) {
      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)
    }
    return response
  },

  // Đăng ký
  register: async (userData) => {
    return await api.post("/auth/register", userData)
  },

  // Đăng xuất
  logout: async () => {
    try {
      await api.post("/auth/logout")
    } finally {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    }
  },

  // Lấy thông tin user hiện tại
  getCurrentUser: async () => {
    return await api.get("/auth/me")
  },

  // Refresh token
  refreshToken: async () => {
    const refreshToken = localStorage.getItem("refreshToken")
    const response = await api.post("/auth/refresh", { refreshToken })
    localStorage.setItem("accessToken", response.accessToken)
    return response
  },
}
