import { useDeleteTagMutation } from "./TagsApiSlice";
import { Trash2 } from "lucide-react";

const DeleteTag = ({id, postCount}) => {

  const [deleteTag, {isLoading}] = useDeleteTagMutation()
  
  const handleDeleteTag = async (e) => {

    if(postCount > 0){
     alert("Cannot delete tag with posts")
     return;
    }

    if(window.confirm("Are you sure you want to delete the category ?")){
      
      try {
        await deleteTag(id).unwrap()

      } catch (error) {
      }
    }
  }

  return (
    <button
      onClick={handleDeleteTag}
      disabled={isLoading}
      className="p-2 rounded-md text-red-500 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
    >
      <Trash2 size={18} />
    </button>
  )
}

export default DeleteTag
