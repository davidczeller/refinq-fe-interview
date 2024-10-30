import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import PostList from "components/PostList";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostList />
    </QueryClientProvider>
  );
}
