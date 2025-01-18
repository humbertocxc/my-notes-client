import { Box, Typography } from "@mui/material"

function Header() {

  return (
    <Box sx={{ width: '100%', color: 'black', p: 2 }}>
      <Typography variant="h3">Notas</Typography>
    </Box>
  )
}

export default Header