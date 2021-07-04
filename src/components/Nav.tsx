import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import NavMenu from "./NavMenu";

function Nav() {
  const [session, _] = useSession();
  const router = useRouter();
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
          onClick={() => router.push("/")}
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
