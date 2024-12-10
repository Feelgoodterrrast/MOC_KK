import axios from "axios";

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tag: [];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: [
    {
      rating: number;
      comment: string;
      date: string;
      reviewerName: string;
      reviewerEmail: string;
    }
  ];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: [];
  thumbnail: string;
};

// GET product
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
    );
    // console.log('response.data.products', response.data.products)
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// GET product by ID
export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// ADD product
export const createProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/product`,
      product
    );
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// UPDATE product
export const updateProduct = async (id: string, product: Partial<Product>) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
      product,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`Update response:`, response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Axios error updating product with ID ${id}:`,
        error.response?.data || error.message
      );
    } else {
      console.error(`Unexpected error updating product with ID ${id}:`, error);
    }
    throw new Error(
      `Failed to update product with ID ${id}. Please try again.`
    );
  }
};

// DELETE product
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${id}`);
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};
