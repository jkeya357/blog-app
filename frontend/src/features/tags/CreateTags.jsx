import { useCreateTagsMutation } from "./TagsApiSlice";
import { useState, useEffect } from "react";

const CreateTags = ({onClose}) => {

  const [createTag, {isLoading, isSuccess, isError}] = useCreateTagsMutation()

  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!name.trim()){
      setError("Tag name is required")
      return;
    }

    setError('')

    try {
      await createTag({names: [name]}).unwrap()
      setName('')
    } catch (error) {
      console.log("Error creating the tag: ", error)
    }
  }

  useEffect(() => {
    if(isSuccess){
      onClose()
    }
  }, [onClose, isSuccess])

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
        <h2 className="text-xl font-semibold text-white mb-4">Create Tag</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="tagName"
              className="block text-sm font-medium text-gray-300"
            >
              Tag Name
            </label>
            <input
              id="tagName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter tag name"
            />
            {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
          </div>

          {/* API Error */}
          {isError && (
            <div className="text-sm text-red-400">
              {error?.data?.message || "Failed to create tag."}
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
  )
}

export default CreateTags
