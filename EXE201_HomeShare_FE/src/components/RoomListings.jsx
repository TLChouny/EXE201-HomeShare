import { useState, useMemo } from "react"
import { MapPin, DollarSign, Users, Filter, Grid, List } from "lucide-react"

export default function RoomListings({ rooms, filters, onRoomSelect, onNavigate }) {
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)
  const [localFilters, setLocalFilters] = useState(filters)

  const filteredAndSortedRooms = useMemo(() => {
    const filtered = rooms.filter((room) => {
      if (localFilters.location && !room.location.toLowerCase().includes(localFilters.location.toLowerCase())) {
        return false
      }
      if (localFilters.maxPrice && room.price > Number.parseInt(localFilters.maxPrice)) {
        return false
      }
      if (localFilters.roomType && room.roomType !== localFilters.roomType) {
        return false
      }
      return true
    })

    // Sort rooms
    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price)
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price)
      case "newest":
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      default:
        return filtered
    }
  }, [rooms, localFilters, sortBy])

  const handleFilterChange = (field, value) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }))
  }

  const RoomCard = ({ room }) => (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
      onClick={() => onRoomSelect(room.id)}
    >
      <div className="relative">
        <img src={room.images[0] || "/placeholder.svg"} alt={room.title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
          Available
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{room.title}</h3>

        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{room.location}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-blue-600 font-bold">
            <DollarSign className="w-5 h-5" />
            <span className="text-xl">{room.price}</span>
            <span className="text-sm text-gray-500 ml-1">/month</span>
          </div>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{room.roomType}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              +{room.amenities.length - 3} more
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">{room.description}</p>
      </div>
    </div>
  )

  const RoomListItem = ({ room }) => (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-4 flex"
      onClick={() => onRoomSelect(room.id)}
    >
      <img
        src={room.images[0] || "/placeholder.svg"}
        alt={room.title}
        className="w-32 h-24 object-cover rounded-lg mr-4 flex-shrink-0"
      />

      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{room.title}</h3>
          <div className="flex items-center text-blue-600 font-bold">
            <DollarSign className="w-5 h-5" />
            <span className="text-xl">{room.price}</span>
            <span className="text-sm text-gray-500 ml-1">/month</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{room.location}</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm ml-4">{room.roomType}</span>
        </div>

        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{room.description}</p>

        <div className="flex flex-wrap gap-1">
          {room.amenities.slice(0, 4).map((amenity, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              {amenity}
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Rooms</h1>
          <p className="text-gray-600">{filteredAndSortedRooms.length} rooms found</p>
        </div>

        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow" : ""}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow" : ""}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Filter Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                value={localFilters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
              <input
                type="number"
                placeholder="Max price"
                value={localFilters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
              <select
                value={localFilters.roomType}
                onChange={(e) => handleFilterChange("roomType", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Single">Single Room</option>
                <option value="Shared">Shared Room</option>
                <option value="Studio">Studio</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setLocalFilters({ location: "", maxPrice: "", roomType: "", amenities: [] })}
                className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Room Listings */}
      {filteredAndSortedRooms.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Users className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No rooms found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search filters</p>
          <button
            onClick={() => onNavigate("home")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Search
          </button>
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredAndSortedRooms.map((room) =>
            viewMode === "grid" ? <RoomCard key={room.id} room={room} /> : <RoomListItem key={room.id} room={room} />,
          )}
        </div>
      )}
    </div>
  )
}
