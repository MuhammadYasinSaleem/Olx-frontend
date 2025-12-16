import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { LogIn, LogOut, ShoppingCart } from 'lucide-react';

import { logoutUser, useAppDispatch, useAppSelector } from '@store';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);

  const handleSignOut = async () => {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      toast.success('Signed out successfully!');
      navigate('/');
    } else if (logoutUser.rejected.match(result)) {
      toast.error(result.payload?.message || 'Sign out failed');
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-800">Shop</span>
          </button>

          {/* Navigation and Actions */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {/* Cart badge - you can add item count later */}
              <span className="absolute -top-1 -right-1 bg-cyan-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 hidden sm:inline">
                  Welcome, <span className="font-medium">{user.username}</span>
                </span>
                <button
                  onClick={handleSignOut}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 rounded font-medium transition-all disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/signin')}
                className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 rounded font-medium transition-all shadow-lg hover:shadow-xl"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
