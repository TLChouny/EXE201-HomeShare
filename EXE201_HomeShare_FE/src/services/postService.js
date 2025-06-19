import api from "./api"

export const postService = {
  // Lấy danh sách tin đăng
  getPosts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return await api.get(`/posts?${queryString}`)
  },

  // Lấy tin đăng theo loại (roommate/apartment)
  getPostsByType: async (type, params = {}) => {
    const queryString = new URLSearchParams({ ...params, type }).toString()
    return await api.get(`/posts?${queryString}`)
  },

  // Lấy chi tiết tin đăng
  getPostById: async (id) => {
    return await api.get(`/posts/${id}`)
  },

  // Tạo tin đăng mới
  createPost: async (postData) => {
    return await api.post("/posts", postData)
  },

  // Cập nhật tin đăng
  updatePost: async (id, postData) => {
    return await api.put(`/posts/${id}`, postData)
  },

  // Xóa tin đăng
  deletePost: async (id) => {
    return await api.delete(`/posts/${id}`)
  },

  // Upload hình ảnh
  uploadImages: async (files) => {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append("images", file)
    })
    return await api.post("/posts/upload-images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  // Tìm kiếm tin đăng
  searchPosts: async (searchParams) => {
    return await api.get("/posts/search", { params: searchParams })
  },
}
