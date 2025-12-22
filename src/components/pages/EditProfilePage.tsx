import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User } from 'lucide-react';

import { Button, Input } from '@components/atoms';
import type * as Types from '@types';
import {
  fetchUserProfile,
  patchUserProfile,
  useAppDispatch,
  useAppSelector,
} from '@store';

export const EditProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState<Types.UserProfileUpdateRequest>({
    email: '',
    first_name: '',
    last_name: '',
    phone_no: '',
    address: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        const result = await dispatch(fetchUserProfile());
        if (fetchUserProfile.rejected.match(result)) {
          toast.error(result.payload?.message || 'Failed to load profile');
          if (
            result.payload?.status === 403 ||
            result.payload?.status === 401
          ) {
            navigate('/signin');
          }
        }
      }
    };

    loadProfile();
  }, [dispatch, navigate, user]);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone_no: user.phone_no || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    const payload: Types.PatchedUserProfileUpdateRequest = {};

    if (formData.email && formData.email !== user?.email) {
      payload.email = formData.email;
    }
    if (formData.first_name && formData.first_name !== user?.first_name) {
      payload.first_name = formData.first_name;
    }
    if (formData.last_name && formData.last_name !== user?.last_name) {
      payload.last_name = formData.last_name;
    }
    if (formData.phone_no && formData.phone_no !== user?.phone_no) {
      payload.phone_no = formData.phone_no;
    }
    if (formData.address && formData.address !== user?.address) {
      payload.address = formData.address;
    }

    if (Object.keys(payload).length === 0) {
      toast.error('No changes to save');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await dispatch(patchUserProfile(payload));

      if (patchUserProfile.fulfilled.match(result)) {
        toast.success('Profile updated successfully!');
        navigate('/profile');
      } else if (patchUserProfile.rejected.match(result)) {
        toast.error(result.payload?.message || 'Failed to update profile');
      }
    } catch (_err) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user && !loading) {
    navigate('/signin');
    return null;
  }

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error.message}</p>
          <Button onClick={() => navigate('/profile')} variant="primary">
            Back to Profile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 mb-4 text-sm"
          >
            <ArrowLeft size={16} />
            Back to Profile
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Edit Profile</h1>
          <p className="text-gray-600 mt-2">Update your account information</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="bg-linear-to-r from-blue-500 to-cyan-500 px-6 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <User size={24} className="text-blue-500" />
              </div>
              <div className="text-white">
                <h2 className="text-xl font-bold">
                  {user?.first_name?.trim() || user?.last_name?.trim()
                    ? `${user.first_name?.trim() || ''} ${user.last_name?.trim() || ''}`.trim()
                    : user?.username || 'User'}
                </h2>
                <p className="text-blue-100">@{user?.username}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name
                </label>
                <Input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <Input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="phone_no"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <Input
                type="tel"
                id="phone_no"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Address
              </label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                <Save size={16} />
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/profile')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Note: Username and password cannot be changed after account creation
          </p>
        </div>
      </div>
    </div>
  );
};
