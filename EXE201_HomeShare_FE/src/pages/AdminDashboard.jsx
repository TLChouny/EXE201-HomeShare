import { useState } from "react"
import { Users, FileText, Receipt, BarChart2, Search, CheckCircle2, XCircle, ArrowLeft } from "lucide-react"

export default function AdminDashboard({ users = [], posts = [], orders = [], onNavigate }) {
  /* ---------- Local state ---------- */
  const [tab, setTab] = useState("overview")
  const [search, setSearch] = useState("")

  /* ---------- Helpers ---------- */
  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()),
  )

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()),
  )

  const filteredOrders = orders.filter((o) => String(o.id).includes(search))

  const formatPrice = (p) => new Intl.NumberFormat("vi-VN").format(p) + "đ"
  const formatDate = (iso) => new Date(iso).toLocaleDateString("vi-VN")

  /* ---------- Stats ---------- */
  const totalRevenue = orders.reduce((sum, o) => sum + (o.package?.price || 0), 0)

  /* ---------- UI ---------- */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center text-blue-600 hover:text-blue-700 mr-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Trang chủ
        </button>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <BarChart2 className="w-8 h-8" /> Bảng điều khiển Admin
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {[
          { id: "overview", label: "Tổng quan", icon: BarChart2 },
          { id: "users", label: "Người dùng", icon: Users },
          { id: "posts", label: "Tin đăng", icon: FileText },
          { id: "orders", label: "Đơn hàng", icon: Receipt },
        ].map((t) => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => {
                setSearch("")
                setTab(t.id)
              }}
              className={`flex items-center gap-1 px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                tab === t.id ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Search */}
      {tab !== "overview" && (
        <div className="relative mb-6 max-w-sm">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Content */}
      {tab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={Users} label="Tổng người dùng" value={users.length} color="blue" />
          <StatCard icon={FileText} label="Tổng tin đăng" value={posts.length} color="purple" />
          <StatCard icon={Receipt} label="Doanh thu" value={formatPrice(totalRevenue)} color="green" />
        </div>
      )}

      {tab === "users" && (
        <Table
          headers={["ID", "Tên", "Email", "Vai trò", "Lượt đăng còn lại"]}
          rows={filteredUsers.map((u) => [u.id, u.name, u.email, u.role, u.remainingAds ?? 0])}
        />
      )}

      {tab === "posts" && (
        <Table
          headers={["ID", "Tiêu đề", "Khu vực", "Giá", "Loại", "Ngày đăng"]}
          rows={filteredPosts.map((p) => [
            p.id,
            p.title,
            p.location,
            formatPrice(p.price),
            p.type,
            formatDate(p.createdAt),
          ])}
        />
      )}

      {tab === "orders" && (
        <Table
          headers={["Mã đơn", "Gói", "Giá", "Số tin", "Trạng thái", "Ngày"]}
          rows={filteredOrders.map((o) => [
            o.id,
            o.package?.name,
            formatPrice(o.package?.price || 0),
            o.package?.ads,
            o.status === "completed" ? (
              <span key="completed" className="inline-flex items-center text-green-600">
                <CheckCircle2 className="w-4 h-4 mr-1" /> Hoàn tất
              </span>
            ) : (
              <span key="failed" className="inline-flex items-center text-red-600">
                <XCircle className="w-4 h-4 mr-1" /> Thất bại
              </span>
            ),
            formatDate(o.createdAt),
          ])}
        />
      )}
    </div>
  )
}

/* ---------- Helper Components ---------- */
function StatCard({ icon: Icon, label, value, color = "blue" }) {
  const bg = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
  }[color]

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bg}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  )
}

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full text-sm divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-6 py-3 text-left font-semibold text-gray-700">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="px-6 py-4 whitespace-nowrap">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
