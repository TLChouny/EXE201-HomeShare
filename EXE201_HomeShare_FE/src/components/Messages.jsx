import { useState } from "react"
import { Send, User, ArrowLeft } from "lucide-react"

export default function Messages({ messages, currentUser, users, rooms, onSendMessage, onNavigate }) {
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState("")

  // Group messages by conversation
  const conversations = messages.reduce((acc, message) => {
    const otherUserId = message.senderId === currentUser.id ? message.receiverId : message.senderId
    const conversationId = `${Math.min(currentUser.id, otherUserId)}-${Math.max(currentUser.id, otherUserId)}-${message.roomId}`

    if (!acc[conversationId]) {
      acc[conversationId] = {
        id: conversationId,
        otherUserId,
        roomId: message.roomId,
        messages: [],
        lastMessage: null,
        unreadCount: 0,
      }
    }

    acc[conversationId].messages.push(message)
    acc[conversationId].lastMessage = message

    if (!message.read && message.receiverId === currentUser.id) {
      acc[conversationId].unreadCount++
    }

    return acc
  }, {})

  // Sort conversations by last message timestamp
  const sortedConversations = Object.values(conversations).sort(
    (a, b) => new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp),
  )

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim() && selectedConversation) {
      onSendMessage(selectedConversation.otherUserId, selectedConversation.roomId, newMessage)
      setNewMessage("")
    }
  }

  const getOtherUser = (userId) => {
    return users.find((user) => user.id === userId)
  }

  const getRoom = (roomId) => {
    return rooms.find((room) => room.id === roomId)
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: "600px" }}>
        <div className="flex h-full">
          {/* Conversations List */}
          <div
            className={`${selectedConversation ? "hidden md:block" : "block"} w-full md:w-1/3 border-r border-gray-200`}
          >
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
            </div>

            <div className="overflow-y-auto h-full">
              {sortedConversations.length === 0 ? (
                <div className="p-6 text-center">
                  <div className="text-gray-400 mb-4">
                    <User className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
                  <p className="text-gray-600 mb-4">Start a conversation by contacting a room owner</p>
                  <button
                    onClick={() => onNavigate("listings")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Browse Rooms
                  </button>
                </div>
              ) : (
                sortedConversations.map((conversation) => {
                  const otherUser = getOtherUser(conversation.otherUserId)
                  const room = getRoom(conversation.roomId)

                  return (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedConversation?.id === conversation.id ? "bg-blue-50 border-blue-200" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={otherUser?.avatar || "/placeholder.svg?height=40&width=40"}
                          alt={otherUser?.name || "User"}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-semibold text-gray-900 truncate">
                              {otherUser?.name || "Unknown User"}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {formatTime(conversation.lastMessage.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">Re: {room?.title || "Room listing"}</p>
                          <p className="text-sm text-gray-500 truncate">{conversation.lastMessage.message}</p>
                        </div>
                        {conversation.unreadCount > 0 && (
                          <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`${selectedConversation ? "block" : "hidden md:block"} flex-1 flex flex-col`}>
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center">
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="md:hidden mr-3 text-gray-600 hover:text-gray-800"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <img
                    src={
                      getOtherUser(selectedConversation.otherUserId)?.avatar || "/placeholder.svg?height=40&width=40"
                    }
                    alt="User"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {getOtherUser(selectedConversation.otherUserId)?.name || "Unknown User"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Re: {getRoom(selectedConversation.roomId)?.title || "Room listing"}
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages
                    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                    .map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === currentUser.id ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderId === currentUser.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.senderId === currentUser.id ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="hidden md:flex flex-1 items-center justify-center">
                <div className="text-center text-gray-500">
                  <User className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                  <p>Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
