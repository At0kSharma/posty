import { Post } from "@/atoms/postAtom";
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BiMessage, BiHide } from "react-icons/bi";
import { BsBookmark, BsFlag } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import { PiArrowBendUpRightThin } from "react-icons/pi";
import { SlPresent } from "react-icons/sl";
import UserVote from "./UserVote";

type PostFooterProps = {
  post: Post;
  formatNumber: (number: number) => string;
};

const PostFooter: React.FC<PostFooterProps> = ({ post, formatNumber }) => {
  return (
    <>
      <Flex align="center" fontSize="9pt" color="gray.500" fontWeight={600}>
        <Flex align="center" mr={1} display={{ base: "flex", md: "none" }}>
          <UserVote post={post} formatNumber={formatNumber} />
        </Flex>
        <Flex
          align="center"
          mr={1}
          p="5px 5px"
          borderRadius={3}
          _hover={{ bg: "gray.100" }}
        >
          <Icon as={BiMessage} fontSize="15pt" mr={1} />
          <Text>{formatNumber(post.numberOfComments)} Comments</Text>
        </Flex>
        <Flex
          align="center"
          mr={1}
          p="5px 5px"
          borderRadius={3}
          _hover={{ bg: "gray.100" }}
          display={{ base: "none", md: "flex" }}
        >
          <Icon as={SlPresent} fontSize="12pt" mr={1} />
          <Text>Award</Text>
        </Flex>
        <Flex
          align="center"
          mr={1}
          p="5px 5px"
          borderRadius={3}
          _hover={{ bg: "gray.100" }}
        >
          <Icon as={PiArrowBendUpRightThin} fontSize="15pt" mr={1} />
          <Text>Share</Text>
        </Flex>
        <Flex
          align="center"
          mr={1}
          p="5px 5px"
          borderRadius={3}
          _hover={{ bg: "gray.100" }}
          display={{ base: "none", md: "flex" }}
        >
          <Icon as={BsBookmark} fontSize="12pt" mr={1} />
          <Text>Save</Text>
        </Flex>
        <Flex
          align="center"
          mr={1}
          p="5px 5px"
          borderRadius={3}
          _hover={{ bg: "gray.100" }}
          display={{ md: "none" }}
        >
          <Menu>
            <MenuButton>
              <Icon as={HiDotsHorizontal} mb="-2px" />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Icon as={SlPresent} fontSize="12pt" mr={1} />
                <Text>Award</Text>
              </MenuItem>
              <Divider />
              <MenuItem>
                <Icon as={BsBookmark} fontSize="12pt" mr={1} />
                <Text>Save</Text>
              </MenuItem>
              <Divider />
              <MenuItem>
                <Icon as={BiHide} fontSize="12pt" mr={1} />
                Hide
              </MenuItem>
              <Divider />
              <MenuItem>
                <Icon as={BsFlag} fontSize="12pt" mr={1} /> Report
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
};
export default PostFooter;
