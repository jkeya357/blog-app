import { useEditPostMutation } from "./postApiSlice";
import { useGetCategoriesQuery } from "../category/CategoryApiSlice";
import { useGetTagsQuery } from "../tags/TagsApiSlice";
import { selectPostsById } from "./postApiSlice";
import { selectAllTags } from "../tags/TagsApiSlice";
import { selectAllCategories } from "../category/CategoryApiSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const EditPost = ({onClose, postId}) => {

  useGetCategoriesQuery()
  useGetTagsQuery()

  const [editPost, {isLoading, isSuccess}] = useEditPostMutation()
  const selectedPost = useSelector((state) => selectPostsById(state, postId))
  const allTags = useSelector(selectAllTags)
  const allCategories =  useSelector(selectAllCategories)
  console.log('POST ID: ', selectedPost)

  
  if(!selectedPost){
    console.log("No post selected!")
    return
  }

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState([])
  const [postStatus, setPostStatus] = useState("PUBLISHED")

  useEffect(() => {
    if(!selectedPost) return;

      setTitle(selectedPost.title)
      setContent(selectedPost.content)
      setCategory(selectedPost.category?.id)
      setTags(selectedPost.tags?.map((tag) => tag.id))
      setPostStatus(selectedPost.status)
    
  }, [selectedPost])

  const handleTagsChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setTags(selected)
  }

  const handleUpdatePost = async (e) => {
    e.preventDefault()

    try {
      await editPost({
        id: selectedPost.id,
        initialPostData: {
          id: selectedPost.id,
          title: title.trim(),
          content: content.trim(),
          categoryId:category,
          tagIds: tags,
          status:postStatus
        }
      }).unwrap()

      onClose()
    } catch (error) {
      console.log("There was an error updating the post: ",error)
    }
  } 

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <form 
        onSubmit={handleUpdatePost}
        className="bg-gray-900 p-6 rounded-lg space-y-4 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold text-white">Edit Post</h2>
        
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        >
          {allCategories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Tags (comma-separated for now) */}
        <select
              multiple
              value={tags}
              onChange={handleTagsChange}
              className="w-full p-2 rounded bg-gray-800 text-white"
            >
              {allTags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>


        <select
            value={postStatus}
            onChange={(e) => setPostStatus(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Publish</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!selectedPost || !title || !content || !category || isLoading}
            className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditPost