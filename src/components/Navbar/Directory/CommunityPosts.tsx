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

type CommunityPostsProps = {
  communityName: string;
};

const CommunityPosts: React.FC<CommunityPostsProps> = ({ communityName }) => {
  // State to hold the fetched posts
  const [posts, setPosts] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const postsCollectionRef = collection(firestore, "posts");
      const thisCommunityPosts = query(
        postsCollectionRef,
        where("communityId", "==", communityName)
      );

      try {
        const querySnapshot = await getDocs(thisCommunityPosts);
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
      <div>{communityName}</div>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            {/* Render the individual fields of the post */}
            <p>Title: {post.title}</p>
            <p>body: {post.body}</p>
            {/* Add more fields here */}
          </div>
        ))}
      </div>
    </>
  );
};

export default CommunityPosts;
