import { useState } from "react"
import { ArrowLeft, Star, Send, MessageCircle, User } from "lucide-react"

/**
 * Simple feedback / testimonial page.
 * • Logged-in users can leave star-rated feedback.
 * • Everyone can read the list of submitted feedback.
 *
 * In production you would POST the feedback to
 *   POST /api/feedback
 * and GET the list from
 *   GET  /api/feedback
 */
export default function FeedbackPage({ currentUser, onNavigate }) {
  /* ---------- Local mock state ---------- */
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      name: "Minh Anh",
      rating: 5,
      message: "Ứng dụng rất tiện lợi, mình tìm được phòng chỉ sau 2 ngày!",
      date: "2024-05-12",
    },
    {
      id: 2,
      name: "Trọng Tín",
      rating: 4,
      message: "Giao diện dễ dùng, nhưng nên có thêm bộ lọc tiện ích.",
      date: "2024-05-25",
    },
  ])

  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)

  /* ---------- Helpers ---------- */
  const formatDate = (iso) => new Date(iso).toLocaleDateString("vi-VN")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!rating || !message.trim()) return
    setSending(true)

    // Simulate network request
    setTimeout(() => {
      setFeedbacks((prev) => [
        {
          id: prev.length + 1,
          name: currentUser?.name || "Ẩn danh",
          rating,
          message: message.trim(),
          date: new Date().toISOString(),
        },
        ...prev,
      ])
      setRating(0)
      setMessage("")
      setSending(false)
      alert("Cảm ơn bạn đã đóng góp ý kiến!")
    }, 800)
  }

  /* ---------- UI ---------- */
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center text-blue-600 hover:text-blue-700 mr-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Trang chủ
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Phản hồi người dùng</h1>
      </div>

      {/* Form (only for logged-in users) */}
      {currentUser ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-10">
          <h2 className="text-lg font-semibold mb-4">Gửi phản hồi của bạn</h2>

          {/* Rating */}
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                type="button"
                key={i}
                onClick={() => setRating(i)}
                className={`p-1 ${i <= rating ? "text-yellow-500" : "text-gray-300"}`}
              >
                <Star className="w-6 h-6" fill={i <= rating ? "currentColor" : "none"} />
              </button>
            ))}
          </div>

          {/* Message */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Chia sẻ trải nghiệm của bạn..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          />

          <button
            type="submit"
            disabled={sending || !rating || !message.trim()}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            Gửi phản hồi
          </button>
        </form>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-10 text-center">
          <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-gray-700">
            Vui lòng{" "}
            <button onClick={() => onNavigate("home")} className="text-blue-600 underline">
              đăng nhập
            </button>{" "}
            để gửi phản hồi của bạn.
          </p>
        </div>
      )}

      {/* Feedback list */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ý kiến người dùng</h2>

      {feedbacks.length === 0 ? (
        <p className="text-gray-600">Chưa có phản hồi nào.</p>
      ) : (
        <div className="space-y-6">
          {feedbacks.map((fb) => (
            <div key={fb.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{fb.name}</p>
                  <p className="text-xs text-gray-500">{formatDate(fb.date)}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i <= fb.rating ? "text-yellow-500" : "text-gray-300"}`}
                    fill={i <= fb.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>

              <p className="text-gray-700 whitespace-pre-line">{fb.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
