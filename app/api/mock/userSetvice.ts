import axios from "axios";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthdate: string;
};

// GET users
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// GET users by ID
export const fetchPostById = async (id: string): Promise<User> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching users with ID ${id}:`, error);
    throw error;
  }
};

// ADD users
export const createUser = async (
  users: Omit<User, "id">
): Promise<User> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
      users
    );
    return response.data;
  } catch (error) {
    console.error("Error creating users:", error);
    throw error;
  }
};

// UPDATE users
export const updateUser = async (id: string, users: Partial<User>) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`,
      users,
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
        `Axios error updating users with ID ${id}:`,
        error.response?.data || error.message
      );
    } else {
      console.error(`Unexpected error updating users with ID ${id}:`, error);
    }
    throw new Error(
      `Failed to update users with ID ${id}. Please try again.`
    );
  }
};

// DELETE users
export const deleteUser = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`);
  } catch (error) {
    console.error(`Error deleting users with ID ${id}:`, error);
    throw error;
  }
};

// COUNT users
export const countUser = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`
    );

    if (Array.isArray(response.data.users)) {
      return response.data.users.length;
    } else {
      throw new Error("Unexpected response format");
    }

  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};