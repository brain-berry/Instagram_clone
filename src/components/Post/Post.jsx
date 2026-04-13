import { useState, memo } from 'react'
import {
  Box,
  Avatar,
  IconButton,
  Typography,
  TextField,
  Button,
  Menu,
  MenuItem
} from '@mui/material'
import {
  MoreHorizontal,
  Heart,
  MessageCircle,
  Send,
  Bookmark
} from 'lucide-react'

const Post = memo(({ post, onLike, onComment }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [comments, setComments] = useState(post.comments || [])
  const [newComment, setNewComment] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike()
  }

  const handleComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        user: 'henry_',
        text: newComment.trim(),
        timestamp: 'now'
      }
      setComments([...comments, comment])
      onComment(comment)
      setNewComment('')
    }
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid #333',
        borderRadius: 2,
        mb: 3,
        maxWidth: 614,
        mx: 'auto',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ width: 32, height: 32, mr: 2 }}>
            {post.avatar || post.user.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              {post.user}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {post.timestamp}
            </Typography>
          </Box>
        </Box>
        
        <IconButton onClick={handleMenuClick} size="small">
          <MoreHorizontal size={20} />
        </IconButton>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Report</MenuItem>
          <MenuItem onClick={handleMenuClose}>Unfollow</MenuItem>
          <MenuItem onClick={handleMenuClose}>Add to favorites</MenuItem>
          <MenuItem onClick={handleMenuClose}>Go to post</MenuItem>
          <MenuItem onClick={handleMenuClose}>Share to...</MenuItem>
          <MenuItem onClick={handleMenuClose}>Copy link</MenuItem>
          <MenuItem onClick={handleMenuClose}>Embed</MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            Cancel
          </MenuItem>
        </Menu>
      </Box>

      {/* Image */}
      <Box sx={{ width: '100%', maxHeight: 614, overflow: 'hidden' }}>
        <img
          src={post.postImage}
          alt={`${post.user}'s post`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Box>

      {/* Actions */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <IconButton onClick={handleLike} size="small">
            <Heart
              size={24}
              fill={isLiked ? '#ed4956' : 'none'}
              color={isLiked ? '#ed4956' : 'currentColor'}
            />
          </IconButton>
          <IconButton size="small">
            <MessageCircle size={24} />
          </IconButton>
          <IconButton size="small">
            <Send size={24} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton size="small">
            <Bookmark size={24} />
          </IconButton>
        </Box>

        {/* Likes */}
        <Typography variant="subtitle2" fontWeight={600} mb={1}>
          {isLiked ? post.likes + 1 : post.likes} likes
        </Typography>

        {/* Caption */}
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" component="span" fontWeight={600}>
            {post.user}
          </Typography>
          <Typography variant="body2" component="span" sx={{ ml: 1 }}>
            {post.caption}
          </Typography>
        </Box>

        {/* Comments */}
        {comments.length > 0 && (
          <Box sx={{ mb: 1 }}>
            {comments.map((comment) => (
              <Box key={comment.id} sx={{ mb: 1 }}>
                <Typography variant="body2" component="span" fontWeight={600}>
                  {comment.user}
                </Typography>
                <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                  {comment.text}
                </Typography>
                <Typography variant="caption" component="div" color="text.secondary">
                  {comment.timestamp}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Add Comment */}
        <Box sx={{ display: 'flex', alignItems: 'center', borderTop: '1px solid #333', pt: 2 }}>
          <TextField
            fullWidth
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleComment()}
            variant="standard"
            size="small"
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '14px',
              },
            }}
          />
          <Button
            onClick={handleComment}
            disabled={!newComment.trim()}
            sx={{
              color: '#0095f6',
              textTransform: 'none',
              minWidth: 'auto',
              px: 1,
              '&:disabled': {
                color: 'text.secondary',
              },
            }}
          >
            Post
          </Button>
        </Box>
      </Box>
    </Box>
  )
})

Post.displayName = 'Post'

export default Post
