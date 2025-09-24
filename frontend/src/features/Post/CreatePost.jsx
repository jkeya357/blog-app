import { useCreatePostMutation } from "./postApiSlice";
import { useGetTagsQuery } from "../tags/TagsApiSlice";
import { useGetCategoriesQuery } from "../category/CategoryApiSlice";
import { selectAllCategories } from "../category/CategoryApiSlice";
import { selectAllTags } from "../tags/TagsApiSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

const CreatePost = ({onClose}) => {

  useGetCategoriesQuery()
  useGetTagsQuery()

  const [createPost, {isLoading, isSuccess}] = useCreatePostMutation()
  const tags = useSelector(selectAllTags)
  const categories = useSelector(selectAllCategories)
  const userId = useSelector((state) => state.auth.user)
  console.log("User id", userId)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [status, setStatus] = useState("DRAFT")
  const [errMsg, setErrMsg] = useState()
  console.log("Categories", categories)
  console.log("tags", tags)
  
  const handleTagsChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setSelectedTags(selected)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      if(!title || !content || !category){
        return setErrMsg("All fields are required")
      }

      await createPost({
        userId,
        initialPost: {
          title, 
          content,
          categoryId: category,
          tagIds: selectedTags,
          status,
        }
      }).unwrap()

      setTitle("");
      setContent("");
      setCategory("");
      setSelectedTags([]);
      setStatus("DRAFT");
      setErrMsg("");
    } catch (error) {
      console.error("Failed to create post:", error);
      setErrMsg("Something went wrong while creating the post.");
    }
  }
  

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-lg shadow-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-white mb-4">Create New Post</h2>

        {errMsg && (
          <div className="mb-3 text-red-400 text-sm bg-red-500/10 p-2 rounded">
            {errMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          />

          {/* Content */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows="4"
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          />

          {/* Category (single select) */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Tags (multi select) */}
          <select
            multiple
            value={selectedTags}
            onChange={handleTagsChange}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 h-28"
          >
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Publish</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Post"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
