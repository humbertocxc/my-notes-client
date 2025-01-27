import { Box, SxProps, Typography } from "@mui/material"

const textStyle: SxProps = {
  fontFamily: 'Bodoni moda, serif',
  fontWeight: 500,
  fontSize: '3em',
  pl: 3,
}


function Header() {

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography sx={textStyle} variant="h1">
        My Notes
      </Typography>
    </Box>
  )
}

export default Header