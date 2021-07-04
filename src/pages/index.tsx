import { Button, Center, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import Layout from "../components/Layout";

const Index = () => {
  return (
    <Layout showNav>
      <Flex flex={1} bgColor="medium">
        <Center width="100%">
          <Flex flexDirection="column">
            <Text
              bgGradient="linear(to-l, #7928CA,#FF0080)"
              bgClip="text"
              fontSize="6xl"
              fontWeight="extrabold"
            >
              Welcome to Archivecord!
            </Text>
            <Link as={Button}>
              <NextLink href="/channels">View Channels</NextLink>
            </Link>
          </Flex>
        </Center>
      </Flex>
    </Layout>
  );
};

export default Index;
