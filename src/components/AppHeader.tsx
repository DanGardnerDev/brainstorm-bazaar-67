import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, User, LogOut, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppHeaderProps {
  onNewIdea?: () => void;
}

const AppHeader = ({ onNewIdea }: AppHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      // Optional: Call Xano logout endpoint if it exists
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch(`${process.env.REACT_APP_XANO_API_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Logout failed");
      }
    } catch (err) {
      console.error("Error during logout:", err);
      // Proceed with client-side logout even if API fails
    } finally {
      localStorage.removeItem("token");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/login");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-800 text-white shadow-md z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-brand-orange to-white bg-clip-text text-transparent">
            Synerthree
          </span>
        </Link>
        
        <div className="flex items-center space-x-3">
          {onNewIdea && isAuthenticated && (
            <Button
              onClick={onNewIdea}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white"
              size="sm"
            >
              <Plus className="mr-1 h-4 w-4" />
              New Idea
            </Button>
          )}
          
          {isAuthenticated ? (
            <>
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <LogIn className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;