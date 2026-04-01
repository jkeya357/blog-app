import { useGetDraftsQuery } from "./postDraftsApiSlice";
import { useEditPostMutation } from "../Post/postApiSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import EditDraft from "./EditDraft";
import DeletePost from "../Post/DeletePost";

const GetDrafts = () => {

  const userId = useSelector((state) => state.auth.user) 

 const {
    data: draftsData,
    isLoading: isDraftLoading,
   isError: isDraftError
  } = useGetDraftsQuery(userId, {
    skip: !userId
  })
  const [editPost, {isLoading, isSuccess, isError, error}] = useEditPostMutation()
  const drafts = draftsData ? Object.values(draftsData.entities) : []

  const [editPostId, setEditPostId] = useState(null)

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-semibold text-white">Your Drafts</h2>
          <p className="text-sm text-gray-400">{drafts.length} drafts found</p>
        </div>
      </div>

      {/* Loading */}
      {isDraftLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-36 rounded-lg bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {isDraftError && (
        <div className="text-center p-6 rounded-lg bg-red-500/10 text-red-400">
          Error loading drafts. {error?.data?.message || "Try again later."}
        </div>
      )}

      {/* Empty */}
      {!isDraftLoading && !isDraftError && drafts.length === 0 && (
        <div className="text-center p-6 rounded-lg bg-gray-800/40 text-gray-400">
          No drafts yet. Start writing something!
        </div>
      )}

      {/* Drafts Grid */}
      {!isDraftLoading && !isDraftError && drafts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {drafts.map((draft) => (
            <article
              key={draft.id}
              className="flex flex-col h-full border-gray-800 bg-gray-900/95 p-5 shadow-lg shadow-black/30 hover:shadow-xl hover:-translate-y-1 transition duration-200"
            >
              {/* Title */}
              <h3 className="font-semibold text-lg text-white mb-2 line-clamp-1">
                {draft.title || "Untitled Draft"}
              </h3>

              {/* Date */}
              <p className="text-xs text-gray-400 mb-3">
                {draft.createdAt && (
                  <>Saved {new Date(draft.createdAt).toLocaleDateString()}</>
                )}
              </p>

              {/* Body preview */}
              <p className="text-sm text-gray-300 flex-1 mb-3 line-clamp-3">
                {draft.content || "No content yet..."}
              </p>

              {/* Category */}
              {draft.category && (
                <div className="mb-2">
                  <span className="px-2 py-1 text-xs font-medium rounded-md 
                                    bg-purple-500/20 text-purple-400">
                    {draft.category.name}
                  </span>
                </div>
              )}

              {/* Tags */}
              {draft.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {draft.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-2 py-1 text-xs rounded-md bg-green-500/20 text-green-400"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer actions */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-700">
                {String(draft.author?.id) === String(userId) && (
                  <>
                    <DeletePost id={draft.id} />
                    <button
                      onClick={() => setEditPostId(draft)}
                      className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Edit Draft Modal */}
      {editPostId && (
        <EditDraft post={editPostId} onClose={() => setEditPostId(null)} />
      )}
    </div>
  )
}
export default GetDrafts
