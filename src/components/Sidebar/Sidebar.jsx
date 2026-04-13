import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  Search,
  Compass,
  Video,
  MessageCircle,
  Heart,
  SquarePlus,
  Menu,
  X
} from 'lucide-react'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  IconButton
} from '@mui/material'

const navigationItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: Compass, label: 'Explore', path: '/explore' },
  { icon: Video, label: 'Reels', path: '/reels' },
  { icon: MessageCircle, label: 'Messages', path: '/messages' },
  { icon: Heart, label: 'Notifications', path: '/notifications' },
  { icon: SquarePlus, label: 'Create', path: '/create' },
]

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = (path) => {
    navigate(path)
    setIsMobileMenuOpen(false)
  }

  const SidebarContent = () => (
    <Box
      sx={{
        width: { xs: '100%', md: '240px' },
        height: '100vh',
        position: { xs: 'fixed', md: 'sticky' },
        top: 0,
        left: 0,
        bgcolor: 'background.paper',
        borderRight: { xs: 'none', md: '1px solid #333' },
        display: 'flex',
        flexDirection: 'column',
        zIndex: { xs: 1200, md: 1 },
        transform: { xs: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)', md: 'translateX(0)' },
        transition: 'transform 0.3s ease',
      }}
    >
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Instagram
        </Typography>
        <IconButton
          sx={{ display: { xs: 'flex', md: 'none' } }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X />
        </IconButton>
      </Box>

      <List sx={{ flexGrow: 1, px: 2 }}>
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  bgcolor: isActive ? 'action.hover' : 'transparent',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon size={24} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '16px',
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      <Box sx={{ p: 2, borderTop: '1px solid #333' }}>
        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: 2 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Avatar sx={{ width: 24, height: 24 }}>H</Avatar>
            </ListItemIcon>
            <ListItemText
              primary="henry_"
              primaryTypographyProps={{ fontSize: '14px' }}
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  )

  return (
    <>
      <IconButton
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1100,
          display: { xs: 'flex', md: 'none' },
          bgcolor: 'background.paper',
        }}
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu />
      </IconButton>
      
      {isMobileMenuOpen && (
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1100,
            display: { xs: 'block', md: 'none' },
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <SidebarContent />
    </>
  )
}

export default Sidebar
