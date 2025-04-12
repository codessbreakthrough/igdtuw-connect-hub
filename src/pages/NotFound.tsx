
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-6">Oops! Page not found</p>
      <p className="text-center text-muted-foreground max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
