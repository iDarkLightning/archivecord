import { extendTheme } from "@chakra-ui/react";

const theme: { colors: { darkest: string; medium: string; accent: string } } =
  extendTheme({
    colors: {
      darkest: "#23272a",
      medium: "#2c2f33",
      accent: "#fd4d4d",
      text: "#e8e9eb",
      grayText: "#7e8286"
    },
    styles: {
      global: {
        "&::-webkit-scrollbar": { width: "8px" },
        "&::-webkit-scrollbar-thumb": {
          background: "#0b0e11",
          borderRadius: "25px"
        }
      }
    }
  });

export default theme;
