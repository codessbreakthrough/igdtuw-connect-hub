
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UsersRound, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { usePosts } from "@/contexts/PostContext";

// Mock data for community cards
const communitiesData = [
  {
    id: "cse-notes",
    name: "🌐 CSE Notes",
    description: "Share and access lecture notes, assignments, and study resources for Computer Science courses.",
    members: 235
  },
  {
    id: "campus-life",
    name: "🎉 Campus Life",
    description: "Discuss campus events, hostel life, cafeteria food, and share your college experiences.",
    members: 412
  },
  {
    id: "tech-events",
    name: "💻 Tech Events",
    description: "Stay updated on hackathons, workshops, and tech conferences happening on and off campus.",
    members: 178
  },
  {
    id: "illuminae-connect",
    name: "✨ Illuminae Connect",
    description: "The official community for Illuminae, the annual tech fest of the college.",
    members: 320
  }
];

const CreateCommunityForm = () => {
  const { user } = useAuth();
  const { createCommunity } = usePosts();
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    if (!user) {
      toast.error('You must be logged in to create a community');
      return;
    }

    if (!name.trim()) {
      toast.error('Please enter a community name');
      return;
    }

    if (!description.trim()) {
      toast.error('Please enter a community description');
      return;
    }

    try {
      setIsSubmitting(true);
      const community = await createCommunity(
        name.trim(), 
        description.trim(), 
        user.id
      );
      
      if (community) {
        // Reset form
        setName('');
        setDescription('');
        toast.success(`Community "${community.name}" created successfully!`);
      }
    } catch (error) {
      console.error('Error creating community:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="communityName">Community Name</Label>
        <Input
          id="communityName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Competitive Programming"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="communityDescription">Description</Label>
        <Textarea
          id="communityDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is this community about? Who is it for?"
          rows={3}
        />
      </div>
      <Button 
        onClick={handleSubmit} 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Creating...' : 'Create Community'}
      </Button>
    </div>
  );
};

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Welcome to IGDTUW Connect</h1>
      
      <div className="flex flex-wrap mb-10 gap-4">
        <Link to="/feed" className="flex-1 min-w-[250px]">
          <Button className="w-full h-12 text-lg">View All Posts</Button>
        </Link>
        
        {user && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1 min-w-[250px] h-12 text-lg bg-green-600 hover:bg-green-700 flex items-center gap-2">
                <PlusCircle size={20} />
                Create Community
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Community</DialogTitle>
                <DialogDescription>
                  Build a space for like-minded students to connect and share knowledge
                </DialogDescription>
              </DialogHeader>
              <CreateCommunityForm />
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Joinable Communities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {communitiesData.map((community) => (
            <Card key={community.id} className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{community.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 min-h-[80px]">
                  {community.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                  <UsersRound size={16} className="mr-1" />
                  {community.members} members
                </div>
                <Button size="sm">Join</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Popular Discussions</h2>
        <Card className="transition-all hover:shadow-md mb-4 cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">How to prepare for placement interviews?</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <CardDescription>
              Looking for tips and resources to prepare for upcoming placement interviews...
            </CardDescription>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Posted in 🌐 CSE Notes • 15 comments • 3 hours ago
          </CardFooter>
        </Card>
        
        <Card className="transition-all hover:shadow-md cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Illuminae 2023 Schedule</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <CardDescription>
              The schedule for Illuminae 2023 has been released! Check out the exciting events...
            </CardDescription>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Posted in ✨ Illuminae Connect • 8 comments • 1 day ago
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};

export default HomePage;
