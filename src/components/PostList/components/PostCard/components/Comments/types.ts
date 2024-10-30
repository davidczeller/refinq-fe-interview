import { Comment } from "../../types";

export type Post = {
  id: number;
  title: string;
  body: string;
};

export type CommentsProps = {
  post: Post;
  comments: Comment[] | undefined;
  isLoading: boolean;
  error: Error | null;
  onClose: () => void;
};
