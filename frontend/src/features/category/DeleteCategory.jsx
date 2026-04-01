import { useDeleteCategoryMutation } from "./CategoryApiSlice";
import { Trash2 } from "lucide-react";

const DeleteCategory = ({id, postCount}) => {

  const [deleteCategory, {isLoading}] = useDeleteCategoryMutation()

  const handleDeleteCategory = async (e) => {

    if(postCount > 0){
      alert("Cannot delete category with posts")
      return;
    }

    if(window.confirm("Are you sure you want to delete this category?")){

      try {
        await deleteCategory(id).unwrap()
      } catch (error) {
      }
    }
  }

  return (
    <button
      onClick={handleDeleteCategory}
      disabled={isLoading}
      className="p-2 rounded-md text-red-500 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
    >
      <Trash2 size={18} />
    </button>
  )
}

export default DeleteCategory
