
import { useState } from "react"
import { Search, MapPin, DollarSign, Building2, Filter, Heart, MessageCircle, Phone } from "lucide-react"

export default function ApartmentFeed({ posts, onPostSelect, onNavigate, currentUser }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    location: "",
    maxPrice: "",
    minPrice: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  /* ---------- Helpers ---------- */
  const formatPrice = (price) => new Intl.NumberFormat("vi-VN").format(price) + "đ"

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLocation = !filters.location || post.location.toLowerCase().includes(filters.location.toLowerCase())

    const matchesMaxPrice = !filters.maxPrice || post.price <= Number.parseInt(filters.maxPrice)

    const matchesMinPrice = !filters.minPrice || post.price >= Number.parseInt(filters.minPrice)

    return matchesSearch && matchesLocation && matchesMaxPrice && matchesMinPrice
  })

  /* ---------- Card ---------- */
  const PostCard = ({ post }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative">
        <img src={post.images[0] || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
          Còn trống
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>

        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{post.location}</span>
        </div>

        <div className="flex items-center text-blue-600 font-bold mb-3">
          <DollarSign className="w-5 h-5" />
          <span className="text-xl">{formatPrice(post.price)}</span>
          <span className="text-sm text-gray-500 ml-1">/tháng</span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.description}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {post.amenities.slice(0, 3).map((amenity, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              {amenity}
            </span>
          ))}
          {post.amenities.length > 3 && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              +{post.amenities.length - 3} khác
            </span>
          )}
        </div>

        <div className="flex justify-between items-center pt-3 border-t">
          <button
            onClick={() => onPostSelect(post.id)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Xem chi tiết
          </button>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-4 h-4" />
            </button>
            {post.contact?.phone && (
              <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
                <Phone className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  /* ---------- Render ---------- */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cho thuê căn hộ dịch vụ</h1>
          <p className="text-gray-600">{filteredPosts.length} căn hộ</p>
        </div>

        {currentUser && (
          <button
            onClick={() => onNavigate("create-post")}
            className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Building2 className="w-5 h-5" />
            <span>Đăng tin cho thuê</span>
          </button>
        )}
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo tiêu đề hoặc mô tả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span>Bộ lọc</span>
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Khu vực"
              value={filters.location}
              onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Giá tối thiểu"
              value={filters.minPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Giá tối đa"
              value={filters.maxPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}
      </div>

      {/* Posts grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy căn hộ</h3>
          <p className="text-gray-600 mb-4">Thử điều chỉnh bộ lọc hoặc từ khoá tìm kiếm</p>
          {currentUser && (
            <button
              onClick={() => onNavigate("create-post")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Đăng tin đầu tiên
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
