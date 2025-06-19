import { useState } from "react"
import { ArrowLeft, Plus, Upload, X, MapPin, DollarSign, Users, Building2 } from "lucide-react"
import { PostType } from "../types/index"

export default function CreatePost({ onCreatePost, onNavigate, currentUser }) {
  const [step, setStep] = useState(1) // simple 2-step wizard: 1=basic, 2=images
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    type: PostType.ROOMMATE,
    title: "",
    description: "",
    price: "",
    location: "",
    amenities: [],
    images: [],
  })

  /* ---------- Helpers ---------- */
  const availableAmenities = [
    "WiFi",
    "Máy lạnh",
    "Tủ lạnh",
    "Giường",
    "Tủ quần áo",
    "Máy giặt",
    "Bàn học",
    "Bãi gửi xe",
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const toggleAmenity = (amen) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amen) ? prev.amenities.filter((a) => a !== amen) : [...prev.amenities, amen],
    }))
  }

  const uploadImages = (e) => {
    const files = Array.from(e.target.files)
    const newUrls = files.map(
      (_, i) => `/placeholder.svg?height=300&width=400&text=Hinh+${formData.images.length + i + 1}`,
    )
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newUrls].slice(0, 8),
    }))
  }

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  /* ---------- Validation ---------- */
  const validate = () => {
    const e = {}
    if (!formData.title.trim()) e.title = "Nhập tiêu đề"
    if (!formData.description.trim()) e.description = "Nhập mô tả"
    if (!formData.price) e.price = "Nhập giá"
    if (!formData.location.trim()) e.location = "Nhập khu vực"
    if (formData.images.length === 0) e.images = "Thêm ít nhất 1 hình"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    onCreatePost(formData)
  }

  /* ---------- UI ---------- */
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center text-blue-600 hover:text-blue-700 mr-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Quay lại
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Đăng tin mới</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* -------- Step 1: Thông tin cơ bản -------- */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            {/* Post type */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Loại tin *</h2>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer ${
                    formData.type === PostType.ROOMMATE
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="postType"
                    className="sr-only"
                    value={PostType.ROOMMATE}
                    checked={formData.type === PostType.ROOMMATE}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                  />
                  <Users className="w-6 h-6 mr-2" />
                  Tìm bạn ở ghép
                </label>

                <label
                  className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer ${
                    formData.type === PostType.APARTMENT
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="postType"
                    className="sr-only"
                    value={PostType.APARTMENT}
                    checked={formData.type === PostType.APARTMENT}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                  />
                  <Building2 className="w-6 h-6 mr-2" />
                  Thuê căn hộ
                </label>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
            </div>

            {/* Price & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Giá (đ/tháng) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className={`w-full pl-10 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Khu vực *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className={`w-full pl-10 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 ${
                      errors.location ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.location && <p className="text-sm text-red-600 mt-1">{errors.location}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả chi tiết *</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Tiện ích</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableAmenities.map((amen) => (
                  <label key={amen} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amen)}
                      onChange={() => toggleAmenity(amen)}
                      className="text-blue-600 rounded"
                    />
                    <span className="text-sm">{amen}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Next step */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {/* -------- Step 2: Ảnh -------- */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <h2 className="text-lg font-semibold mb-3">Hình ảnh *</h2>

            {/* Upload box */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                errors.images ? "border-red-500" : "border-gray-300"
              }`}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Kéo & thả hoặc nhấp để tải lên (tối đa 8 ảnh)</p>
              <input type="file" multiple accept="image/*" id="img-upload" className="hidden" onChange={uploadImages} />
              <label
                htmlFor="img-upload"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
              >
                Chọn ảnh
              </label>
              {errors.images && <p className="text-sm text-red-600 mt-2">{errors.images}</p>}
            </div>

            {/* Preview grid */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`img-${idx}`}
                      className="w-full h-28 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Back / Submit */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="inline w-4 h-4 mr-2" />
                Quay lại
              </button>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Đăng tin</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
