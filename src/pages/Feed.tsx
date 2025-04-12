
import React, { useState, useEffect } from 'react';
import { usePosts } from "@/contexts/PostContext";
import { useAuth } from "@/contexts/AuthContext";
import PostCard from "@/components/PostCard";
import CreatePostForm from "@/components/CreatePostForm";
import AiSuggestions from "@/components/AiSuggestions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  SortAsc, 
  SortDesc, 
  Clock, 
  TrendingUp,
  CalendarClock,
  PenSquare 
} from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PostDetail from '@/components/PostDetail';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Feed: React.FC = () => {
  const { posts, communities, loading } = usePosts();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [communityQuery, setCommunityQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortType, setSortType] = useState<'upvotes' | 'newest' | 'trending'>('upvotes');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPostDetailOpen, setIsPostDetailOpen] = useState(false);

  // Check for post ID in URL params
  useEffect(() => {
    const postId = searchParams.get('post');
    if (postId) {
      const post = posts.find(p => p.id === postId);
      if (post) {
        setSelectedPost(post);
        setIsPostDetailOpen(true);
      }
    }
  }, [searchParams, posts]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  const handleSortChange = (value: string) => {
    setSortType(value as 'upvotes' | 'newest' | 'trending');
  };

  const filteredCommunities = communities.filter(community => 
    community.name.toLowerCase().includes(communityQuery.toLowerCase())
  );

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
      // Filter by selected communities
      if (selectedTags.length === 0) return true;
      return post.tags.some(tag => selectedTags.includes(tag));
    })
    .sort((a, b) => {
      // Sort based on selected criteria
      if (sortType === 'upvotes') {
        return sortDirection === 'desc' 
          ? b.upvotes - a.upvotes 
          : a.upvotes - b.upvotes;
      } else if (sortType === 'newest') {
        return sortDirection === 'desc'
          ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          : new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      } else if (sortType === 'trending') {
        // Simple trending algorithm: upvotes ÷ age in hours
        const hoursA = (Date.now() - new Date(a.timestamp).getTime()) / (1000 * 60 * 60);
        const hoursB = (Date.now() - new Date(b.timestamp).getTime()) / (1000 * 60 * 60);
        const scoreA = a.upvotes / (hoursA || 1);
        const scoreB = b.upvotes / (hoursB || 1);
        return sortDirection === 'desc' ? scoreB - scoreA : scoreA - scoreB;
      }
      return 0;
    });

  // Sample AI suggestion data
  const similarPosts = [
    { id: 'similar1', title: 'How to prepare for Google SDE interview?' },
    { id: 'similar2', title: 'DSA prep strategies for placements' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Mobile Ask Question Button - only visible on small screens */}
      <div className="md:hidden mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full flex items-center justify-center gap-2">
              <PenSquare size={16} />
              Ask a Question
            </Button>
          </DialogTrigger>
          <DialogContent>
            <CreatePostForm onSuccess={() => navigate('/feed')} showCard={false} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CreatePostForm />
          
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
              <div className="relative flex-1 w-full">
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select defaultValue="upvotes" onValueChange={handleSortChange}>
                  <SelectTrigger className="w-full sm:w-[120px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upvotes">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={14} />
                        <span>Top</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="newest">
                      <div className="flex items-center gap-2">
                        <CalendarClock size={14} />
                        <span>New</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="trending">
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>Trending</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleSortDirection}
                  title={`Sort ${sortDirection === 'desc' ? 'highest first' : 'lowest first'}`}
                >
                  {sortDirection === 'desc' ? <SortDesc size={18} /> : <SortAsc size={18} />}
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                <Label className="text-base">Filter by communities</Label>
                <div className="relative">
                  <Input
                    placeholder="Search communities..."
                    value={communityQuery}
                    onChange={(e) => setCommunityQuery(e.target.value)}
                    className="w-full sm:w-60 pl-8"
                  />
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {filteredCommunities.map((community) => (
                  <Badge 
                    key={community.id}
                    variant={selectedTags.includes(community.name) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleTagToggle(community.name)}
                  >
                    {community.name}
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
          <div className="space-y-4">
            <AiSuggestions />
            
            {/* Similar Posts UI */}
            <div className="bg-muted/50 rounded-lg p-4 border">
              <h3 className="font-medium mb-3 text-sm flex items-center gap-2">
                <Search size={14} />
                Similar Questions
              </h3>
              <ul className="space-y-2">
                {similarPosts.map(post => (
                  <li key={post.id} className="text-sm">
                    <Button 
                      variant="link" 
                      className="p-0 h-auto font-normal justify-start text-left"
                      onClick={() => alert(`View similar post: ${post.title}`)}
                    >
                      {post.title}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
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
          
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium mb-2">Communities</h3>
            <div className="space-y-2">
              {communities.slice(0, 5).map(community => (
                <div key={community.id} className="text-sm">
                  <div className="font-medium">{community.name}</div>
                  <div className="text-xs text-muted-foreground">{community.description}</div>
                </div>
              ))}
              {communities.length > 5 && (
                <Button variant="link" className="p-0 h-auto text-xs">
                  View all communities ({communities.length})
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {selectedPost && (
        <PostDetail 
          post={selectedPost} 
          isOpen={isPostDetailOpen} 
          onClose={() => {
            setIsPostDetailOpen(false);
            // Remove the post parameter from URL
            searchParams.delete('post');
            setSearchParams(searchParams);
          }} 
        />
      )}
    </div>
  );
};

export default Feed;
