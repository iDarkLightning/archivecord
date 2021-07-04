import {
  Icon,
  IconProps,
  Modal,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  ModalBody,
  Flex,
  Text,
  Divider,
  Center
} from "@chakra-ui/react";
import React from "react";
import { AiFillPushpin } from "react-icons/ai";
import { Message as MessageType } from "../types";
import Message from "./Message";

interface Props {
  pins: MessageType[];
}

const PinsIcon = (props: IconProps) => (
  <Icon as={AiFillPushpin} {...props}></Icon>
);

const PinsMenu: React.FC<Props> = ({ pins }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <PinsIcon
        onClick={onOpen}
        color="darkest"
        minHeight="30px"
        minWidth="30px"
        ml={2}
        _hover={{ transform: "translateY(2px)" }}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="xl"
      >
        <ModalOverlay />
        <Flex>
          <ModalContent bgColor="medium" color="text">
            <ModalHeader>Pins</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {pins.length === 0 && (
                <Center color="grayText">
                  <Text>
                    This channel didn't have any pinned messages...and it never
                    will
                  </Text>
                </Center>
              )}
              {pins.length > 0 &&
                pins.map((p) => (
                  <>
                    <Message message={p} />
                    <Divider color="medium" />
                  </>
                ))}
            </ModalBody>
          </ModalContent>
        </Flex>
      </Modal>
    </>
  );
};

export default PinsMenu;
