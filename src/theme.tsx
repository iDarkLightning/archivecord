import { extendTheme } from "@chakra-ui/react";

const theme: { colors: { darkest: string; medium: string; accent: string } } =
  extendTheme({
    colors: {
      darkest: "#0b0e11",
      medium: "151A21",
      accent: "#fd4d4d",
    },
  });

export default theme;
