const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-8">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>

        <div className="space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white">
            Twitter
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
