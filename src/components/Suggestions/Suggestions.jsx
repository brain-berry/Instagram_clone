import { useState, useEffect, useMemo } from 'react'
import {
  Box,
  Typography,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton
} from '@mui/material'

const mockUsers = [
  { id: 1, username: 'john_doe', avatar: 'J', relation: 'Followed by mike_smith' },
  { id: 2, username: 'sarah_wilson', avatar: 'S', relation: 'New to Instagram' },
  { id: 3, username: 'alex_johnson', avatar: 'A', relation: 'Followed by 5 people you follow' },
  { id: 4, username: 'emma_brown', avatar: 'E', relation: 'Suggested for you' },
  { id: 5, username: 'chris_davis', avatar: 'C', relation: 'Followed by jane_doe' },
]

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([])
  const [followedUsers, setFollowedUsers] = useState(new Set())

  useEffect(() => {
    // Simulate API call
    const fetchSuggestions = async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      setSuggestions(mockUsers)
    }
    
    fetchSuggestions()
  }, [])

  const handleFollow = (userId) => {
    setFollowedUsers(prev => new Set([...prev, userId]))
    
    // Remove from suggestions after following
    setSuggestions(prev => prev.filter(user => user.id !== userId))
  }

  const handleViewAll = () => {
    console.log('View all suggestions')
  }

  const currentUser = {
    username: 'henry_',
    avatar: 'H',
    fullName: 'Henry Smith',
    posts: 42,
    followers: 1234,
    following: 567
  }

  return (
    <Box
      sx={{
        position: { xs: 'static', md: 'sticky' },
        top: 80,
        width: { xs: '100%', md: '319px' },
        display: { xs: 'none', lg: 'block' },
      }}
    >
      {/* User Profile */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, p: 2 }}>
        <Avatar sx={{ width: 56, height: 56, mr: 3 }}>
          {currentUser.avatar}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {currentUser.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentUser.fullName}
          </Typography>
        </Box>
        <Button
          variant="text"
          sx={{
            color: '#0095f6',
            textTransform: 'none',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          Switch
        </Button>
      </Box>

      {/* Suggestions */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            Suggestions for you
          </Typography>
          <Button
            onClick={handleViewAll}
            variant="text"
            sx={{
              color: 'text.secondary',
              textTransform: 'none',
              fontSize: '12px',
              fontWeight: 400,
              p: 0,
              minWidth: 'auto',
            }}
          >
            See all
          </Button>
        </Box>

        <List sx={{ p: 0 }}>
          {suggestions.map((user) => (
            <ListItem key={user.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton sx={{ p: 0, borderRadius: 1 }}>
                <ListItemAvatar>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user.avatar}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontSize="14px" fontWeight={600}>
                      {user.username}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary" fontSize="12px">
                      {user.relation}
                    </Typography>
                  }
                  sx={{ flexGrow: 1 }}
                />
                <Button
                  onClick={() => handleFollow(user.id)}
                  variant="text"
                  sx={{
                    color: '#0095f6',
                    textTransform: 'none',
                    fontSize: '12px',
                    fontWeight: 600,
                    minWidth: 'auto',
                    p: 0,
                  }}
                >
                  Follow
                </Button>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer Links */}
      <Box sx={{ p: 2, mt: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            mb: 2,
          }}
        >
          {[
            'About',
            'Help',
            'Press',
            'API',
            'Jobs',
            'Privacy',
            'Terms',
            'Locations',
            'Language',
            'Meta Verified'
          ].map((link) => (
            <Button
              key={link}
              variant="text"
              sx={{
                color: 'text.secondary',
                textTransform: 'none',
                fontSize: '11px',
                p: 0,
                minWidth: 'auto',
                lineHeight: 1.4,
              }}
            >
              {link}
            </Button>
          ))}
        </Box>
        
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px' }}>
          © 2024 Instagram Clone
        </Typography>
      </Box>
    </Box>
  )
}

export default Suggestions
