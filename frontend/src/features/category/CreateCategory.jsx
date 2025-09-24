import { useCreateCategoryMutation } from "./CategoryApiSlice";
import { useState, useEffect } from "react";

const CreateCategory = ({onClose}) => {

  const [createCategory, {isLoading, isSuccess, isError, error}] = useCreateCategoryMutation()

  const [name, setName] = useState('')
  const [err, setErr] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!name.trim()){
        setErr('Category name is required')
        return;
      }

    try {
      await createCategory({name}).unwrap()
      setName('')
    } catch (error) {
      console.log("Error creating the category: ", error)
    }
  }

  useEffect(() => {
    if(isSuccess){
      onClose()
    }
  }, [isSuccess, onClose])

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-white mb-4">
          Create Category
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Category Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter category name"
            />
            {err && <p className="text-sm text-red-400 mt-1">{err}</p>}
          </div>

          {/* Error from API */}
          {isError && (
            <div className="text-sm text-red-400">
              {error?.data?.message || "Failed to create category."}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCategory
