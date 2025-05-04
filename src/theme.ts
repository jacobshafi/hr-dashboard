import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#0052CC' }, // Corporate blue
      secondary: { main: '#E5F0FF' }, // Soft accent
      background: { default: '#F7F9FC' },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      h5: { fontWeight: 600 },
      subtitle1: { fontWeight: 500 },
    },
  });

export default theme;