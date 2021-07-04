import React from "react";
import { Center, Flex, Image, Link, Text } from "@chakra-ui/react";
import { Attachment as AttachmentType } from "../types";
import { AttachmentIcon, DownloadIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

interface Props {
  attachment: AttachmentType;
}

const Attachment: React.FC<Props> = ({ attachment }) => {
  const router = useRouter();

  if (attachment.content_type?.includes("image"))
    return <Image src={attachment.url} />;

  return (
    <Flex bgColor="darkest" borderRadius="10px">
      <Center h="60px" p="10px 10px 10px 10px">
        <AttachmentIcon mr={2} width="30px" height="30px" />
        <Text as={Link} color="#4286f4" href={attachment.url}>
          {attachment.filename}
        </Text>
        <DownloadIcon
          ml={1}
          width="30px"
          height="30px"
          onClick={() => router.push(attachment.url)}
          _hover={{ transform: "translateY(2px)" }}
        />
      </Center>
    </Flex>
  );
};

export default Attachment;
