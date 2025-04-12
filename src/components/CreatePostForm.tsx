
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { PostTag, usePosts } from "@/contexts/PostContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

interface CreatePostFormProps {
  onSuccess?: () => void;
  showCard?: boolean;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ 
  onSuccess,
  showCard = true
}) => {
  const { user } = useAuth();
  const { createPost, communities, createCommunity } = usePosts();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<PostTag[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [newCommunityName, setNewCommunityName] = useState('');
  const [newCommunityDescription, setNewCommunityDescription] = useState('');
  const [creatingCommunity, setCreatingCommunity] = useState(false);

  const handleTagToggle = (tag: PostTag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    
    if (!content.trim()) {
      toast.error('Please enter content');
      return;
    }
    
    if (selectedTags.length === 0) {
      toast.error('Please select at least one community');
      return;
    }

    if (!user) {
      toast.error('You must be logged in to create a post');
      return;
    }

    try {
      setIsSubmitting(true);
      
      await createPost({
        title,
        content,
        tags: selectedTags,
        userId: user.id,
        userName: isAnonymous ? null : user.name,
        isAnonymous,
      });
      
      // Reset form
      setTitle('');
      setContent('');
      setSelectedTags([]);
      setIsAnonymous(false);
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateCommunity = async () => {
    if (!user) {
      toast.error('You must be logged in to create a community');
      return;
    }

    if (!newCommunityName.trim()) {
      toast.error('Please enter a community name');
      return;
    }

    if (!newCommunityDescription.trim()) {
      toast.error('Please enter a community description');
      return;
    }

    try {
      setCreatingCommunity(true);
      const community = await createCommunity(
        newCommunityName.trim(), 
        newCommunityDescription.trim(), 
        user.id
      );
      
      if (community) {
        // Add the new community to selected tags
        setSelectedTags(prev => [...prev, community.name]);
        // Reset form
        setNewCommunityName('');
        setNewCommunityDescription('');
      }
    } finally {
      setCreatingCommunity(false);
    }
  };

  if (!user) {
    return null;
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="What's your question or topic?"
          maxLength={100}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea 
          id="content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Provide details about your question or share information..."
          rows={5}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Communities</Label>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <PlusCircle size={16} />
                <span>New Community</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Community</DialogTitle>
                <DialogDescription>
                  Create a new community for a specific topic or interest
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="communityName">Community Name</Label>
                  <Input
                    id="communityName"
                    value={newCommunityName}
                    onChange={(e) => setNewCommunityName(e.target.value)}
                    placeholder="e.g., Competitive Programming"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="communityDescription">Description</Label>
                  <Textarea
                    id="communityDescription"
                    value={newCommunityDescription}
                    onChange={(e) => setNewCommunityDescription(e.target.value)}
                    placeholder="Briefly describe what this community is about..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  onClick={handleCreateCommunity} 
                  disabled={creatingCommunity}
                >
                  {creatingCommunity ? 'Creating...' : 'Create Community'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-wrap gap-2">
          {communities.map((community) => (
            <Button 
              key={community.id}
              type="button"
              variant={selectedTags.includes(community.name) ? "default" : "outline"}
              size="sm"
              onClick={() => handleTagToggle(community.name)}
            >
              {community.name}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="anonymous" 
          checked={isAnonymous} 
          onCheckedChange={() => setIsAnonymous(!isAnonymous)} 
        />
        <Label htmlFor="anonymous" className="cursor-pointer">Post anonymously</Label>
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Posting...' : 'Post Question'}
      </Button>
    </form>
  );

  if (!showCard) {
    return formContent;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Ask a Question</CardTitle>
      </CardHeader>
      <CardContent>
        {formContent}
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
