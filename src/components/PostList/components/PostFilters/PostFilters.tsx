import { usePostFilterStore } from "stores/usePostFilterStore";

export default function PostFilters() {
  const {
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    commentSortOrder,
    setCommentSortOrder,
    searchScope,
    setSearchScope,
    showFilters,
    toggleShowFilters,
  } = usePostFilterStore();

  return (
    <div>
      {/* Toggle Button for Search and Filter Options */}
      <div className="text-right mb-4">
        <button
          onClick={toggleShowFilters}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none transition duration-200"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Animated Search and Filter Options */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          showFilters ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full p-2 pr-10 border rounded focus:outline-none focus:border-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          )}
        </div>

        <div className="flex justify-between items-center mb-4">
          {/* Search Scope Toggle */}
          <div className="flex items-center space-x-4">
            <label>Search In:</label>
            <select
              value={searchScope}
              onChange={e => setSearchScope(e.target.value as "title" | "body" | "both")}
              className="border p-2 rounded focus:outline-none"
            >
              <option value="title">Title</option>
              <option value="body">Body</option>
              <option value="both">Both</option>
            </select>
          </div>

          {/* Sorting Options */}
          <div className="flex items-center space-x-4">
            <label>Sort By:</label>
            <select
              value={sortOption}
              onChange={e => setSortOption(e.target.value as "A-Z" | "Z-A" | "comments")}
              className="border p-2 rounded focus:outline-none"
            >
              <option value="A-Z">Title: A-Z</option>
              <option value="Z-A">Title: Z-A</option>
              <option value="comments">Comment Count</option>
            </select>

            {/* Comment Sort Order */}
            {sortOption === "comments" && (
              <select
                value={commentSortOrder}
                onChange={e => setCommentSortOrder(e.target.value as "asc" | "desc")}
                className="border p-2 rounded focus:outline-none"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
