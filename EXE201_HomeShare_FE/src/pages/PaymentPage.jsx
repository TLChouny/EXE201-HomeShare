import { useState, useEffect } from "react"
import { ArrowLeft, CreditCard, Smartphone, Building, Check } from "lucide-react"

export default function PaymentPage({ onPurchase, onNavigate }) {
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("momo")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const savedPackage = localStorage.getItem("selectedPackage")
    if (savedPackage) {
      setSelectedPackage(JSON.parse(savedPackage))
    }
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ"
  }

  const paymentMethods = [
    {
      id: "momo",
      name: "Ví MoMo",
      icon: <Smartphone className="w-6 h-6" />,
      description: "Thanh toán qua ví điện tử MoMo",
    },
    {
      id: "zalopay",
      name: "ZaloPay",
      icon: <Smartphone className="w-6 h-6" />,
      description: "Thanh toán qua ví điện tử ZaloPay",
    },
    {
      id: "banking",
      name: "Chuyển khoản ngân hàng",
      icon: <Building className="w-6 h-6" />,
      description: "Chuyển khoản qua ngân hàng",
    },
    {
      id: "card",
      name: "Thẻ tín dụng/ghi nợ",
      icon: <CreditCard className="w-6 h-6" />,
      description: "Thanh toán bằng thẻ Visa/Mastercard",
    },
  ]

  const handlePayment = async () => {
    if (!selectedPackage) return

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      onPurchase(selectedPackage, paymentMethod)
      setIsProcessing(false)
      localStorage.removeItem("selectedPackage")
    }, 2000)
  }

  if (!selectedPackage) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy gói dịch vụ</h2>
        <p className="text-gray-600 mb-4">Vui lòng chọn gói dịch vụ trước khi thanh toán</p>
        <button
          onClick={() => onNavigate("packages")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Chọn gói dịch vụ
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => onNavigate("packages")}
          className="flex items-center text-blue-600 hover:text-blue-700 mr-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Quay lại
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Thanh toán</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Chọn phương thức thanh toán</h2>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === method.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-lg mr-4 ${
                      paymentMethod === method.id ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                  {paymentMethod === method.id && <Check className="w-5 h-5 text-blue-600" />}
                </label>
              ))}
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full mt-8 bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Đang xử lý..." : `Thanh toán ${formatPrice(selectedPackage.price)}`}
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin đơn hàng</h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Gói dịch vụ:</span>
                <span className="font-medium">{selectedPackage.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Số tin đăng:</span>
                <span className="font-medium">{selectedPackage.ads} tin</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Thời hạn:</span>
                <span className="font-medium">{selectedPackage.duration} ngày</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Giá mỗi tin:</span>
                <span className="font-medium">
                  {formatPrice(Math.round(selectedPackage.price / selectedPackage.ads))}
                </span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-lg font-semibold">
                <span>Tổng cộng:</span>
                <span className="text-blue-600">{formatPrice(selectedPackage.price)}</span>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold text-gray-900 mb-3">Quyền lợi của bạn:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Đăng {selectedPackage.ads} tin trong {selectedPackage.duration} ngày
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Hỗ trợ khách hàng 24/7
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Quản lý tin đăng dễ dàng
                </li>
                {(selectedPackage.id.includes("premium") || selectedPackage.id.includes("monthly")) && (
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Ưu tiên hiển thị
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-2">Bảo mật thanh toán</h4>
        <p className="text-sm text-gray-600">
          Thông tin thanh toán của bạn được mã hóa và bảo mật tuyệt đối. Chúng tôi không lưu trữ thông tin thẻ tín dụng
          hay tài khoản ngân hàng của bạn.
        </p>
      </div>
    </div>
  )
}
