
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UsersRound } from "lucide-react";
import { Link } from "react-router-dom";

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

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Welcome to IGDTUW Connect</h1>
      
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

      <Link to="/feed">
        <Button className="w-full">View All Posts</Button>
      </Link>
    </div>
  );
};

export default HomePage;
