
import React, { useState } from 'react';
import { usePosts, PostTag } from "@/contexts/PostContext";
import { useAuth } from "@/contexts/AuthContext";
import PostCard from "@/components/PostCard";
import CreatePostForm from "@/components/CreatePostForm";
import AiSuggestions from "@/components/AiSuggestions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, SortAsc, SortDesc } from 'lucide-react';

const AVAILABLE_TAGS: { value: PostTag; label: string }[] = [
  { value: 'placements', label: 'Placements' },
  { value: 'academics', label: 'Academics' },
  { value: 'events', label: 'Events' },
  { value: 'general', label: 'General' },
  { value: 'announcements', label: 'Announcements' },
];

const Feed: React.FC = () => {
  const { posts, loading } = usePosts();
  const { user } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<PostTag[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleTagToggle = (tag: PostTag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  const filteredPosts = posts
    .filter(post => !post.isFlagged || (user?.isAdmin)) // Only show flagged posts to admins
    .filter(post => {
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(query) || 
          post.content.toLowerCase().includes(query) ||
          (post.userName && post.userName.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .filter(post => {
      // Filter by selected tags
      if (selectedTags.length === 0) return true;
      return post.tags.some(tag => selectedTags.includes(tag));
    })
    .sort((a, b) => {
      // Sort by upvotes
      if (sortDirection === 'desc') {
        return b.upvotes - a.upvotes;
      } else {
        return a.upvotes - b.upvotes;
      }
    });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CreatePostForm />
          
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="relative flex-1">
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="ml-2"
                onClick={toggleSortDirection}
                title={`Sort by upvotes (${sortDirection === 'desc' ? 'highest first' : 'lowest first'})`}
              >
                {sortDirection === 'desc' ? <SortDesc size={18} /> : <SortAsc size={18} />}
              </Button>
            </div>
            
            <div>
              <Label className="mb-2 block">Filter by tags</Label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_TAGS.map((tag) => (
                  <Badge 
                    key={tag.value}
                    variant={selectedTags.includes(tag.value) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleTagToggle(tag.value)}
                  >
                    {tag.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-8">Loading posts...</div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery || selectedTags.length > 0 
                ? "No posts match your filters. Try adjusting your search or filters."
                : "No posts yet. Be the first to create one!"}
            </div>
          ) : (
            filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
        
        <div className="space-y-6">
          <AiSuggestions />
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium mb-2">About IGDTUW Connect</h3>
            <p className="text-sm text-muted-foreground mb-4">
              A community platform exclusively for IGDTUW students to share knowledge, 
              ask questions, and connect with peers.
            </p>
            <h4 className="font-medium text-sm mb-1">Community Guidelines:</h4>
            <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
              <li>Be respectful and supportive</li>
              <li>Share valuable information</li>
              <li>Keep content relevant to IGDTUW</li>
              <li>Report inappropriate content</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
