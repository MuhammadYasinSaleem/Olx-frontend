import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';

import { Button, Input } from '@components/atoms';
import {
  clearCreateError,
  createProduct,
  fetchProducts,
  useAppDispatch,
  useAppSelector,
} from '@store';

export const CreateProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { products, creatingProduct, createError } = useAppSelector(
    (state) => state.products,
  );

  const [formData, setFormData] = useState({
    product_name: '',
    quantity: '',
    description: '',
    price: '',
    category: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
      toast.error('Please sign in to create a product');
      navigate('/auth');
      return;
    }

    if (products.length === 0) {
      dispatch(fetchProducts());
    }

    dispatch(clearCreateError());
  }, [dispatch, navigate, user, products.length]);

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
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
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
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.product_name.trim()) {
      toast.error('Product name is required');
      return;
    }

    if (!formData.price.trim()) {
      toast.error('Price is required');
      return;
    }

    if (!formData.category) {
      toast.error('Category is required');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    let quantity: number | undefined;
    if (formData.quantity.trim()) {
      quantity = parseInt(formData.quantity);
      if (isNaN(quantity) || quantity < 0) {
        toast.error('Please enter a valid quantity');
        return;
      }
    }

    const productData = {
      product_name: formData.product_name.trim(),
      price: formData.price,
      category: parseInt(formData.category),
      ...(quantity !== undefined && { quantity }),
      ...(formData.description.trim() && {
        description: formData.description.trim(),
      }),
      ...(imageFile && { product_img: imageFile }),
    };

    try {
      const result = await dispatch(createProduct(productData));

      if (createProduct.fulfilled.match(result)) {
        toast.success('Product created successfully!');
        navigate('/products');
      } else if (createProduct.rejected.match(result)) {
        toast.error(result.payload?.message || 'Failed to create product');
      }
    } catch (_error) {
      toast.error('An unexpected error occurred');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-4 text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Create Product</h1>
          <p className="text-gray-600 mt-2">List a new product for sale</p>
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
                  placeholder="Available stock (optional)"
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
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              >
                <option value="">Select a category</option>
                {categories.map(([categoryId, categoryName]) => (
                  <option key={categoryId} value={categoryId}>
                    {categoryName}
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

              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-cyan-500 transition-colors">
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">
                    Click to upload product image
                  </p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {createError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{createError.message}</p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={creatingProduct}
                disabled={creatingProduct}
                className="flex-1"
              >
                {creatingProduct ? 'Creating...' : 'Create Product'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
