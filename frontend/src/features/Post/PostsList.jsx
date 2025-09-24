import { useGetPostsQuery } from "./postApiSlice";
import { selectAllPosts } from "./postApiSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

const PostsList = () => {

  const {data:posts, isLoading:isPostLoading, isSuccess:isPostSuccess, isError:isPostError, error:isPosterror} = useGetPostsQuery()

  const filter_Posts_By_User_Id = useSelector(selectAllPosts)
  const userId = useSelector((state) => state.auth.user)
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editPostId, setEditPostId] = useState(null)
  

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-semibold text-white">Your Posts</h2>
          <p className="text-sm text-gray-400">
            {filter_Posts_By_User_Id.length} posts found
          </p>
        </div>

        {/* Create Post Button */}
        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
        >
          + Create Post
        </button>
      </div>

      {/* Loading */}
      {isPostLoading && (
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
      {isPostError && (
        <div className="text-center p-6 rounded-lg bg-red-500/10 text-red-400">
          Error loading posts. Try again later.
        </div>
      )}

      {/* Empty */}
      {!isPostLoading &&
        !isPostError &&
        filter_Posts_By_User_Id.length === 0 && (
          <div className="text-center p-6 rounded-lg bg-gray-800/40 text-gray-400">
            No posts yet. Create your first post!
          </div>
        )}

      {/* Posts Grid */}
      {!isPostLoading &&
        !isPostError &&
        filter_Posts_By_User_Id.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filter_Posts_By_User_Id.map((post) => (
              <article key={post.id} className="flex flex-col h-full border-gray-800 bg-gray-900/95 p-5 shadow-lg shadow-black/30 hover:shadow-xl hover:-translate-y-1 transition duration-200"
              >
                {/* Title */}
                <h3 className="font-semibold text-lg text-white mb-2 line-clamp-1">
                  {post.title}
                </h3>

                {/* Author & Date */}
                <p className="text-xs text-gray-400 mb-3">
                By{" "}
                <span className="font-medium text-blue-400">
                  {post.author?.name || "Anonymous"}
                </span>
                {post.createdAt && (
                  <> • {new Date(post.createdAt).toLocaleDateString()}</>
                )}
                </p>

                {/* Body preview */}
                <p className="text-sm text-gray-300 flex-1 mb-3 line-clamp-3">
                  {post.content}
                </p>

                {/* Category */}
                {post.category && (
                  <div className="mb-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-md 
                                      bg-purple-500/20 text-purple-400">
                      {post.category.name}
                    </span>
                  </div>
                )}

                {/* Tags */}
                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
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
                {String(post.author.id) === String(userId) && (
                  <>
                    <DeletePost id={post.id} />
                    <button 
                    onClick={() => setEditPostId(post.id)}
                    className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700">
                      Edit
                    </button>
                  </>
                )}
              </div>
            </article>
            ))}
          </div>
        )}

      {/* Create Post Modal */}
      {isCreateOpen && <CreatePost onClose={() => setIsCreateOpen(false)} />}

      {editPostId && <EditPost
          postId={editPostId} 
         onClose={() => setEditPostId(null)}
         />}
    </div>
  );
}

export default PostsList

