
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
import { PostTag, usePosts } from "@/contexts/PostContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const AVAILABLE_TAGS: { value: PostTag; label: string }[] = [
  { value: 'placements', label: 'Placements' },
  { value: 'academics', label: 'Academics' },
  { value: 'events', label: 'Events' },
  { value: 'general', label: 'General' },
  { value: 'announcements', label: 'Announcements' },
];

const CreatePostForm: React.FC = () => {
  const { user } = useAuth();
  const { createPost } = usePosts();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<PostTag[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      toast.error('Please select at least one tag');
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
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Create a New Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="What's on your mind?"
              maxLength={100}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea 
              id="content" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder="Share your thoughts, questions, or information..."
              rows={5}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map((tag) => (
                <Button 
                  key={tag.value}
                  type="button"
                  variant={selectedTags.includes(tag.value) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTagToggle(tag.value)}
                >
                  {tag.label}
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
            {isSubmitting ? 'Posting...' : 'Post'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
