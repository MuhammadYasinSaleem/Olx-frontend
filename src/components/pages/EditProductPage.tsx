import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';

import { Button, Input } from '@components/atoms';
import {
  clearUpdateError,
  fetchProductById,
  fetchProducts,
  patchProduct,
  useAppDispatch,
  useAppSelector,
} from '@store';

import { useValidation } from '../../hooks/useValidation';

export const EditProductPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { user } = useAppSelector((state) => state.user);
  const { validateProductForm, validateImageFile } = useValidation();
  const { products, currentProduct, updatingProduct, updateError, loading } =
    useAppSelector((state) => state.products);

  const [formData, setFormData] = useState({
    product_name: '',
    quantity: '',
    description: '',
    price: '',
    category: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const productId = id ? parseInt(id) : null;

  const categories = useMemo(() => {
    const categoryMap = new Map();
    products.forEach((product) => {
      categoryMap.set(product.category, product.category_name);
    });
    return Array.from(categoryMap.entries()).sort((a, b) =>
      a[1].localeCompare(b[1]),
    );
  }, [products]);

  useEffect(() => {
    if (!user) {
      toast.error('Please sign in to edit products');
      navigate('/');
      return;
    }

    if (!productId) {
      toast.error('Invalid product ID');
      navigate('/my-products');
      return;
    }

    const loadProduct = async () => {
      try {
        await dispatch(fetchProductById(productId));

        if (products.length === 0) {
          await dispatch(fetchProducts());
        }
      } catch (_error) {
        toast.error('Failed to load product');
        navigate('/my-products');
      }
    };

    loadProduct();
    dispatch(clearUpdateError());
  }, [dispatch, navigate, user, productId, products.length]);

  useEffect(() => {
    if (currentProduct) {
      const canEdit =
        currentProduct.user_id === user?.id ||
        currentProduct.user_name === user?.username;

      if (!canEdit) {
        toast.error('You can only edit your own products');
        navigate('/my-products');
        return;
      }

      setFormData({
        product_name: currentProduct.product_name || '',
        quantity: currentProduct.quantity?.toString() || '',
        description: currentProduct.description || '',
        price: currentProduct.price || '',
        category: currentProduct.category?.toString() || '',
      });

      if (currentProduct.product_img_url) {
        setImagePreview(currentProduct.product_img_url);
      }
    }
  }, [currentProduct, user, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validationResult = validateImageFile(file);

      if (!validationResult.isValid) {
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(currentProduct?.product_img_url || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productId || !currentProduct) {
      toast.error('Product not found');
      return;
    }

    const validationResult = validateProductForm(formData);

    if (!validationResult.isValid) {
      return;
    }

    const productData = {
      product_name: formData.product_name.trim(),
      price: formData.price,
      category: parseInt(formData.category),
      ...(formData.quantity &&
        formData.quantity.trim() && { quantity: parseInt(formData.quantity) }),
      ...(formData.description &&
        formData.description.trim() && {
          description: formData.description.trim(),
        }),
      ...(imageFile && { product_img: imageFile }),
    };

    try {
      const result = await dispatch(
        patchProduct({ id: productId, productData }),
      );

      if (patchProduct.fulfilled.match(result)) {
        toast.success('Product updated successfully!');
        navigate('/my-products', {
          state: { refreshProducts: true },
          replace: true,
        });
      } else if (patchProduct.rejected.match(result)) {
        toast.error(result.payload?.message || 'Failed to update product');
      }
    } catch (_error) {
      toast.error('An unexpected error occurred');
    }
  };

  if (!user) {
    return null;
  }

  if (loading && !currentProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Product not found</p>
          <Button onClick={() => navigate('/my-products')} variant="primary">
            Back to My Products
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
            onClick={() => navigate('/my-products')}
            className="flex items-center gap-2 mb-4 text-sm"
          >
            <ArrowLeft size={16} />
            Back to My Products
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Edit Product</h1>
          <p className="text-gray-600 mt-2">Update your product information</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label
                htmlFor="product_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Product Name *
              </label>
              <Input
                id="product_name"
                name="product_name"
                type="text"
                value={formData.product_name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Price *
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Quantity
                </label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter quantity (optional)"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                required
              >
                <option value="">Select a category</option>
                {categories.map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your product (optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors resize-vertical"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <div className="space-y-4">
                {imagePreview && (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <Upload size={16} />
                    {imagePreview ? 'Change Image' : 'Upload Image'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <span className="text-sm text-gray-500">Max size: 5MB</span>
                </div>
              </div>
            </div>

            {updateError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{updateError.message}</p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                variant="primary"
                disabled={updatingProduct}
                className="flex items-center gap-2"
              >
                <Save size={16} />
                {updatingProduct ? 'Updating...' : 'Update Product'}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/my-products')}
                disabled={updatingProduct}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
