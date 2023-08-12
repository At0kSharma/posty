import { Post } from "@/atoms/postAtom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BiHide, BiMessage } from "react-icons/bi";
import { BsBookmark, BsFlag, BsThreeDots } from "react-icons/bs";
import { FcReddit } from "react-icons/fc";
import { HiDotsHorizontal } from "react-icons/hi";
import {
  PiArrowFatUpBold,
  PiArrowFatDownBold,
  PiArrowBendUpRightThin,
} from "react-icons/pi";
import { SlPresent } from "react-icons/sl";

type UserPostsDataProps = {
  post: Post;
  communityName: string;
};

const UserPostsData: React.FC<UserPostsDataProps> = ({
  post,
  communityName,
}) => {
  const formatNumber = (number: number): string => {
    if (number >= 1_000_000) {
      return (number / 1_000_000).toFixed(1) + "M";
    } else if (number >= 1_000) {
      return (number / 1_000).toFixed(1) + "K";
    } else {
      return number.toString();
    }
  };

  const formatTimeAgo = (timestamp: any): string => {
    const currentTime = new Date().getTime();
    const createdAtTime = timestamp.toMillis();
    const timeDifferenceInMilliseconds = currentTime - createdAtTime;
    const timeDifferenceInHours = Math.floor(
      timeDifferenceInMilliseconds / (1000 * 60 * 60)
    );

    return `${timeDifferenceInHours} hours ago`;
  };

  return (
    <>
      <Flex
        bg="white"
        width="100%"
        mt={2}
        border="1px solid"
        borderColor="gray.300"
        borderRadius={5}
      >
        <Flex
          direction="column"
          align="center"
          bg="blackAlpha.50"
          width="8%"
          pt="10px"
          display={{ base: "none", md: "flex" }}
        >
          <Icon
            as={PiArrowFatUpBold}
            fontSize="17pt"
            color="gray.500"
            p="3px"
            borderRadius="2px"
            _hover={{ bg: "gray.200", color: "brand.100" }}
          />
          <Text fontSize="8pt" fontWeight={600} padding="3px 0px">
            {formatNumber(post.voteStatus)}
          </Text>
          <Icon
            as={PiArrowFatDownBold}
            fontSize="17pt"
            color="gray.500"
            p="3px"
            borderRadius="2px"
            _hover={{ bg: "gray.200", color: "blue.500" }}
          />
        </Flex>
        <Flex width="92%" direction="column" p={1} lineHeight="16pt">
          {/* header */}
          <Flex justify="space-between">
            <Flex p={1} align="center">
              {communityName === "" && (
                <>
                  <Icon
                    as={FcReddit}
                    fontSize="18pt"
                    bg="blue.400"
                    borderRadius={50}
                    mr={1}
                  />
                  <Text fontSize="9pt" fontWeight={600}>
                    r/{post.communityId}
                  </Text>
                  <Text
                    textAlign="center"
                    color="gray.400"
                    p="0px 5px"
                    mt="-5px"
                    fontSize="9pt"
                    fontWeight={600}
                  >
                    .
                  </Text>
                </>
              )}
              <Text fontSize="9pt" color="gray.500">
                Posted by {" u/"}
                {post.creatorDisplayName} {formatTimeAgo(post.createdAt)}
              </Text>
            </Flex>
            {/* <Flex>JOin </Flex> */}
          </Flex>
          {/* body */}
          <Flex direction="column" p={1}>
            <Text fontSize="14pt">{post.title}</Text>
            <Text fontSize="11pt" color="gray.600" padding="10px 0px">
              {post.body}
            </Text>
          </Flex>
          {/* footer */}
          <Flex align="center" fontSize="9pt" color="gray.500" fontWeight={600}>
            <Flex align="center" mr={1} display={{ base: "flex", md: "none" }}>
              <Icon
                as={PiArrowFatUpBold}
                p="3px"
                borderRadius="2px"
                fontSize="16pt"
                _hover={{ bg: "gray.100", color: "brand.100" }}
              />
              <Text fontWeight={600} padding="0px 5px">
                {formatNumber(post.voteStatus)}
              </Text>
              <Icon
                as={PiArrowFatDownBold}
                p="3px"
                borderRadius="2px"
                fontSize="16pt"
                _hover={{ bg: "gray.100", color: "blue.500" }}
              />
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
        </Flex>
      </Flex>
    </>
  );
};
export default UserPostsData;
