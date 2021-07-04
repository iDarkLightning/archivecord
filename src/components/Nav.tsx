import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/client";
import React from "react";
import NavMenu from "./NavMenu";

function Nav() {
  const [session, _] = useSession();
  return (
    <Box
      bgColor="darkest"
      p="2vh 2vh 2vh 2vh"
      borderBottom="5px solid"
      borderBottomColor="accent"
      position="sticky"
      top={0}
      zIndex={1}
    >
      <Flex
        textTransform="uppercase"
        color="accent"
        justifyContent="space-between"
      >
        <Heading
          onClick={() => window.location.assign("/")}
          _hover={{ cursor: "pointer" }}
        >
          archivecord
        </Heading>
        {!session && <Button onClick={() => signIn("discord")}>Log In!</Button>}
        {session && <NavMenu />}
      </Flex>
    </Box>
  );
}

export default Nav;
