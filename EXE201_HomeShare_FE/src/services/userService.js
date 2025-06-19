import api from "./api"

export const userService = {
  // Cập nhật thông tin cá nhân
  updateProfile: async (userData) => {
    return await api.put("/users/profile", userData)
  },

  // Upload avatar
  uploadAvatar: async (file) => {
    const formData = new FormData()
    formData.append("avatar", file)
    return await api.post("/users/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  // Lấy tin đăng của user
  getUserPosts: async () => {
    return await api.get("/users/posts")
  },

  // Lấy thống kê user
  getUserStats: async () => {
    return await api.get("/users/stats")
  },
}
