import { Box } from "@chakra-ui/react";
import React from "react";
import Nav from "./Nav";

interface Props {
  showNav?: boolean;
}

const Layout: React.FC<Props> = ({ children, showNav }) => (
  <Box height="100vh" display="flex" flexDirection="column">
    {showNav ? <Nav /> : null}
    {children}
  </Box>
);

export default Layout;
