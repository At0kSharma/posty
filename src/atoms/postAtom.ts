import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Post = {
  id: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: String;
  title: string;
  body: string;
  numberOfComments: number;
  voteStatus: number;
  imageURL?: string;
  communityImageURL?: string;
  createdAt: Timestamp;
};

interface PostState {
  selectedPost: Post | null;
  posts: Post[];
}

const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
};

export const postState = atom<PostState>({
  key: "postState",
  default: defaultPostState,
});

export interface PostVoteSnippet {
  vote?: number;
}
interface PostVoteState {
  voteSnippets: PostVoteSnippet[];
}
const defaultPostVoteState: PostVoteState = {
  voteSnippets: [],
};

export const postVoteState = atom<PostVoteState>({
  key: "postVotesState",
  default: defaultPostVoteState,
});
