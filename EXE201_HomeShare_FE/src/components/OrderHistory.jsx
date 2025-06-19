import { ArrowLeft, Package, CheckCircle2, Clock, XCircle } from "lucide-react"

export default function OrderHistory({ orders = [], onNavigate }) {
  const formatPrice = (price) => new Intl.NumberFormat("vi-VN").format(price) + "đ"
  const formatDate = (iso) => new Date(iso).toLocaleDateString("vi-VN")

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 mr-1" /> Hoàn tất
          </span>
        )
      case "pending":
        return (
          <span className="inline-flex items-center text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs font-medium">
            <Clock className="w-4 h-4 mr-1" /> Đang xử lý
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-medium">
            <XCircle className="w-4 h-4 mr-1" /> Thất bại
          </span>
        )
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => onNavigate("profile")}
          className="flex items-center text-blue-600 hover:text-blue-700 mr-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Trở về hồ sơ
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Lịch sử giao dịch</h1>
      </div>

      {/* Orders table */}
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Chưa có giao dịch nào</h3>
          <p className="text-gray-600 mb-4">Hãy mua gói dịch vụ để bắt đầu đăng tin.</p>
          <button
            onClick={() => onNavigate("packages")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Mua gói dịch vụ
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Mã đơn</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Gói dịch vụ</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Số tin</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Giá</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Phương thức</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Ngày</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">#{o.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{o.package.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{o.package.ads}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">{formatPrice(o.package.price)}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{o.paymentMethod}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(o.createdAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(o.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
