import { useState } from "react"
import { Menu, X, Home, Users, Building, Plus, User, Package, ShoppingCart, Bell, LogOut, Settings } from "lucide-react"
import { UserRole } from "../types/index"

export default function Header({ currentUser, onNavigate, currentPage, onLogin, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const getNavItems = () => {
    const baseItems = [
      { id: "home", label: "Trang chủ", icon: Home },
      { id: "roommate-feed", label: "Tìm bạn cùng phòng", icon: Users },
      { id: "apartment-feed", label: "Thuê căn hộ", icon: Building },
    ]

    if (currentUser) {
      baseItems.push({ id: "create-post", label: "Đăng tin", icon: Plus })
    }

    baseItems.push({ id: "news", label: "Tin tức", icon: Bell }, { id: "feedback", label: "Phản hồi", icon: Settings })

    return baseItems
  }

  const navItems = getNavItems()

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate("home")}>
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
              <Home className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-gray-900">HomeShare</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <img
                    src={currentUser.avatar || "/placeholder.svg"}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden md:block text-sm font-medium">{currentUser.name}</span>
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {currentUser.remainingAds} tin
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={() => {
                        onNavigate("profile")
                        setShowUserMenu(false)
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Hồ sơ cá nhân
                    </button>
                    <button
                      onClick={() => {
                        onNavigate("packages")
                        setShowUserMenu(false)
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Gói dịch vụ
                    </button>
                    <button
                      onClick={() => {
                        onNavigate("orders")
                        setShowUserMenu(false)
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Lịch sử mua hàng
                    </button>
                    {currentUser.role === UserRole.MANAGER && (
                      <button
                        onClick={() => {
                          onNavigate("admin")
                          setShowUserMenu(false)
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Quản trị
                      </button>
                    )}
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        onLogout()
                        setShowUserMenu(false)
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Đăng nhập
              </button>
            )}

            {/* Mobile menu button */}
            <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {currentUser && (
              <div className="flex items-center space-x-3 px-4 py-2 mb-4 border-b">
                <img
                  src={currentUser.avatar || "/placeholder.svg"}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
                  <div className="text-xs text-blue-600">{currentUser.remainingAds} tin còn lại</div>
                </div>
              </div>
            )}

            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-2 text-left transition-colors ${
                    currentPage === item.id
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              )
            })}

            {!currentUser && (
              <button
                onClick={() => {
                  onLogin()
                  setIsMobileMenuOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Đăng nhập
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
