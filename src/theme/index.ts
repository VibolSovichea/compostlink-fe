import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    green: {
      400: '#4ADE80', // Adjust this color to match your design
      500: '#22C55E',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#F8F9FA',
      },
    },
  },
  components: {
    Progress: {
      baseStyle: {
        track: {
          bg: 'gray.100',
        },
        filledTrack: {
          bg: 'green.400',
        },
      },
    },
  },
});

export default theme; 