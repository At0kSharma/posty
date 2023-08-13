import { firestore } from "@/firebase/clientApp";
import { Flex, Text } from "@chakra-ui/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type indexProps = {};

const index: React.FC<indexProps> = () => {
  const [postData, setPostData] = useState<any | null>(null);
  const router = useRouter();
  const { postId } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (postId) {
        const singlePostRef = doc(firestore, "posts", postId as string);
        try {
          const docSnapshot = await getDoc(singlePostRef);
          if (docSnapshot.exists()) {
            setPostData(docSnapshot.data());
          } else {
            console.log("Post not found");
          }
        } catch (error: any) {
          console.log("Error fetching Single Post data:", error);
        }
      }
    };

    fetchData();
  }, [postId]);

  return (
    <>
      {postData && (
        <Flex>
          <Text fontSize="20pt">{postData.title}</Text>
        </Flex>
      )}
    </>
  );
};
export default index;
