import { Community } from "@/atoms/communitiesAtom";
import CommunityNotFound from "@/components/Community/CommunityNotFound";
import CreatePostLink from "@/components/Community/CreatePostLink";
import Header from "@/components/Community/Header";
import PageContent from "@/components/Layout/PageContent";
import CommunityPosts from "@/components/Navbar/Directory/CommunityPosts";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  if (!communityData) {
    return <CommunityNotFound />;
  }
  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <CommunityPosts communityName={communityData.id} />
        </>
        <>
          <div>RHS</div>
        </>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    if (communityDoc.exists()) {
      // Convert Firestore document data to a JSON-serializable format
      const communityData = JSON.parse(
        JSON.stringify({ id: communityDoc.id, ...communityDoc.data() })
      );

      return {
        props: {
          communityData,
        },
      };
    } else {
      // Handle case when the document doesn't exist
      return {
        props: {
          communityData: "",
        },
      };
    }
  } catch (error) {
    // Handle errors
    console.log("getServerSideProps error", error);
    return {
      props: {
        communityData: null,
      },
    };
  }
}

export default CommunityPage;
