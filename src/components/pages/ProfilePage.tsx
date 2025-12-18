import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Mail, MapPin, Phone, User } from 'lucide-react';

import { Button } from '@components/atoms';
import { fetchUserProfile, useAppDispatch, useAppSelector } from '@store';

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    const loadProfile = async () => {
      const result = await dispatch(fetchUserProfile());

      if (fetchUserProfile.rejected.match(result)) {
        toast.error(result.payload?.message || 'Failed to load profile');
        if (result.payload?.status === 403 || result.payload?.status === 401) {
          navigate('/auth');
        }
      }
    };

    loadProfile();
  }, [dispatch, navigate]);

  if (!user && !loading) {
    navigate('/auth');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error.message}</p>
          <Button onClick={() => navigate('/')} variant="primary">
            Go to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-4 text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-2">
            View and manage your account information
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="bg-linear-to-r from-blue-500 to-cyan-500 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <User size={32} className="text-blue-500" />
                </div>
                <div className="text-white">
                  <h2 className="text-2xl font-bold">
                    {user?.first_name?.trim() || user?.last_name?.trim()
                      ? `${user.first_name?.trim() || ''} ${user.last_name?.trim() || ''}`.trim()
                      : user?.username || 'User'}
                  </h2>
                  <p className="text-blue-100">@{user?.username}</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="bg-white text-blue-500 hover:bg-blue-50 border-white"
                onClick={() => {
                  toast('Edit profile functionality coming soon!');
                }}
              >
                <Edit2 size={16} className="mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <User size={20} className="text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Username</p>
                  <p className="text-gray-900">
                    {user?.username || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={20} className="text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-gray-900">
                    {user?.email?.trim() || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={20} className="text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Phone Number
                  </p>
                  <p className="text-gray-900">
                    {user?.phone_no?.trim() || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Address</p>
                  <p className="text-gray-900">
                    {user?.address?.trim() || 'Not provided'}
                  </p>
                </div>
              </div>

              {user?.first_name?.trim() && (
                <div className="flex items-start gap-3">
                  <User size={20} className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      First Name
                    </p>
                    <p className="text-gray-900">{user.first_name}</p>
                  </div>
                </div>
              )}

              {user?.last_name?.trim() && (
                <div className="flex items-start gap-3">
                  <User size={20} className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Last Name
                    </p>
                    <p className="text-gray-900">{user.last_name}</p>
                  </div>
                </div>
              )}

              {user?.role && (
                <div className="flex items-start gap-3">
                  <User size={20} className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Role</p>
                    <p className="text-gray-900">{user.role}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Account ID
                  </p>
                  <p className="text-gray-500 text-sm font-mono">{user?.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/orders')}
            className="flex items-center justify-center gap-2 py-3"
          >
            View My Orders
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/cart')}
            className="flex items-center justify-center gap-2 py-3"
          >
            View Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
