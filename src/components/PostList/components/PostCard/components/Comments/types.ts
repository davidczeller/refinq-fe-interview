export type Post = {
  id: number;
  title: string;
  body: string;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type CommentsProps = {
  post: Post;
  onClose: () => void;
};
