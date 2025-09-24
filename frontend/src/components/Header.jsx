import { Link } from "react-router-dom"
import LogOutComponent from "../features/auth/LogOutComponent"

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
     
        <Link to="/dash/home" className="text-2xl font-bold hover:text-gray-200">
          MyBlog
        </Link>

        <div className="flex space-x-6">
          <Link to="/dash/home" className="hover:text-gray-200">Home</Link>
          <Link to="/dash/category" className="hover:text-gray-200">Categories</Link>
          <Link to="/dash/tags" className="hover:text-gray-200">Tags</Link>
        </div>

        <div className="flex space-x-6">
          <Link to="/dash/drafts">Drafts</Link>
          <LogOutComponent/>
        </div>

      </div>
    </header>
  )
}

export default Header
