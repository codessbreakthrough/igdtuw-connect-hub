
import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Post, usePosts } from '@/contexts/PostContext';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { ArrowBigUp, Flag, MessageSquare, Share2, User } from 'lucide-react';

interface PostDetailProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

interface Comment {
  id: string;
  content: string;
  userId: string;
  userName: string | null;
  timestamp: string;
  isAnonymous: boolean;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, isOpen, onClose }) => {
  const { user } = useAuth();
  const { upvotePost, flagPost } = usePosts();
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  if (!post) return null;

  const getTagColor = (tag: string) => {
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
      toast.success('Post has been flagged for review');
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/?post=${post.id}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard');
  };

  const handleAddComment = () => {
    if (!comment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    if (!user) {
      toast.error('You must be logged in to comment');
      return;
    }

    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      content: comment,
      userId: user.id,
      userName: isAnonymous ? null : user.name,
      timestamp: new Date().toISOString(),
      isAnonymous
    };

    setComments([...comments, newComment]);
    setComment('');
    toast.success('Comment added');
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PPP p');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{post.title}</DialogTitle>
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
            <div className="flex items-center">
              {post.isAnonymous ? (
                <div className="flex items-center">
                  <User size={16} className="mr-1" />
                  <span>Anonymous</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Avatar className="h-5 w-5 mr-1">
                    <AvatarFallback className="text-xs">{post.userName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-primary">{post.userName}</span>
                </div>
              )}
              <span className="mx-2">•</span>
              <span>{formatDate(post.timestamp)}</span>
            </div>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className={getTagColor(tag)}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </DialogHeader>
        
        <div className="my-4">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>
        
        <div className="flex justify-between items-center border-t border-b py-3 my-4">
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
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 size={16} className="mr-1" />
              Share
            </Button>
            
            {user && !post.isFlagged && (
              <Button variant="outline" size="sm" onClick={handleFlag}>
                <Flag size={16} className="mr-1" />
                Flag
              </Button>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <MessageSquare size={18} />
            Comments
          </h3>
          
          {comments.length === 0 ? (
            <p className="text-muted-foreground text-sm">No comments yet. Be the first to comment!</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="p-3 bg-muted rounded-md">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center text-sm">
                      {comment.isAnonymous ? (
                        <div className="flex items-center text-muted-foreground">
                          <User size={14} className="mr-1" />
                          Anonymous
                        </div>
                      ) : (
                        <div className="flex items-center text-primary">
                          <Avatar className="h-5 w-5 mr-1">
                            <AvatarFallback className="text-xs">{comment.userName?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {comment.userName}
                        </div>
                      )}
                      <span className="mx-2 text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{formatDate(comment.timestamp)}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
          
          {user && (
            <div className="space-y-2">
              <Input
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="commentAnonymous" 
                    checked={isAnonymous}
                    onCheckedChange={() => setIsAnonymous(!isAnonymous)}
                  />
                  <Label htmlFor="commentAnonymous">Comment anonymously</Label>
                </div>
                
                <Button onClick={handleAddComment}>
                  Add Comment
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetail;
