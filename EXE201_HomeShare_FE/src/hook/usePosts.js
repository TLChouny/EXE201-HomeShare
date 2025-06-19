import { useState, useEffect } from "react"
import { postService } from "../services/postService"

export const usePosts = (type = null, filters = {}) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPosts()
  }, [type, filters])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const data = type ? await postService.getPostsByType(type, filters) : await postService.getPosts(filters)
      setPosts(data.posts || data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createPost = async (postData) => {
    try {
      const newPost = await postService.createPost(postData)
      setPosts((prev) => [newPost, ...prev])
      return { success: true, post: newPost }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  const updatePost = async (id, postData) => {
    try {
      const updatedPost = await postService.updatePost(id, postData)
      setPosts((prev) => prev.map((post) => (post.id === id ? updatedPost : post)))
      return { success: true, post: updatedPost }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  const deletePost = async (id) => {
    try {
      await postService.deletePost(id)
      setPosts((prev) => prev.filter((post) => post.id !== id))
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts,
  }
}
