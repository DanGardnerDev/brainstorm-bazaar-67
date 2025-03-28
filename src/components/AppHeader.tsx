
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, User, LogOut } from "lucide-react";

interface AppHeaderProps {
  onNewIdea?: () => void;
}

const AppHeader = ({ onNewIdea }: AppHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-brand-navy text-white shadow-md z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold">
          Synerthree
        </Link>
        
        <div className="flex items-center space-x-3">
          {onNewIdea && (
            <Button
              onClick={onNewIdea}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white"
              size="sm"
            >
              <Plus className="mr-1 h-4 w-4" />
              New Idea
            </Button>
          )}
          
          <Link to="/profile">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <LogOut className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
