import { useState, useEffect } from "react"
import Header from "./components/Header"
import LoginModal from "./components/LoginModal"
import HomePage from "./pages/HomePage"
import RoommateFeed from "./components/RoommateFeed"
import ApartmentFeed from "./components/ApartmentFeed"
import CreatePost from "./components/CreatePost"
import PostDetails from "./components/PostDetails"
import UserProfile from "./components/UserProfile"
import ServicePackages from "./components/ServicePackages"
import OrderHistory from "./components/OrderHistory"
import PaymentPage from "./pages/PaymentPage"
import NewsPage from "./pages/NewsPage"
import FeedbackPage from "./pages/FeedbackPage"
import AdminDashboard from "./pages/AdminDashboard"
import { UserRole, sampleUsers, samplePosts, sampleOrders } from "./types/index"

export default function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [currentUser, setCurrentUser] = useState(null) // null = guest
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [posts, setPosts] = useState(samplePosts)
  const [orders, setOrders] = useState(sampleOrders)
  const [users, setUsers] = useState(sampleUsers)

  // Check authentication on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (email, password) => {
    // Simulate login - in real app, call API
    const user = sampleUsers.find((u) => u.email === email)
    if (user) {
      setCurrentUser(user)
      localStorage.setItem("currentUser", JSON.stringify(user))
      setShowLoginModal(false)
      return { success: true }
    }
    return { success: false, message: "Email hoặc mật khẩu không đúng" }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
    setCurrentPage("home")
  }

  const handleNavigation = (page, postId = null) => {
    // Check authentication for protected pages
    const protectedPages = ["create-post", "profile", "packages", "orders"]
    if (protectedPages.includes(page) && !currentUser) {
      setShowLoginModal(true)
      return
    }

    setCurrentPage(page)
    if (postId) setSelectedPostId(postId)
  }

  const handleCreatePost = (newPost) => {
    // Check if user has remaining ads
    if (currentUser.remainingAds <= 0) {
      alert("Bạn đã hết lượt đăng tin. Vui lòng mua gói dịch vụ!")
      setCurrentPage("packages")
      return
    }

    const post = {
      ...newPost,
      id: posts.length + 1,
      authorId: currentUser.id,
      createdAt: new Date().toISOString().split("T")[0],
      isActive: true,
    }

    setPosts([post, ...posts])

    // Decrease remaining ads
    const updatedUser = { ...currentUser, remainingAds: currentUser.remainingAds - 1 }
    setCurrentUser(updatedUser)
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))

    setCurrentPage(newPost.type === "roommate" ? "roommate-feed" : "apartment-feed")
  }

  const handlePurchasePackage = (packageData, paymentMethod) => {
    const order = {
      id: orders.length + 1,
      userId: currentUser.id,
      packageId: packageData.id,
      package: packageData,
      status: "completed", // Simulate successful payment
      paymentMethod,
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    }

    setOrders([order, ...orders])

    // Update user's remaining ads
    const updatedUser = {
      ...currentUser,
      remainingAds: currentUser.remainingAds + packageData.ads,
      currentPackage: packageData,
    }
    setCurrentUser(updatedUser)
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))

    alert("Thanh toán thành công! Bạn đã được cộng thêm lượt đăng tin.")
    setCurrentPage("profile")
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigation} currentUser={currentUser} />
      case "roommate-feed":
        return (
          <RoommateFeed
            posts={posts.filter((p) => p.type === "roommate")}
            onPostSelect={(postId) => handleNavigation("post-details", postId)}
            onNavigate={handleNavigation}
            currentUser={currentUser}
          />
        )
      case "apartment-feed":
        return (
          <ApartmentFeed
            posts={posts.filter((p) => p.type === "apartment")}
            onPostSelect={(postId) => handleNavigation("post-details", postId)}
            onNavigate={handleNavigation}
            currentUser={currentUser}
          />
        )
      case "post-details":
        return (
          <PostDetails
            post={posts.find((p) => p.id === selectedPostId)}
            currentUser={currentUser}
            onNavigate={handleNavigation}
          />
        )
      case "create-post":
        return <CreatePost onCreatePost={handleCreatePost} onNavigate={handleNavigation} currentUser={currentUser} />
      case "profile":
        return (
          <UserProfile
            user={currentUser}
            userPosts={posts.filter((p) => p.authorId === currentUser?.id)}
            onNavigate={handleNavigation}
          />
        )
      case "packages":
        return <ServicePackages currentUser={currentUser} onNavigate={handleNavigation} />
      case "payment":
        return <PaymentPage onPurchase={handlePurchasePackage} onNavigate={handleNavigation} />
      case "orders":
        return (
          <OrderHistory orders={orders.filter((o) => o.userId === currentUser?.id)} onNavigate={handleNavigation} />
        )
      case "news":
        return <NewsPage onNavigate={handleNavigation} />
      case "feedback":
        return <FeedbackPage currentUser={currentUser} onNavigate={handleNavigation} />
      case "admin":
        return currentUser?.role === UserRole.MANAGER ? (
          <AdminDashboard users={users} posts={posts} orders={orders} onNavigate={handleNavigation} />
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-red-600">Không có quyền truy cập</h2>
          </div>
        )
      default:
        return <HomePage onNavigate={handleNavigation} currentUser={currentUser} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentUser={currentUser}
        onNavigate={handleNavigation}
        currentPage={currentPage}
        onLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />
      <main className="pt-16">{renderCurrentPage()}</main>

      {showLoginModal && <LoginModal onLogin={handleLogin} onClose={() => setShowLoginModal(false)} />}
    </div>
  )
}
