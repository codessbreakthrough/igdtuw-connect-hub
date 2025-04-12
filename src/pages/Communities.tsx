
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UsersRound, Search } from "lucide-react";

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
  },
  {
    id: "placement-prep",
    name: "🚀 Placement Prep",
    description: "Discussion forum for placement preparation, interview experiences, and company specifics.",
    members: 290
  },
  {
    id: "coding-challenges",
    name: "💻 Coding Challenges",
    description: "Daily coding problems, contest discussions, and algorithmic challenges.",
    members: 165
  },
  {
    id: "research-hub",
    name: "🔬 Research Hub",
    description: "For students interested in research papers, projects and academic opportunities.",
    members: 120
  },
  {
    id: "alumni-network",
    name: "👨‍🎓 Alumni Network",
    description: "Connect with college alumni for mentorship, guidance and networking.",
    members: 210
  }
];

const Communities = () => {
  return (
    <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
      <h1 className="text-2xl font-bold mb-6">Communities</h1>
      
      <div className="relative w-full max-w-md mx-auto mb-8">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search communities..." className="pl-10" />
      </div>
      
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
    </div>
  );
};

export default Communities;
