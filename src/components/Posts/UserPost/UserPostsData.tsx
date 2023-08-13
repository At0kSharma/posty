import { Post } from "@/atoms/postAtom";
import { Flex } from "@chakra-ui/react";
import React from "react";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import UserVote from "./UserVote";

type UserPostsDataProps = {
  key: string;
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
        cursor="pointer"
      >
        <Flex
          direction="column"
          align="center"
          bg="blackAlpha.50"
          pt="10pt"
          width="8%"
          display={{ base: "none", md: "flex" }}
        >
          <UserVote post={post} formatNumber={formatNumber} />
        </Flex>

        <Flex width="92%" direction="column" p={1} lineHeight="16pt">
          {/* header */}
          {/* <Text>{post.id}</Text> */}
          <PostHeader
            communityName={communityName}
            post={post}
            formatTimeAgo={formatTimeAgo}
          />

          {/* body */}
          <PostBody post={post} />

          {/* footer */}
          <PostFooter post={post} formatNumber={formatNumber} />
        </Flex>
      </Flex>
    </>
  );
};
export default UserPostsData;
