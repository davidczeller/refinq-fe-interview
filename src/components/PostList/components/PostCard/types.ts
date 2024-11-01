type Post = {
  id: number;
  title: string;
  body: string;
};

export type PostCardProps = {
  post: Post;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
