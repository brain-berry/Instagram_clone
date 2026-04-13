import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  Avatar,
  IconButton,
  Alert
} from '@mui/material'
import { Facebook } from 'lucide-react'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock authentication - in real app, this would be an API call
      if (formData.username && formData.password) {
        // Store auth token (mock)
        localStorage.setItem('authToken', 'mock-token')
        navigate('/')
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFacebookLogin = () => {
    // Mock Facebook login
    console.log('Facebook login initiated')
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400,
            border: '1px solid #333',
            borderRadius: 2,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              Instagram
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to see photos and videos from your friends
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Phone number, username or email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              size="small"
              autoComplete="username"
            />
            
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              size="small"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 2,
                mb: 2,
                py: 1.5,
                bgcolor: '#0095f6',
                '&:hover': { bgcolor: '#0081d7' },
                '&:disabled': { bgcolor: '#4a9eda' },
              }}
            >
              {loading ? 'Signing in...' : 'Log in'}
            </Button>
          </form>

          <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="body2" sx={{ px: 2, color: 'text.secondary' }}>
              OR
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          <Button
            fullWidth
            startIcon={<Facebook size={20} />}
            onClick={handleFacebookLogin}
            sx={{
              color: '#385185',
              fontWeight: 600,
              textTransform: 'none',
              py: 1,
            }}
          >
            Log in with Facebook
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              variant="text"
              sx={{
                color: '#00376b',
                fontSize: '12px',
                textTransform: 'none',
                p: 0,
              }}
            >
              Forgot password?
            </Button>
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            width: '100%',
            maxWidth: 400,
            border: '1px solid #333',
            borderRadius: 2,
            mt: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2">
            Don't have an account?{' '}
            <Button
              variant="text"
              sx={{
                color: '#0095f6',
                fontWeight: 600,
                textTransform: 'none',
                p: 0,
                ml: 0.5,
              }}
            >
              Sign up
            </Button>
          </Typography>
        </Paper>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Get the app.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 1 }}>
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderColor: '#333',
                color: 'white',
                textTransform: 'none',
                px: 2,
              }}
            >
              App Store
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderColor: '#333',
                color: 'white',
                textTransform: 'none',
                px: 2,
              }}
            >
              Google Play
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginPage
