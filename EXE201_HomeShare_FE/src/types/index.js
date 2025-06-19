// User Roles
export const UserRole = {
  GUEST: "guest",
  USER: "user",
  SALE: "sale",
  MANAGER: "manager",
}

// Post Types
export const PostType = {
  ROOMMATE: "roommate", // Tìm bạn cùng phòng
  APARTMENT: "apartment", // Cho thuê căn hộ dịch vụ
}

// Service Packages
export const ServicePackages = {
  USER: {
    DAILY: { id: "user_daily", name: "Gói ngày", price: 7000, ads: 1, duration: 1 },
    WEEKLY: { id: "user_weekly", name: "Gói tuần", price: 100000, ads: 7, duration: 7 },
    MONTHLY: { id: "user_monthly", name: "Gói tháng", price: 400000, ads: 30, duration: 30 },
  },
  SALE: {
    BASIC: { id: "sale_basic", name: "Gói cơ bản", price: 149000, ads: 10, duration: 30 },
    STANDARD: { id: "sale_standard", name: "Gói tiêu chuẩn", price: 299000, ads: 20, duration: 30 },
    PREMIUM: { id: "sale_premium", name: "Gói cao cấp", price: 499000, ads: 60, duration: 30 },
  },
}

// Sample Data
export const sampleUsers = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "an@student.edu.vn",
    role: UserRole.USER,
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Sinh viên IT tìm bạn cùng phòng",
    university: "Đại học Công nghệ",
    year: "Năm 3",
    remainingAds: 5,
    currentPackage: null,
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    email: "binh@realestate.com",
    role: UserRole.SALE,
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Chuyên viên bất động sản",
    company: "ABC Real Estate",
    remainingAds: 15,
    currentPackage: ServicePackages.SALE.STANDARD,
  },
  {
    id: 3,
    name: "Admin",
    email: "admin@homeshare.com",
    role: UserRole.MANAGER,
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export const samplePosts = [
  {
    id: 1,
    title: "Tìm bạn nữ ở ghép gần ĐH Bách Khoa",
    description: "Mình là sinh viên năm 2, tìm bạn nữ ở ghép. Phòng sạch sẽ, an ninh tốt.",
    type: PostType.ROOMMATE,
    price: 2500000,
    location: "Quận 1, TP.HCM",
    images: ["/placeholder.svg?height=300&width=400"],
    amenities: ["WiFi", "Máy lạnh", "Tủ lạnh"],
    authorId: 1,
    createdAt: "2024-01-20",
    isActive: true,
    contact: {
      phone: "0901234567",
      zalo: "0901234567",
    },
  },
  {
    id: 2,
    title: "Cho thuê căn hộ dịch vụ cao cấp",
    description: "Căn hộ 1PN đầy đủ nội thất, view đẹp, gần trung tâm.",
    type: PostType.APARTMENT,
    price: 8000000,
    location: "Quận 3, TP.HCM",
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    amenities: ["WiFi", "Gym", "Hồ bơi", "Bảo vệ 24/7"],
    authorId: 2,
    createdAt: "2024-01-18",
    isActive: true,
    contact: {
      phone: "0907654321",
      email: "contact@realestate.com",
    },
  },
]

export const sampleOrders = [
  {
    id: 1,
    userId: 1,
    packageId: "user_weekly",
    package: ServicePackages.USER.WEEKLY,
    status: "completed",
    paymentMethod: "momo",
    createdAt: "2024-01-15",
    completedAt: "2024-01-15",
  },
]
