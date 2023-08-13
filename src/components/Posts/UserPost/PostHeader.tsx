import { Post } from "@/atoms/postAtom";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { Timestamp } from "@google-cloud/firestore";
import router from "next/router";
import React from "react";
import { FcReddit } from "react-icons/fc";

type PostHeaderProps = {
  communityName: string;
  post: Post;
  formatTimeAgo: (timeAgo: Timestamp) => string;
};

const PostHeader: React.FC<PostHeaderProps> = ({
  communityName,
  post,
  formatTimeAgo,
}) => {
  return (
    <>
      <Flex justify="space-between">
        <Flex p={1} align="center">
          {communityName === "" && (
            <>
              <Flex
                onClick={() => {
                  router.push(
                    `/r/${communityName ? communityName : post.communityId}`
                  );
                }}
              >
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
              </Flex>
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
    </>
  );
};
export default PostHeader;
