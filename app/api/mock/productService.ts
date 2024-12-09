import axios from "axios";

export type Product = {
  id: string;
  name: string;
  price: string;
  desc: string;
  adj: string;
  material: string;
  product: string;
  image: string;
};

// GET product
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Product`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// GET product by ID
export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Product/${id}`);
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
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Product`, product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// UPDATE product
export const updateProduct = async (
  id: string,
  product: Partial<Product>
): Promise<Product> => {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Product/${id}`, product);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};

// DELETE product
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Product/${id}`);
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};
