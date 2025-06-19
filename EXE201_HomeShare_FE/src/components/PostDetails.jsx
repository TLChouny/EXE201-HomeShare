import { useState } from "react"
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Users,
  Building2,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  MessageCircle,
  Phone,
} from "lucide-react"
import { PostType } from "../types/index"

export default function PostDetails({ post, currentUser, onNavigate }) {
  /* ---------- State ---------- */
  const [imgIdx, setImgIdx] = useState(0)
  const formatPrice = (p) => new Intl.NumberFormat("vi-VN").format(p) + "đ"

  /* ---------- Guard ---------- */
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy tin đăng</h2>
        <button
          onClick={() => onNavigate("home")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Quay về trang chủ
        </button>
      </div>
    )
  }

  const next = () => setImgIdx((i) => (i + 1) % post.images.length)
  const prev = () => setImgIdx((i) => (i - 1 + post.images.length) % post.images.length)

  /* ---------- UI ---------- */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back */}
      <button
        onClick={() => onNavigate(post.type === PostType.ROOMMATE ? "roommate-feed" : "apartment-feed")}
        className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* -------- Main -------- */}
        <div className="lg:col-span-2">
          {/* Gallery */}
          <div className="relative mb-6">
            <div className="h-96 rounded-lg overflow-hidden relative">
              <img
                src={post.images[imgIdx] || "/placeholder.svg"}
                alt={`${post.title}-img-${imgIdx}`}
                className="w-full h-full object-cover"
              />

              {post.images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* thumbnails */}
            {post.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {post.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImgIdx(idx)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 ${
                      idx === imgIdx ? "border-blue-500" : "border-transparent"
                    }`}
                  >
                    <img src={img || "/placeholder.svg"} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-1" /> {post.location}
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center text-blue-600 text-3xl font-bold">
              <DollarSign className="w-6 h-6" />
              {formatPrice(post.price)}
              <span className="text-lg text-gray-500 ml-2">/tháng</span>
            </div>

            {/* Post type badge */}
            <div className="text-sm inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800">
              {post.type === PostType.ROOMMATE ? (
                <>
                  <Users className="w-4 h-4 mr-1" /> Tìm bạn ở ghép
                </>
              ) : (
                <>
                  <Building2 className="w-4 h-4 mr-1" /> Thuê căn hộ
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Mô tả</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.description}</p>
            </div>

            {/* Amenities */}
            {post.amenities?.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Tiện ích</h3>
                <div className="flex flex-wrap gap-2">
                  {post.amenities.map((a, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Posted date */}
            <p className="text-sm text-gray-500">Đăng ngày {new Date(post.createdAt).toLocaleDateString("vi-VN")}</p>
          </div>
        </div>

        {/* -------- Sidebar -------- */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Liên hệ</h3>

            {post.contact?.phone && (
              <a
                href={`tel:${post.contact.phone}`}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Phone className="w-5 h-5" /> <span>{post.contact.phone}</span>
              </a>
            )}

            {post.contact?.zalo && (
              <a
                href={`https://zalo.me/${post.contact.zalo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <MessageCircle className="w-5 h-5" /> <span>Zalo</span>
              </a>
            )}

            {post.contact?.email && (
              <a
                href={`mailto:${post.contact.email}`}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <MessageCircle className="w-5 h-5" /> <span>Email</span>
              </a>
            )}

            {/* If logged in, allow message in-app */}
            {currentUser && currentUser.id !== post.authorId && (
              <button
                disabled
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg opacity-80 cursor-not-allowed"
              >
                <MessageCircle className="w-5 h-5" /> Nhắn tin (đang phát triển)
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
