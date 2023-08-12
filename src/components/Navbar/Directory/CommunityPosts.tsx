import { firestore } from "@/firebase/clientApp";
import { GetServerSidePropsContext } from "next";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import UserPostsData from "@/components/Posts/UserPost/UserPostsData";

type CommunityPostsProps = {
  communityName: string;
};

const CommunityPosts: React.FC<CommunityPostsProps> = ({ communityName }) => {
  // State to hold the fetched posts
  const [posts, setPosts] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const postsCollectionRef = collection(firestore, "posts");

      const CommunityPostsData =
        communityName === ""
          ? postsCollectionRef
          : query(
              postsCollectionRef,
              where("communityId", "==", communityName)
            );

      try {
        const querySnapshot = await getDocs(CommunityPostsData);
        const fetchedPosts: any[] = [];

        querySnapshot.forEach((doc) => {
          fetchedPosts.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <UserPostsData
          key={post.id}
          post={post}
          communityName={communityName}
        />
      ))}
    </>
  );
};

export default CommunityPosts;
