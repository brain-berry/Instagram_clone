import { useState } from 'react'
import {
  Box,
  Avatar,
  TextField,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { SquarePlus, X } from 'lucide-react'

const CreatePost = () => {
  const [open, setOpen] = useState(false)
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setCaption('')
    setImage(null)
    setPreview('')
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePost = () => {
    // In a real app, this would upload the image and post data to a server
    console.log('Posting:', { caption, image })
    handleClose()
  }

  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.paper',
          border: '1px solid #333',
          borderRadius: 2,
          p: 3,
          mb: 3,
          maxWidth: 614,
          mx: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 40, height: 40 }}>H</Avatar>
          <TextField
            fullWidth
            placeholder="What's on your mind?"
            onClick={handleOpen}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
              sx: {
                cursor: 'pointer',
                fontSize: '15px',
                color: 'text.secondary',
              },
            }}
          />
          <IconButton onClick={handleOpen} color="primary">
            <SquarePlus size={24} />
          </IconButton>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ display: 'flex', minHeight: '500px' }}>
            {/* Image Preview */}
            <Box sx={{ flex: 1, bgcolor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                  <SquarePlus size={48} />
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Select photo to upload
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Post Details */}
            <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ width: 32, height: 32, mr: 2 }}>H</Avatar>
                <Typography variant="subtitle2" fontWeight={600}>
                  henry_
                </Typography>
              </Box>

              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{ flexGrow: 1, mb: 2 }}
              />

              <input
                accept="image/*"
                id="image-upload"
                type="file"
                hidden
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload">
                <Button
                  component="span"
                  variant="outlined"
                  sx={{
                    borderColor: '#333',
                    color: 'primary.main',
                    textTransform: 'none',
                    mb: 2,
                  }}
                >
                  Select from computer
                </Button>
              </label>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ borderTop: '1px solid #333', px: 3, py: 2 }}>
          <IconButton onClick={handleClose} size="small">
            <X size={20} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            onClick={handlePost}
            variant="contained"
            disabled={!image || !caption.trim()}
            sx={{
              bgcolor: '#0095f6',
              '&:hover': { bgcolor: '#0081d7' },
              '&:disabled': { bgcolor: '#4a9eda' },
            }}
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreatePost
