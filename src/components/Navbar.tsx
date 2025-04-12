
import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary font-bold text-xl">IGDTUW Connect</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
                  Feed
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
                    Admin
                  </Link>
                )}
                <span className="text-muted-foreground text-sm">
                  Hi, {user.name}
                </span>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <Link 
                  to="/" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Feed
                </Link>
                {user.isAdmin && (
                  <Link 
                    to="/admin" 
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <div className="px-3 py-2 text-muted-foreground">
                  Hi, {user.name}
                </div>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
