import { useGetCategoriesQuery } from "./CategoryApiSlice";
import { selectAllCategories } from "./CategoryApiSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import CreateCategory from "./CreateCategory";
import DeleteCategory from "./DeleteCategory";

const CategoryList = () => {

  const { isLoading, isError } = useGetCategoriesQuery()
  const categories = useSelector(selectAllCategories)

  const [isCreateOpen, setIsCreateOpen] = useState(false)


  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-semibold text-white">Your Categories</h2>
          <p className="text-sm text-gray-400">
            {categories.length} categories found
          </p>
        </div>

        {/* Create Category Button */}
        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
        >
          + Create Category
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 rounded-lg bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="text-center p-6 rounded-lg bg-red-500/10 text-red-400">
          Error loading categories. Try again later.
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && categories.length === 0 && (
        <div className="text-center p-6 rounded-lg bg-gray-800/40 text-gray-400">
          No categories yet. Create your first one!
        </div>
      )}

      {/* Categories Grid */}
      {!isLoading && !isError && categories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <article
              key={cat.id}
              className="flex flex-col h-full border-gray-800 bg-gray-900/95 p-5 shadow-lg shadow-black/30 hover:shadow-xl hover:-translate-y-1 transition duration-200"
            >
              {/* Title */}
              <h3 className="font-semibold text-lg text-white mb-2 line-clamp-1">
                {cat.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-300 flex-1 mb-3 line-clamp-3">
                Posts: {cat.postCount || "No posts yet"}
              </p>

              {/* Footer actions */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-700">
                <DeleteCategory id={cat.id} postCount={cat.postCount}/>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Create Category Modal */}
      {isCreateOpen && (
        <CreateCategory onClose={() => setIsCreateOpen(false)} />
      )}
    </div>
  );
}

export default CategoryList
