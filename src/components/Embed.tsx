import { Flex, Text, Image, Box, Link, Avatar } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  embed: any;
}

const resolveColor = (color: number) => {
  return color === undefined ? "#FFFFFF" : `#${color.toString(16)}`;
};

const Embed: React.FC<Props> = ({ embed }) => {
  return (
    <Flex bgColor="darkest" borderRadius="10px" maxWidth="600px">
      <span
        style={{
          width: "3px",
          backgroundColor: resolveColor(embed.color),
          marginRight: 5,
          borderRadius: "8px"
        }}
      />
      <Flex p="15px 10px 10px 10px">
        <Box>
          {embed.title && !embed.url ? (
            <Text fontWeight="bold">{embed.title}</Text>
          ) : (
            <Text as={Link} fontWeight="bold" href={embed.url}>
              {embed.title}
            </Text>
          )}
          {embed.description && (
            <Box fontSize="15px">
              <ReactMarkdown>{embed.description}</ReactMarkdown>
            </Box>
          )}
          {embed.fields &&
            embed.fields.map((field: any) => (
              <Box>
                <Text fontWeight="bold">{field.name}</Text>
                <Box fontSize="14px">
                  <ReactMarkdown>{field.value}</ReactMarkdown>
                </Box>
              </Box>
            ))}
          {embed.footer && embed.footer.text && (
            <Text>{embed.footer.text}</Text>
          )}
        </Box>
        {embed.thumbnail && (
          <Image
            src={embed.thumbnail.url}
            ml={10}
            maxWidth="100px"
            maxHeight="100px"
            borderRadius="10%"
          />
        )}
      </Flex>
    </Flex>
  );
};

export default Embed;
