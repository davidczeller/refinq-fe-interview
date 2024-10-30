import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Post } from "./types";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  );
}

function Content() {
  // Use the Post type for typing the `data` field in useQuery
  const { isLoading, error, data } = useQuery<Post[], Error>({
    queryKey: ["repoData"],
    queryFn: () => fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()),
  });

  if (isLoading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-red-500">An error has occurred: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Posts</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map(post => (
          <div key={post.id} className="p-6 bg-white rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
