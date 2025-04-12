
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const FooterNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      name: 'Home', 
      icon: Home, 
      path: '/' 
    },
    { 
      name: 'Communities', 
      icon: Users, 
      path: '/communities' 
    },
    { 
      name: 'Notifications', 
      icon: Bell, 
      path: '/notifications' 
    },
    { 
      name: 'Profile', 
      icon: User, 
      path: '/profile' 
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] border-t border-border z-10">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon size={20} className="mb-1" />
              <span className="text-xs">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default FooterNavigation;
