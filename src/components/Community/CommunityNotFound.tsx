import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type CommunityNotFoundProps = {};

const CommunityNotFound: React.FC<CommunityNotFoundProps> = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      Community Does not exits or has been banned
      <Link href={"/"}>
        <Button mt={4}>GO HOME</Button>
      </Link>
    </Flex>
  );
};
export default CommunityNotFound;
