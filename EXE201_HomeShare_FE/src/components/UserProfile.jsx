import { useState } from "react"
import { User, MapPin, Calendar, Edit, Mail, GraduationCap } from "lucide-react"

export default function UserProfile({ user, userRooms, onNavigate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  const handleSave = () => {
    // In a real app, you would save to backend
    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  const handleInputChange = (field, value) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                )}
              </div>

              {isEditing ? (
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="text-xl font-bold text-center border-b-2 border-blue-500 bg-transparent focus:outline-none"
                />
              ) : (
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              )}

              <p className="text-gray-600 capitalize">{user.role}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-3" />
                {isEditing ? (
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="flex-1 border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <span>{user.email}</span>
                )}
              </div>

              {user.university && (
                <div className="flex items-center text-gray-600">
                  <GraduationCap className="w-5 h-5 mr-3" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.university}
                      onChange={(e) => handleInputChange("university", e.target.value)}
                      className="flex-1 border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <span>{user.university}</span>
                  )}
                </div>
              )}

              {user.year && (
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3" />
                  {isEditing ? (
                    <select
                      value={editedUser.year}
                      onChange={(e) => handleInputChange("year", e.target.value)}
                      className="flex-1 border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
                    >
                      <option value="Freshman">Freshman</option>
                      <option value="Sophomore">Sophomore</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                  ) : (
                    <span>{user.year}</span>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Bio</h3>
              {isEditing ? (
                <textarea
                  value={editedUser.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              ) : (
                <p className="text-gray-600">{user.bio}</p>
              )}
            </div>

            <div className="mt-6 pt-6 border-t">
              {isEditing ? (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* User's Listings */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">My Listings</h3>
              <button
                onClick={() => onNavigate("create-listing")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add New Listing
              </button>
            </div>

            {userRooms.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <User className="w-16 h-16 mx-auto" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">No listings yet</h4>
                <p className="text-gray-600 mb-4">Start by creating your first room listing</p>
                <button
                  onClick={() => onNavigate("create-listing")}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Listing
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userRooms.map((room) => (
                  <div key={room.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <img
                      src={room.images[0] || "/placeholder.svg"}
                      alt={room.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{room.title}</h4>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{room.location}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-600 font-bold">${room.price}/month</span>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            room.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {room.available ? "Available" : "Rented"}
                        </span>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <button
                          onClick={() => onNavigate("room-details", room.id)}
                          className="flex-1 bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          View
                        </button>
                        <button className="flex-1 border border-gray-300 text-gray-700 py-1 px-3 rounded text-sm hover:bg-gray-50 transition-colors">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
