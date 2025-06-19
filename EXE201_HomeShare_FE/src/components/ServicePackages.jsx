import { useState } from "react"
import { Check, Star, Zap, Crown } from "lucide-react"
import { ServicePackages as Packages, UserRole } from "../types/index"

export default function ServicePackages({ currentUser, onNavigate }) {
  const [selectedPackage, setSelectedPackage] = useState(null)

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Vui lòng đăng nhập</h2>
        <p className="text-gray-600">Bạn cần đăng nhập để xem các gói dịch vụ</p>
      </div>
    )
  }

  const packages = currentUser.role === UserRole.SALE ? Packages.SALE : Packages.USER
  const packageArray = Object.values(packages)

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ"
  }

  const getPackageIcon = (packageId) => {
    if (packageId.includes("basic") || packageId.includes("daily")) return <Zap className="w-8 h-8" />
    if (packageId.includes("standard") || packageId.includes("weekly")) return <Star className="w-8 h-8" />
    return <Crown className="w-8 h-8" />
  }

  const getPackageColor = (packageId) => {
    if (packageId.includes("basic") || packageId.includes("daily")) return "blue"
    if (packageId.includes("standard") || packageId.includes("weekly")) return "purple"
    return "yellow"
  }

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg)
    // Navigate to payment with selected package
    localStorage.setItem("selectedPackage", JSON.stringify(pkg))
    onNavigate("payment")
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Gói dịch vụ</h1>
        <p className="text-xl text-gray-600 mb-2">
          Chọn gói phù hợp để đăng tin {currentUser.role === UserRole.SALE ? "cho thuê căn hộ" : "tìm bạn cùng phòng"}
        </p>
        <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg inline-block">
          Bạn còn <strong>{currentUser.remainingAds}</strong> lượt đăng tin
        </div>
      </div>

      {/* Current Package */}
      {currentUser.currentPackage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Gói hiện tại</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-800">{currentUser.currentPackage.name}</p>
              <p className="text-sm text-green-600">
                {currentUser.currentPackage.ads} tin đăng - {formatPrice(currentUser.currentPackage.price)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-600">Còn lại</p>
              <p className="text-2xl font-bold text-green-800">{currentUser.remainingAds} tin</p>
            </div>
          </div>
        </div>
      )}

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packageArray.map((pkg) => {
          const color = getPackageColor(pkg.id)
          const isPopular = pkg.id.includes("standard") || pkg.id.includes("weekly")

          return (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                isPopular ? "border-purple-500 transform scale-105" : "border-gray-200 hover:border-blue-300"
              }`}
            >
              {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Phổ biến nhất
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Package Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                    color === "blue"
                      ? "bg-blue-100 text-blue-600"
                      : color === "purple"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {getPackageIcon(pkg.id)}
                </div>

                {/* Package Info */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{formatPrice(pkg.price)}</span>
                  <span className="text-gray-600 ml-2">/{pkg.duration} ngày</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{pkg.ads} tin đăng</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Hiệu lực {pkg.duration} ngày</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Hỗ trợ 24/7</span>
                  </li>
                  {(pkg.id.includes("premium") || pkg.id.includes("monthly")) && (
                    <>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">Ưu tiên hiển thị</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">Thống kê chi tiết</span>
                      </li>
                    </>
                  )}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleSelectPackage(pkg)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    isPopular
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Chọn gói này
                </button>

                {/* Price per ad */}
                <p className="text-center text-sm text-gray-500 mt-3">
                  {formatPrice(Math.round(pkg.price / pkg.ads))}/tin
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* FAQ Section */}
      <div className="mt-16 bg-gray-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Câu hỏi thường gặp</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Gói dịch vụ có thời hạn không?</h4>
            <p className="text-gray-600 text-sm">
              Có, mỗi gói có thời hạn sử dụng. Sau khi hết hạn, bạn cần mua gói mới để ti��p tục đăng tin.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Có thể hoàn tiền không?</h4>
            <p className="text-gray-600 text-sm">
              Chúng tôi hỗ trợ hoàn tiền trong vòng 7 ngày nếu bạn chưa sử dụng gói dịch vụ.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Tin đăng có được ưu tiên hiển thị?</h4>
            <p className="text-gray-600 text-sm">
              Gói cao cấp sẽ được ưu tiên hiển thị ở vị trí đầu trong danh sách tìm kiếm.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Có hỗ trợ thanh toán trả góp?</h4>
            <p className="text-gray-600 text-sm">
              Hiện tại chúng tôi chỉ hỗ trợ thanh toán một lần qua các ví điện tử và ngân hàng.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
