import { LogOut, X } from "lucide-react";
import { logout } from "./authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LogOutComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await dispatch(logout());
      navigate("/");
    } catch (error) {
      return;
    }
  };

  return (
    <>
      {/* ✅ Logout Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-md border border-red-500/30 bg-red-600/90 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
      >
        <LogOut size={18} />
        Log out
      </button>

      {/* ✅ Modal ONLY when open */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <div className="relative z-10 w-full max-w-md mx-4 rounded-xl border border-gray-800 bg-gray-950 p-6 shadow-2xl animate-in fade-in zoom-in-95">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition"
            >
              <X size={18} />
            </button>

            {/* Content */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">
                Confirm Logout
              </h2>

              <p className="text-sm text-gray-400">
                Are you sure you want to log out? You’ll need to sign in again to access your account.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogOutComponent;