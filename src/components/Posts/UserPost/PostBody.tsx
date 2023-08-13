import { Post } from "@/atoms/postAtom";
import { Flex, Text } from "@chakra-ui/react";
import router from "next/router";
import React from "react";

type PostBodyProps = {
  post: Post;
};

const PostBody: React.FC<PostBodyProps> = ({ post }) => {
  return (
    <>
      <Flex
        direction="column"
        p={1}
        onClick={() => {
          router.push(`/r/${post.communityId}/comments/${post.id}`);
        }}
      >
        <Text fontSize="14pt">{post.title}</Text>
        <Text fontSize="11pt" color="gray.600" padding="10px 0px">
          {post.body}
        </Text>
      </Flex>
    </>
  );
};
export default PostBody;
