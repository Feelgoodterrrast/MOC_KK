import axios from "axios";

export type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number
  };
  views: number;
  userId: number;
};

// GET post
export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`
    );
    return response.data.posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// GET post by ID
export const fetchPostById = async (id: string): Promise<Post> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw error;
  }
};

// ADD post
export const createPost = async (
  post: Omit<Post, "id">
): Promise<Post> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/post`,
      post
    );
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// UPDATE post
export const updatePost = async (id: string, post: Partial<Post>) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}`,
      post,
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
        `Axios error updating post with ID ${id}:`,
        error.response?.data || error.message
      );
    } else {
      console.error(`Unexpected error updating post with ID ${id}:`, error);
    }
    throw new Error(
      `Failed to update post with ID ${id}. Please try again.`
    );
  }
};

// DELETE post
export const deletePost = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${id}`);
  } catch (error) {
    console.error(`Error deleting post with ID ${id}:`, error);
    throw error;
  }
};

// COUNT post
export const countPost = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`
    );

    if (Array.isArray(response.data.posts)) {
      return response.data.posts.length;
    } else {
      throw new Error("Unexpected response format");
    }

  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};