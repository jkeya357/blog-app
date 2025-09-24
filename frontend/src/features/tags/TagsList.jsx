import { useGetTagsQuery } from "./TagsApiSlice";
import { selectAllTags } from "./TagsApiSlice";
import { useSelector } from "react-redux";
import CreateTags from "./CreateTags";
import DeleteTag from "./DeleteTag";
import { useState } from "react";

const TagsList = () => {

  const {isLoading, isError} = useGetTagsQuery()

  const tags = useSelector(selectAllTags)

  const [isCreateOpen, setIsCreateOpen] = useState(false)

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-semibold text-white">Your Tags</h2>
          <p className="text-sm text-gray-400">{tags.length} tags found</p>
        </div>

        {/* Create Tag Button */}
        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
        >
          + Create Tag
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 rounded-lg bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="text-center p-6 rounded-lg bg-red-500/10 text-red-400">
          Error loading tags. Try again later.
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && tags.length === 0 && (
        <div className="text-center p-6 rounded-lg bg-gray-800/40 text-gray-400">
          No tags yet. Create your first one!
        </div>
      )}

      {/* Tags Grid */}
      {!isLoading && !isError && tags.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {tags.map((tag) => (
            <article
              key={tag.id}
              className="flex flex-col h-full border-gray-800 bg-gray-900/95 p-4 shadow-md shadow-black/30 hover:shadow-lg hover:-translate-y-1 transition duration-200"
            >
              {/* Tag Name */}
              <h3 className="font-semibold text-md text-green-400 mb-2 line-clamp-1">
                #{tag.name}
              </h3>

              <p className="text-sm text-gray-300 flex-1 mb-3 line-clamp-3">
                Posts: {tag.postCount || "No posts yet"}
              </p>

              {/* Footer actions */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-700">
                <DeleteTag id={tag.id} postCount={tag.postCount}/>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Create Tag Modal */}
      {isCreateOpen && <CreateTags onClose={() => setIsCreateOpen(false)} />}
    </div>
  );
}

export default TagsList
