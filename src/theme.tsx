import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#4a372f',
    },
    background: {
      default: "#f5ebdf",
      paper: "#e2d3c0",
    },
    secondary: {
      main: '#384538',
    },
    common: {
      white: '#f9f0e5',
      black: "#2c2420",
    },
    info: {
      main: "#b79474",
    }
  },
});

export default theme;