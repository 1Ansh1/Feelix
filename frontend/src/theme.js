// import { extendTheme } from "@chakra-ui/react";

// const theme = extendTheme({
//   config: {
//     initialColorMode: "light",
//     useSystemColorMode: false,
//   },

//   colors: {
//     brand: {
//       50: "#e6f6f5",
//       100: "#bde8e6",
//       200: "#93d9d6",
//       300: "#69cbc6",
//       400: "#3fbdb5",
//       500: "#26a39c",
//       600: "#1d7f79",
//       700: "#145b56",
//       800: "#0b3733",
//       900: "#021413",
//     },
//   },

//   fonts: {
//     heading: "Inter, system-ui, sans-serif",
//     body: "Inter, system-ui, sans-serif",
//   },
// });

// export default theme;

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "transparent", // 🔥 THIS IS THE KEY
      },
    },
  },
});

export default theme;
