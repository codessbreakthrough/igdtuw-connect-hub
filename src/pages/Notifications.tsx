
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp, Flag, Bell } from 'lucide-react';

// Mock data for notifications
const notificationsData = [
  {
    id: 1,
    type: 'reply',
    message: 'Your question in "Campus Life" got a reply',
    time: '5 minutes ago',
    read: false,
    icon: MessageCircle
  },
  {
    id: 2,
    type: 'comment',
    message: 'New comment on your post in "CSE Notes"',
    time: '2 hours ago',
    read: false,
    icon: MessageCircle
  },
  {
    id: 3,
    type: 'upvote',
    message: 'Your answer was upvoted by sarahk',
    time: '1 day ago',
    read: true,
    icon: ThumbsUp
  },
  {
    id: 4,
    type: 'flag',
    message: 'Your post in "Tech Events" was flagged',
    time: '2 days ago',
    read: true,
    icon: Flag
  },
  {
    id: 5,
    type: 'reply',
    message: 'prof_singh replied to your comment',
    time: '3 days ago',
    read: true,
    icon: MessageCircle
  },
  {
    id: 6,
    type: 'system',
    message: 'Welcome to IGDTUW Connect! Complete your profile to get started.',
    time: '1 week ago',
    read: true,
    icon: Bell
  }
];

const Notifications = () => {
  return (
    <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Button variant="ghost" size="sm">Mark all as read</Button>
      </div>
      
      <div className="space-y-3 max-w-2xl mx-auto">
        {notificationsData.map((notification) => (
          <Card 
            key={notification.id} 
            className={`transition-all hover:shadow-sm cursor-pointer ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
          >
            <CardContent className="p-4 flex items-start gap-3">
              <div className={`p-2 rounded-full ${!notification.read ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                <notification.icon size={18} />
              </div>
              <div className="flex-1">
                <p className={`${!notification.read ? 'font-medium' : ''}`}>{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
              </div>
              {!notification.read && (
                <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
