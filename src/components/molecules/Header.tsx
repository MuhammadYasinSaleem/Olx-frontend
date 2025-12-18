import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { LogIn, LogOut, Package, ShoppingCart, User } from 'lucide-react';

import { logoutUser, useAppDispatch, useAppSelector } from '@store';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);
  const { totalItems } = useAppSelector((state) => state.cart);

  const handleSignOut = async () => {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      toast.success('Signed out successfully!');
      navigate('/');
    } else if (logoutUser.rejected.match(result)) {
      toast.error(result.payload?.message || 'Sign out failed');
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
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

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={handleCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-600 text-white text-xs font-bold rounded-full min-w-4 sm:min-w-5 h-4 sm:h-5 flex items-center justify-center px-1 text-[10px] sm:text-xs">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm text-gray-600 hidden md:inline">
                  Welcome, <span className="font-medium">{user.username}</span>
                </span>
                <button
                  onClick={() => navigate('/my-products')}
                  className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-cyan-600 hover:bg-cyan-50 border border-cyan-300 rounded-lg font-medium transition-colors"
                  title="View my products"
                >
                  <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">My Products</span>
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Profile"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </button>
                <button
                  onClick={handleSignOut}
                  disabled={loading}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 rounded font-medium transition-all disabled:opacity-50 text-xs sm:text-sm"
                >
                  <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                  <span className="sm:hidden">Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/signin')}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 rounded font-medium transition-all shadow-lg hover:shadow-xl text-xs sm:text-sm"
              >
                <LogIn className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
