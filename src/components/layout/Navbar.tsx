
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Dumbbell, User, Bell, LogOut } from "lucide-react";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Dumbbell className="h-7 w-7 text-fitness-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-fitness-primary to-fitness-accent bg-clip-text text-transparent">
              FitWise AI Studio
            </span>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="outline" className="border-fitness-primary text-fitness-primary">
                    Admin Panel
                  </Button>
                </Link>
              )}
              <Link to="/dashboard">
                <Button variant="outline" className="border-fitness-primary text-fitness-primary">
                  Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-gray-600 cursor-pointer hover:text-fitness-primary" />
                <User className="h-7 w-7 p-1 bg-fitness-light rounded-full text-fitness-primary cursor-pointer" />
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={logout}
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5 text-gray-600 hover:text-fitness-primary" />
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <Link to="/">
                <Button className="bg-gradient-fitness">Login</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
