
import React from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from 'lucide-react';

interface UserProfileHoverProps {
  userName: string;
  children: React.ReactNode;
}

const UserProfileHover: React.FC<UserProfileHoverProps> = ({ userName, children }) => {
  // For now, these are mock values
  const userKarma = Math.floor(Math.random() * 1000);
  const userRole = userName.includes('admin') 
    ? 'Administrator' 
    : userName.includes('coordinator') 
    ? 'Coordinator' 
    : 'Student';
  
  const recentPosts = [
    'How to ace technical interviews',
    'Resources for web development',
  ];
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-pointer text-primary">
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback>
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-semibold">{userName}</h4>
              <p className="text-xs text-muted-foreground">{userRole}</p>
            </div>
          </div>
          <div className="bg-muted px-2 py-1 rounded text-xs">
            Karma: {userKarma}
          </div>
        </div>
        
        <div className="mt-4">
          <h5 className="text-xs font-medium mb-2">Recent Posts</h5>
          <ul className="space-y-1">
            {recentPosts.map((post, index) => (
              <li key={index} className="text-xs truncate">{post}</li>
            ))}
          </ul>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserProfileHover;
