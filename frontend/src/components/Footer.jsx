const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-800 bg-gray-950/80 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60 mt-10">
      
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left */}
        <p className="text-sm text-gray-400 text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">MyBlog</span>. All rights reserved.
        </p>

        {/* Right Links */}
        <div className="flex items-center gap-6 text-sm">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            Twitter
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            LinkedIn
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;