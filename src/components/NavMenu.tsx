import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/client";
import React from "react";

interface Props {}

function NavMenu(props: Props) {
  const [session, _] = useSession();

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Avatar}
            src={session.user.image}
            border={isOpen ? "2px solid" : "none"}
            _hover={{ border: "2px solid", borderColor: "medium" }}
          />
          <MenuList>
            <MenuItem onClick={() => signOut()}>Log Out!</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
}

export default NavMenu;
