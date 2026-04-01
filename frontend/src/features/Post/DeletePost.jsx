import { useDeletePostMutation } from "./postApiSlice";
import { Trash2 } from "lucide-react";

const DeletePost = ({id}) => {

  const [deletePost, {isLoading}] = useDeletePostMutation()

  const handleDeletePost = async (e) => {
    if(window.confirm("Are you sure you wan to delete the post ?")){
      try {
        await deletePost(id)
      } catch (error) {
      }
    }
  }

  return (
    <button
      onClick={handleDeletePost}
      disabled={isLoading}
      className="p-2 rounded-md text-red-500 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
    >
      <Trash2 size={18} />
    </button>
  )
}

export default DeletePost
