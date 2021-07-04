import { Avatar, Box, Flex, Text, Center, Link } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Message as MessageType } from "../types";
import Attachment from "./Attachment";
import Embed from "./Embed";
import NextLink from "next/link";

interface Props {
  message: MessageType;
  style?: any;
}

const resolveColor = (color: number) => {
  return color === 16777215 ? "#FFFFFF" : `#${color.toString(16)}`;
};

const Message: React.FC<Props> = ({ message, style }) => {
  return (
    <Flex
      ml={5}
      mb={3}
      mt={2}
      mr={3}
      style={style}
      _hover={{ bgColor: "darkest" }}
    >
      <Avatar src={message.author.avatar} mr={3} />
      <Flex flexDirection="column">
        <Flex>
          <Center>
            <Text
              color={resolveColor(message.author.color)}
              fontWeight="500"
              _hover={{ textDecoration: "underline", cursor: "pointer" }}
            >
              {message.author.name}
            </Text>
            <Text ml={2} fontSize={11} color="grayText">
              {message.created_at_str}
            </Text>
          </Center>
        </Flex>
        <ReactMarkdown>{message.clean_content}</ReactMarkdown>
        {message.attachments &&
          message.attachments.map((a) => (
            <Attachment key={a.url} attachment={a} />
          ))}
        {message.embeds && message.embeds.map((e) => <Embed embed={e} />)}
      </Flex>
    </Flex>
  );
};

export default Message;
