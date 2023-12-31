import { authModalState } from "@/atoms/authModalAtom";
import { Post, PostVoteSnippet } from "@/atoms/postAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { Icon, Text } from "@chakra-ui/react";
import { doc, getDoc, increment, writeBatch } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  PiArrowFatDownBold,
  PiArrowFatDownFill,
  PiArrowFatUpBold,
  PiArrowFatUpFill,
} from "react-icons/pi";
import { useSetRecoilState } from "recoil";

type UserVoteProps = {
  post: Post;
  formatNumber: (number: number) => string;
};

const UserVote: React.FC<UserVoteProps> = ({ post, formatNumber }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [user] = useAuthState(auth);

  const handleUpVote = () => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
    }
    if (!upVote && !downVote) {
      addUserVoteToPost(1);
    }
    if (upVote) {
      deleteUserVote(-1);
    }
    if (downVote) {
      updateUserVote(2);
    }
  };
  const handleDownVote = () => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
    }
    if (!upVote && !downVote) {
      addUserVoteToPost(-1);
    }
    if (upVote) {
      updateUserVote(-2);
    }
    if (downVote) {
      deleteUserVote(1);
    }
  };

  const getPostUserSnippet = async () => {
    setLoading(true);
    const votesDoc = await getDoc(doc(firestore, "posts", post.id));
    if (votesDoc.exists()) {
      setTotalVotes(votesDoc.data().voteStatus);
    }
    if (user) {
      try {
        const snippetDoc = await getDoc(
          doc(firestore, `posts/${post.id}/postVoteSnippets`, user?.uid)
        );
        if (snippetDoc.exists()) {
          const snippetData = snippetDoc.data();
          if (snippetData.vote === 1) {
            setUpVote(true);
            setDownVote(false);
          } else if (snippetData.vote === -1) {
            setUpVote(false);
            setDownVote(true);
          }
        } else {
          setUpVote(false);
          setDownVote(false);
        }
      } catch (error: any) {
        console.log("getPostUserSnippet error", error);
        setError(error.message);
      }
    }
    setLoading(false);
  };

  const addUserVoteToPost = async (value: number) => {
    const batch = writeBatch(firestore);
    try {
      if (user) {
        const newVoteSnippet: PostVoteSnippet = {
          vote: value,
        };
        batch.set(
          doc(firestore, `posts/${post.id}/postVoteSnippets`, user.uid),
          newVoteSnippet
        );
        batch.update(doc(firestore, `posts`, post.id), {
          voteStatus: increment(value),
        });
        await batch.commit();
        getPostUserSnippet();
      }
    } catch (error: any) {
      console.log("addUserVoteToPost error", error);
      setError(error.message);
    }
    setLoading(false);
  };
  const deleteUserVote = async (value: number) => {
    const batch = writeBatch(firestore);
    try {
      if (user) {
        batch.delete(
          doc(firestore, `posts/${post.id}/postVoteSnippets`, user.uid)
        );
        batch.update(doc(firestore, `posts`, post.id), {
          voteStatus: increment(value),
        });
        await batch.commit();
        getPostUserSnippet();
      }
    } catch (error: any) {
      console.log("DeleteUserVote error", error);
      setError(error.message);
    }
    setLoading(false);
  };
  const updateUserVote = async (value: number) => {
    const batch = writeBatch(firestore);
    try {
      if (user) {
        const snippetDoc = await getDoc(
          doc(firestore, `posts/${post.id}/postVoteSnippets`, user?.uid)
        );
        if (snippetDoc.exists()) {
          batch.update(
            doc(firestore, `posts/${post.id}/postVoteSnippets`, user?.uid),
            {
              vote: increment(value),
            }
          );
          batch.update(doc(firestore, `posts`, post.id), {
            voteStatus: increment(value),
          });
          await batch.commit();
          getPostUserSnippet();
        }
      }
    } catch (error: any) {
      console.log("UpdateUserVote error", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!user) return;
    getPostUserSnippet();
  }, [totalVotes, upVote, downVote]);
  return (
    <>
      <Icon
        as={upVote ? PiArrowFatUpFill : PiArrowFatUpBold}
        fontSize="18pt"
        p={1}
        color={upVote ? "brand.100" : "gray.500"}
        _hover={{ bg: "gray.300", color: "brand.100" }}
        onClick={handleUpVote}
      />
      <Text
        fontSize="9pt"
        color={upVote ? "brand.100" : downVote ? "blue.600" : "gray.500"}
        fontWeight={600}
        padding={{ base: "0px 4px", md: "4px 0px" }}
      >
        {formatNumber(totalVotes)}
      </Text>
      <Icon
        as={downVote ? PiArrowFatDownFill : PiArrowFatDownBold}
        fontSize="18pt"
        p={1}
        color={downVote ? "blue.600" : "gray.500"}
        _hover={{ bg: "gray.300", color: "blue.600" }}
        onClick={handleDownVote}
      />
    </>
  );
};
export default UserVote;
function setAuthModalState(arg0: { open: boolean; view: string }) {
  throw new Error("Function not implemented.");
}
