import { useState } from "react"
import { ArrowLeft, Newspaper, Search } from "lucide-react"

/**
 * Simple news / blog listing.
 * In a real project you would fetch articles from an API
 * (e.g. GET /api/news).  For now we use static sample data.
 */
export default function NewsPage({ onNavigate }) {
  const [search, setSearch] = useState("")

  const sampleNews = [
    {
      id: 1,
      title: "5 mẹo tiết kiệm chi phí khi thuê trọ sinh viên",
      summary:
        "Thuê trọ không nhất thiết phải đắt đỏ. Dưới đây là 5 bí kíp giúp sinh viên tối ưu chi tiêu mà vẫn tìm được chỗ ở ưng ý.",
      cover: "/placeholder.svg?height=200&width=400&text=News+1",
      publishedAt: "2024-06-01",
    },
    {
      id: 2,
      title: "Xu hướng căn hộ dịch vụ 2025: Không gian sống thông minh",
      summary:
        "Căn hộ dịch vụ đang chuyển mình mạnh mẽ với công nghệ nhà thông minh, đáp ứng nhu cầu của thế hệ Gen Z.",
      cover: "/placeholder.svg?height=200&width=400&text=News+2",
      publishedAt: "2024-05-20",
    },
    {
      id: 3,
      title: "Cách kiểm tra pháp lý khi thuê căn hộ dài hạn",
      summary:
        "Hợp đồng, giấy tờ và những mục cần lưu ý để tránh rủi ro khi ký thuê căn hộ cho gia đình hoặc nhóm bạn.",
      cover: "/placeholder.svg?height=200&width=400&text=News+3",
      publishedAt: "2024-04-15",
    },
  ]

  const filteredNews = sampleNews.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) || n.summary.toLowerCase().includes(search.toLowerCase()),
  )

  /* ---------- Helpers ---------- */
  const formatDate = (iso) => new Date(iso).toLocaleDateString("vi-VN")

  /* ---------- UI ---------- */
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center text-blue-600 hover:text-blue-700 mr-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Trang chủ
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          Tin tức &nbsp; <Newspaper className="inline w-7 h-7" />
        </h1>
      </div>

      {/* Search bar */}
      <div className="relative mb-10 max-w-md">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm bài viết..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Cards */}
      {filteredNews.length === 0 ? (
        <p className="text-gray-600">Không tìm thấy bài viết phù hợp.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredNews.map((news) => (
            <article
              key={news.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <img src={news.cover || "/placeholder.svg"} alt={news.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{news.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{news.summary}</p>
                <div className="text-xs text-gray-500">{formatDate(news.publishedAt)}</div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
