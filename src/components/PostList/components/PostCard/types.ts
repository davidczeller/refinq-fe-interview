type Post = {
  id: number;
  title: string;
  body: string;
};

export type PostCardProps = {
  post: Post;
};

export type Comment = {
  id: number;
  name: string;
  body: string;
};
