import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import CommunityPosts from "@/components/Navbar/Directory/CommunityPosts";
import PageContent from "@/components/Layout/PageContent";
import CreatePostLink from "@/components/Community/CreatePostLink";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <>
        <PageContent>
          <>
            {/* <CreatePostLink /> */}
            <CommunityPosts communityName="" />
          </>
          <>
            <div>RHS</div>
          </>
        </PageContent>
      </>
    </>
  );
}
