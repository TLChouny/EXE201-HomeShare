import api from "./api"

export const packageService = {
  // Lấy danh sách gói dịch vụ
  getPackages: async (userRole) => {
    return await api.get(`/packages?role=${userRole}`)
  },

  // Lấy thông tin gói hiện tại của user
  getCurrentPackage: async () => {
    return await api.get("/packages/current")
  },

  // Tạo đơn hàng
  createOrder: async (packageId, paymentMethod) => {
    return await api.post("/orders", {
      packageId,
      paymentMethod,
    })
  },

  // Lấy lịch sử đơn hàng
  getOrderHistory: async () => {
    return await api.get("/orders/history")
  },

  // Xử lý thanh toán
  processPayment: async (orderId, paymentData) => {
    return await api.post(`/orders/${orderId}/payment`, paymentData)
  },

  // Kiểm tra trạng thái thanh toán
  checkPaymentStatus: async (orderId) => {
    return await api.get(`/orders/${orderId}/payment-status`)
  },
}
