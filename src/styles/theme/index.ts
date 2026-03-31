import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      purple: '#8C19D2',
      hoverPurple: '#7114A9',
      activePurple: '#5A1087',
      blue: '#3182CE',
    },
    border: {
      gray: '#E2E8F0',
    },
    placeholder: 'rgba(0, 0, 0, 0.36)',
  },
  fonts: {
    heading: "'Nunito', sans-serif",
    body: "'Inter', sans-serif",
  },
});