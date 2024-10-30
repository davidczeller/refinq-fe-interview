import { create } from "zustand";

interface PostFilterState {
  searchQuery: string;
  sortOption: "A-Z" | "Z-A" | "comments";
  commentSortOrder: "asc" | "desc";
  searchScope: "title" | "body" | "both";
  showFilters: boolean;
  setSearchQuery: (query: string) => void;
  setSortOption: (option: "A-Z" | "Z-A" | "comments") => void;
  setCommentSortOrder: (order: "asc" | "desc") => void;
  setSearchScope: (scope: "title" | "body" | "both") => void;
  toggleShowFilters: () => void;
}

export const usePostFilterStore = create<PostFilterState>(set => ({
  searchQuery: "",
  sortOption: "A-Z",
  commentSortOrder: "asc",
  searchScope: "both",
  showFilters: false,
  setSearchQuery: query => set({ searchQuery: query }),
  setSortOption: option => set({ sortOption: option }),
  setCommentSortOrder: order => set({ commentSortOrder: order }),
  setSearchScope: scope => set({ searchScope: scope }),
  toggleShowFilters: () => set(state => ({ showFilters: !state.showFilters })),
}));
