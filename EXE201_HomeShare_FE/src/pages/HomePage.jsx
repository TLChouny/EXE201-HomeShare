import { useState } from "react"
import { Search, MapPin, DollarSign, Home, Users, Wifi, Car } from "lucide-react"

export default function HomePage({ onSearch, onNavigate }) {
  // Make onSearch optional
  const safeOnSearch =
    typeof onSearch === "function"
      ? onSearch
      : () => {
          /* no-op */
        }
  const [searchForm, setSearchForm] = useState({
    location: "",
    maxPrice: "",
    roomType: "",
  })

  const handleSearch = (e) => {
    e.preventDefault()

    // Call search handler if provided
    safeOnSearch(searchForm)

    // Always navigate to the roommate feed
    onNavigate("roommate-feed")
  }

  const handleInputChange = (field, value) => {
    setSearchForm((prev) => ({ ...prev, [field]: value }))
  }

  const features = [
    {
      icon: Search,
      title: "Easy Search",
      description: "Find the perfect room with our advanced search filters",
    },
    {
      icon: Users,
      title: "Connect with Students",
      description: "Meet like-minded students and potential roommates",
    },
    {
      icon: Home,
      title: "Verified Listings",
      description: "All listings are verified for your safety and peace of mind",
    },
  ]

  const popularAmenities = [
    { icon: Wifi, label: "WiFi" },
    { icon: Car, label: "Parking" },
    { icon: Home, label: "Furnished" },
    { icon: Users, label: "Common Area" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect
              <span className="block text-yellow-300">Student Room</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connect with students, discover amazing rooms, and make your university experience unforgettable
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={searchForm.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>

                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={searchForm.maxPrice}
                    onChange={(e) => handleInputChange("maxPrice", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>

                <select
                  value={searchForm.roomType}
                  onChange={(e) => handleInputChange("roomType", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="">Room Type</option>
                  <option value="Single">Single Room</option>
                  <option value="Shared">Shared Room</option>
                  <option value="Studio">Studio</option>
                </select>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose HomeShare?</h2>
            <p className="text-xl text-gray-600">We make finding student accommodation simple and secure</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular Amenities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Amenities</h2>
            <p className="text-xl text-gray-600">Find rooms with the amenities that matter to you</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {popularAmenities.map((amenity, index) => {
              const Icon = amenity.icon
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <span className="text-gray-900 font-medium">{amenity.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Room?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of students who have found their ideal accommodation through HomeShare
          </p>
          <div className="space-x-4">
            <button
              onClick={() => onNavigate("listings")}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Rooms
            </button>
            <button
              onClick={() => onNavigate("create-listing")}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              List Your Room
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
