
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Award, Settings, LogOut } from 'lucide-react';
import { useAuth } from "@/contexts/AuthContext";

// Mock data for user posts
const userPosts = [
  {
    id: 1,
    title: "How to prepare for placement interviews?",
    community: "CSE Notes",
    upvotes: 24,
    comments: 8,
    time: "2 days ago" 
  },
  {
    id: 2,
    title: "Looking for study partners for ML course",
    community: "Campus Life",
    upvotes: 15,
    comments: 5,
    time: "1 week ago"
  }
];

// Mock data for user comments
const userComments = [
  {
    id: 1,
    content: "I found GeeksforGeeks and Leetcode to be really helpful for DSA preparation.",
    post: "How to prepare for placement interviews?",
    community: "CSE Notes",
    upvotes: 12,
    time: "1 day ago"
  },
  {
    id: 2,
    content: "The hackathon registration link isn't working for me. Is anyone else facing this issue?",
    post: "Upcoming Hackathon Details",
    community: "Tech Events",
    upvotes: 3,
    time: "3 days ago"
  },
  {
    id: 3,
    content: "I'm interested! Please DM me the details.",
    post: "Looking for study partners for ML course",
    community: "Campus Life",
    upvotes: 2,
    time: "1 week ago"
  }
];

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("posts");
  
  // Mock karma data
  const karmaData = {
    total: 156,
    breakdown: {
      posts: 56,
      comments: 42,
      upvotes: 58
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
      <Card className="mb-6">
        <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-2xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">@{user.name.toLowerCase().replace(/\s+/g, '_')}</p>
            <div className="flex items-center mt-2 text-sm">
              <div className="flex items-center mr-4">
                <Award size={16} className="mr-1 text-primary" />
                <span>{karmaData.total} Karma</span>
              </div>
              {user.isAdmin && (
                <div className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                  Administrator
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Button variant="outline" className="flex items-center gap-1">
              <Settings size={16} />
              <span>Settings</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-1 text-destructive" onClick={logout}>
              <LogOut size={16} />
              <span>Logout</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="posts" className="flex items-center gap-1">
            <MessageSquare size={16} />
            <span>My Posts</span>
          </TabsTrigger>
          <TabsTrigger value="comments" className="flex items-center gap-1">
            <ThumbsUp size={16} />
            <span>My Comments</span>
          </TabsTrigger>
          <TabsTrigger value="karma" className="flex items-center gap-1">
            <Award size={16} />
            <span>Karma</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="space-y-4">
          {userPosts.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">You haven't created any posts yet.</p>
                <Button className="mt-4">Create Your First Post</Button>
              </CardContent>
            </Card>
          ) : (
            userPosts.map(post => (
              <Card key={post.id} className="hover:shadow-sm cursor-pointer">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">{post.title}</CardTitle>
                  <CardDescription>Posted in {post.community} • {post.time}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ThumbsUp size={14} className="mr-1" />
                    <span className="mr-3">{post.upvotes} upvotes</span>
                    <MessageSquare size={14} className="mr-1" />
                    <span>{post.comments} comments</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="comments" className="space-y-4">
          {userComments.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">You haven't commented on any posts yet.</p>
                <Button className="mt-4">Browse Posts</Button>
              </CardContent>
            </Card>
          ) : (
            userComments.map(comment => (
              <Card key={comment.id} className="hover:shadow-sm">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">{comment.post}</CardTitle>
                  <CardDescription>In {comment.community} • {comment.time}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm mb-2">{comment.content}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ThumbsUp size={14} className="mr-1" />
                    <span>{comment.upvotes} upvotes</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="karma">
          <Card>
            <CardHeader>
              <CardTitle>Karma Points</CardTitle>
              <CardDescription>Your contribution score on IGDTUW Connect</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-6">{karmaData.total} points</div>
              
              <h3 className="font-medium mb-2">Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                  <span>Posts created</span>
                  <span className="font-medium">{karmaData.breakdown.posts} points</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                  <span>Comments made</span>
                  <span className="font-medium">{karmaData.breakdown.comments} points</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                  <span>Upvotes received</span>
                  <span className="font-medium">{karmaData.breakdown.upvotes} points</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
