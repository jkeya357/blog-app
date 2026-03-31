import { Link, useLocation } from "react-router-dom";
import LogOutComponent from "../features/auth/LogOutComponent";

const Header = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/dash/home" },
    { name: "Categories", path: "/dash/category" },
    { name: "Tags", path: "/dash/tags" },
    { name: "Drafts", path: "/dash/drafts" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        
        {/* Logo */}
        <Link
          to="/dash/home"
          className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition"
        >
          MyBlog
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition relative ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}

                {/* Active underline */}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          
          {/* Optional Profile Circle */}
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-semibold text-white shadow">
            U
          </div>

          {/* Logout Button (shadcn style) */}
          <div className="rounded-md border border-none hover:bg-gray-800 transition px-3 py-1 text-sm text-white">
            <LogOutComponent />
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;