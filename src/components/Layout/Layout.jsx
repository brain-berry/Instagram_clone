import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import { Box } from '@mui/material'

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { xs: 0, md: '240px' },
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
