import { Box, Container, Grid } from '@mui/material'
import { useState, useEffect, useMemo } from 'react'
import Post from '../components/Post/Post'
import Suggestions from '../components/Suggestions/Suggestions'
import CreatePost from '../components/CreatePost/CreatePost'

const HomePage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock data - in real app, this would come from an API
  const mockPosts = useMemo(() => [
    {
      id: 1,
      user: 'henry_',
      avatar: 'H',
      postImage: 'https://picsum.photos/seed/post1/600/600.jpg',
      likes: 12,
      timestamp: '2d',
      caption: 'Beautiful sunset! 🌅',
      comments: []
    },
    {
      id: 2,
      user: 'whitney_',
      avatar: 'W',
      postImage: 'https://picsum.photos/seed/post2/600/600.jpg',
      likes: 120,
      timestamp: '3hr',
      caption: 'Coffee and coding ☕💻',
      comments: []
    },
    {
      id: 3,
      user: 'vida_',
      avatar: 'V',
      postImage: 'https://picsum.photos/seed/post3/600/600.jpg',
      likes: 52,
      timestamp: '4mins',
      caption: 'Morning vibes ✨',
      comments: []
    },
    {
      id: 4,
      user: 'queenster_',
      avatar: 'Q',
      postImage: 'https://picsum.photos/seed/post4/600/600.jpg',
      likes: 1258,
      timestamp: '2d',
      caption: 'Weekend adventures 🏔️',
      comments: []
    },
    {
      id: 5,
      user: 'gladys_',
      avatar: 'G',
      postImage: 'https://picsum.photos/seed/post5/600/600.jpg',
      likes: 1122,
      timestamp: '2d',
      caption: 'Art and creativity 🎨',
      comments: []
    }
  ], [])

  useEffect(() => {
    // Simulate API call
    const fetchPosts = async () => {
      try {
        setLoading(true)
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setPosts(mockPosts)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [mockPosts])

  const handleLike = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    )
  }

  const handleComment = (postId, comment) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    )
  }

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>Loading...</Box>
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <CreatePost />
          <Box sx={{ mt: 3 }}>
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onLike={() => handleLike(post.id)}
                onComment={(comment) => handleComment(post.id, comment)}
              />
            ))}
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Suggestions />
        </Grid>
      </Grid>
    </Container>
  )
}

export default HomePage
