
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts } from '@/contexts/PostContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostCard from '@/components/PostCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, ShieldAlert } from 'lucide-react';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const { posts } = usePosts();
  const [searchQuery, setSearchQuery] = useState('');

  // If not logged in or not an admin, redirect to home
  if (!user || !user.isAdmin) {
    return <Navigate to="/" />;
  }

  const flaggedPosts = posts.filter(post => post.isFlagged);
  const allPosts = posts;

  const filteredFlaggedPosts = flaggedPosts.filter(post => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) || 
      post.content.toLowerCase().includes(query) ||
      (post.userName && post.userName.toLowerCase().includes(query))
    );
  });

  const filteredAllPosts = allPosts.filter(post => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) || 
      post.content.toLowerCase().includes(query) ||
      (post.userName && post.userName.toLowerCase().includes(query))
    );
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <ShieldAlert className="mr-2" />
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage posts and moderate content
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <Tabs defaultValue="flagged">
        <TabsList className="mb-4">
          <TabsTrigger value="flagged" className="relative">
            Flagged Posts
            {flaggedPosts.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {flaggedPosts.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="all">All Posts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="flagged">
          {filteredFlaggedPosts.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? "No flagged posts match your search." 
                    : "No flagged posts at the moment."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredFlaggedPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="all">
          {filteredAllPosts.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">
                  No posts match your search.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredAllPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
