
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

export type PostTag = 'placements' | 'academics' | 'events' | 'general' | 'announcements';

export interface Post {
  id: string;
  title: string;
  content: string;
  tags: PostTag[];
  timestamp: string;
  upvotes: number;
  userId: string;
  userName: string | null; // null when anonymous
  isAnonymous: boolean;
  isFlagged: boolean;
  userUpvoted?: boolean; // To track if current user has upvoted
}

interface PostContextType {
  posts: Post[];
  loading: boolean;
  createPost: (post: Omit<Post, 'id' | 'timestamp' | 'upvotes' | 'isFlagged'>) => Promise<void>;
  upvotePost: (postId: string) => Promise<void>;
  flagPost: (postId: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load posts from localStorage on mount
    const loadPosts = async () => {
      try {
        const storedPosts = localStorage.getItem('posts');
        if (storedPosts) {
          setPosts(JSON.parse(storedPosts));
        } else {
          // If no posts exist, add mock data for demonstration
          const initialPosts: Post[] = [
            {
              id: 'post1',
              title: 'Welcome to IGDTUW Connect Hub!',
              content: 'This is a community platform for IGDTUW students to connect, share information, and help each other.',
              tags: ['announcements'],
              timestamp: new Date().toISOString(),
              upvotes: 15,
              userId: 'admin',
              userName: 'Admin',
              isAnonymous: false,
              isFlagged: false,
            },
            {
              id: 'post2',
              title: 'Upcoming Placement Drive',
              content: 'Google is visiting campus next week. Prepare your resumes and algorithms!',
              tags: ['placements'],
              timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
              upvotes: 25,
              userId: 'user123',
              userName: 'placement_coordinator',
              isAnonymous: false,
              isFlagged: false,
            },
            {
              id: 'post3',
              title: 'How difficult is the Data Structures course?',
              content: 'I\'m finding the assignments challenging. Any tips from seniors?',
              tags: ['academics'],
              timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
              upvotes: 5,
              userId: 'anonymous',
              userName: null,
              isAnonymous: true,
              isFlagged: false,
            },
          ];
          setPosts(initialPosts);
          localStorage.setItem('posts', JSON.stringify(initialPosts));
        }
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    // Save posts to localStorage whenever they change
    if (!loading) {
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  }, [posts, loading]);

  const createPost = async (postData: Omit<Post, 'id' | 'timestamp' | 'upvotes' | 'isFlagged'>) => {
    try {
      const newPost: Post = {
        ...postData,
        id: `post_${Date.now()}`,
        timestamp: new Date().toISOString(),
        upvotes: 0,
        isFlagged: false,
      };

      setPosts(prevPosts => [newPost, ...prevPosts]);
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post. Please try again.');
    }
  };

  const upvotePost = async (postId: string) => {
    try {
      setPosts(prevPosts => 
        prevPosts.map(post => {
          if (post.id === postId) {
            // Toggle upvote
            if (post.userUpvoted) {
              return { ...post, upvotes: post.upvotes - 1, userUpvoted: false };
            } else {
              return { ...post, upvotes: post.upvotes + 1, userUpvoted: true };
            }
          }
          return post;
        })
      );
    } catch (error) {
      console.error('Error upvoting post:', error);
      toast.error('Failed to upvote. Please try again.');
    }
  };

  const flagPost = async (postId: string) => {
    try {
      setPosts(prevPosts => 
        prevPosts.map(post => {
          if (post.id === postId) {
            return { ...post, isFlagged: true };
          }
          return post;
        })
      );
      toast.success('Post has been flagged for review.');
    } catch (error) {
      console.error('Error flagging post:', error);
      toast.error('Failed to flag post. Please try again.');
    }
  };

  const deletePost = async (postId: string) => {
    try {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      toast.success('Post deleted successfully.');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post. Please try again.');
    }
  };

  return (
    <PostContext.Provider value={{ posts, loading, createPost, upvotePost, flagPost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};
