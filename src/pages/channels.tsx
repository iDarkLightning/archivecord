import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Flex,
  Heading,
  Input,
  Spinner,
  Text
} from "@chakra-ui/react";
import axios from "axios";
import jose from "jose";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import ReactList from "react-list";
import ChannelName from "../components/ChannelName";
import Layout from "../components/Layout";
import Message from "../components/Message";
import { useAuth } from "../utils/useIsAuth";
import {
  Channel,
  ChannelInfo,
  ChannelResponse,
  Message as MessageType
} from "../types";
import PinsMenu from "../components/PinsMenu";

interface Props {
  channels?: ChannelInfo[];
  token?: string;
  litebotURL?: string;
}

const Channels: React.FC<Props> = ({ channels, token, litebotURL }) => {
  useAuth();
  const [displayedChannelID, setDisplayedChannelID] = useState<string>("");
  const [displayedChannel, setDisplayedChannel] = useState<Channel | null>(
    null
  );
  const [messages, setMessages] = useState<MessageType[]>(
    displayedChannel?.messages
  );

  const [loading, setLoading] = useState<boolean>(false);
  let categories = channels.map((c) => c.category);
  categories = categories.filter((i, p) => categories.indexOf(i) == p);

  useEffect(() => {
    if (!displayedChannelID) return;
    if (loading) return;
    setLoading((v) => !v);

    axios
      .get<ChannelResponse>(
        litebotURL + `archives/channel/${displayedChannelID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((res) => {
        setLoading((v) => !v);
        setDisplayedChannel(res.data.res);
        setMessages(res.data.res.messages);
      });
  }, [displayedChannelID]);

  return (
    <Layout showNav>
      <Flex flex={1} bgColor="medium" color="text" overflow="hidden">
        <Box
          flex={1.5}
          position="sticky"
          right={0}
          overflow="auto"
          bgColor="darkest"
        >
          <Accordion defaultIndex={[0]} allowMultiple>
            {categories.map((c) => (
              <AccordionItem border="none">
                <AccordionButton>
                  <Text textAlign="left" flex="1">
                    {c}
                  </Text>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  {channels
                    .filter((channel) => channel.category === c)
                    .map((channel) => (
                      <ChannelName
                        key={channel.id}
                        name={channel.name}
                        id={channel.id}
                        category={channel.category}
                        selected={displayedChannelID !== channel.id}
                        onClick={() => setDisplayedChannelID(channel.id)}
                      />
                    ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
        <Box
          flex={8}
          overflow="auto"
          css={{
            "&::-webkit-scrollbar": { width: "8px" },
            "&::-webkit-scrollbar-thumb": {
              background: "#0b0e11",
              borderRadius: "25px"
            }
          }}
        >
          {loading && (
            <Center height="100%">
              <Spinner color="accent" size="xl" emptyColor="darkest" mr={5} />
              <Text>Please Wait!</Text>
            </Center>
          )}
          {!displayedChannel && !loading && (
            <Center color="grayText" height="100%">
              <Flex flexDirection="column">
                <Heading as="h3">Welcome to ARCHIVECORD!</Heading>
                <Center>
                  <Text>Please select a channel to view messages for</Text>
                </Center>
              </Flex>
            </Center>
          )}
          {displayedChannel && messages && !loading && (
            <Box>
              <Center>
                <Input
                  placeholder="Search"
                  size="sm"
                  width="90%"
                  mt={3}
                  mb={3}
                  variant="filled"
                  bgColor="darkest"
                  borderRadius="15px"
                  onChange={(e) =>
                    setMessages(
                      displayedChannel.messages.filter((m) =>
                        m.clean_content.includes(e.target.value)
                      )
                    )
                  }
                  css={{
                    "&::placeholder": {
                      color: "#fd4d4d",
                      textTransform: "uppercase"
                    }
                  }}
                />
                <PinsMenu pins={displayedChannel.pins} />
              </Center>
              <ReactList
                itemRenderer={(index, key) => {
                  const message = messages[index];

                  return <Message key={key} message={message} />;
                }}
                length={messages.length}
                type="simple"
              />
            </Box>
          )}
        </Box>
        <Box flex={2} bgColor="darkest">
          {!displayedChannel && (
            <Center color="grayText" height="100%">
              Channel Info
            </Center>
          )}
          {displayedChannel && (
            <Box ml={5}>
              <Center mb={3} mt={3}>
                <Heading>INFO</Heading>
              </Center>
              <Text mb={5}>
                <span
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    marginRight: "2px"
                  }}
                >
                  Archived By:
                </span>
                <span>{displayedChannel.archiver.name}</span>
              </Text>
              <Text mb={5}>
                <span
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    marginRight: "2px"
                  }}
                >
                  Archived On:
                </span>
                <span>
                  {new Date(
                    displayedChannel.created_time.$date
                  ).toLocaleDateString()}
                </span>
              </Text>
              <Text mb={5}>
                <span
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    marginRight: "2px"
                  }}
                >
                  Last Edited On:
                </span>
                <span>
                  {new Date(
                    displayedChannel.messages[
                      displayedChannel.messages.length - 1
                    ].created_at.$date
                  ).toLocaleDateString()}
                </span>
              </Text>
              <Text mb={5}>
                <span
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    marginRight: "2px"
                  }}
                >
                  Total Messages:
                </span>
                <span>{displayedChannel.messages.length}</span>
              </Text>
              <Text mb={5}>
                <span
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    marginRight: "2px"
                  }}
                >
                  Pins:
                </span>
                <span>{displayedChannel.pins.length}</span>
              </Text>
            </Box>
          )}
        </Box>
      </Flex>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session)
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    };

  const token = jose.JWT.sign(
    { userID: session.user.id },
    process.env.JWT_SECRET
  );

  const res = await axios.get<Channel[]>(
    process.env.LITEBOT_URL + `archives/channels/`,
    {
      headers: {
        Authorization: `Bearer: ${token}`
      }
    }
  );
  return {
    props: {
      channels: res.data,
      token: token,
      litebotURL: process.env.LITEBOT_URL
    }
  };
};

export default Channels;
