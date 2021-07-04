import { Box, Center, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { FaHashtag } from "react-icons/fa";

interface Props {
  name: string;
  id: string;
  category: string;
  selected: boolean;
  onClick?: () => void;
}

const ChannelName: React.FC<Props> = ({ name, onClick, selected }) => {
  return (
    <Box
      onClick={onClick}
      borderRadius="10px"
      bgColor={selected ? "darkest" : "medium"}
      _hover={{ bgColor: "medium" }}
      m="2px 2px 2px 2px"
    >
      <Flex
        pt={2}
        pb={2}
        fontSize="17px"
        alignItems="center"
        _hover={{ cursor: "pointer" }}
      >
        <Icon as={FaHashtag} mr={2} ml={2} />
        {name}
      </Flex>
    </Box>
  );
};

export default ChannelName;
