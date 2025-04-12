
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { usePosts, Post, PostTag } from "@/contexts/PostContext";
import { User, Flag, ArrowBigUp, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useAuth();
  const { upvotePost, flagPost, deletePost } = usePosts();

  const getTagColor = (tag: PostTag) => {
    switch(tag) {
      case 'placements': return 'bg-emerald-100 text-emerald-800';
      case 'academics': return 'bg-blue-100 text-blue-800';
      case 'events': return 'bg-purple-100 text-purple-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      case 'announcements': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpvote = () => {
    if (user) {
      upvotePost(post.id);
    }
  };

  const handleFlag = () => {
    if (user) {
      flagPost(post.id);
    }
  };

  const handleDelete = () => {
    if (user?.isAdmin) {
      deletePost(post.id);
    }
  };

  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });

  return (
    <Card className={`mb-4 ${post.isAnonymous ? 'anonymous-post' : 'public-post'} ${post.isFlagged ? 'border-red-500 bg-red-50' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{post.title}</CardTitle>
          {post.isAnonymous ? (
            <div className="flex items-center text-muted-foreground text-sm">
              <User size={16} className="mr-1" />
              Anonymous
            </div>
          ) : (
            <div className="flex items-center text-primary text-sm">
              <User size={16} className="mr-1" />
              {post.userName}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className={getTagColor(tag)}>
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="text-sm text-muted-foreground">
          {timeAgo}
        </div>
        <div className="flex items-center space-x-2">
          {user?.isAdmin && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleDelete}
              title="Delete post"
            >
              <Trash2 size={18} className="text-destructive" />
            </Button>
          )}
          {user && !post.isFlagged && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleFlag}
              title="Flag post"
            >
              <Flag size={18} />
            </Button>
          )}
          <Button 
            variant={post.userUpvoted ? "default" : "outline"} 
            size="sm" 
            onClick={handleUpvote}
            disabled={!user}
            className="gap-1"
          >
            <ArrowBigUp size={18} />
            <span>{post.upvotes}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
