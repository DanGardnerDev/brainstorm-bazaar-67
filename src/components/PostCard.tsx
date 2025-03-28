import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, MessageSquare } from "lucide-react";
import { DownvoteModal } from "@/components/DownvoteModal";

export interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    username: string;
  };
  createdAt: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  userVote?: "up" | "down" | null;
}

interface PostCardProps {
  post: Post;
  detailed?: boolean;
}

export const PostCard = ({ post, detailed = false }: PostCardProps) => {
  const [currentPost, setCurrentPost] = useState<Post>(post);
  const [showDownvoteModal, setShowDownvoteModal] = useState(false);

  const handleUpvote = () => {
    // This would call an API in a real app
    const newVote = currentPost.userVote === "up" ? null : "up";
    
    setCurrentPost({
      ...currentPost,
      userVote: newVote,
      upvotes: newVote === "up" 
        ? currentPost.upvotes + 1 
        : currentPost.upvotes - 1,
      downvotes: currentPost.userVote === "down" 
        ? currentPost.downvotes - 1 
        : currentPost.downvotes
    });
  };

  const handleDownvote = () => {
    // If already downvoted, remove the downvote
    if (currentPost.userVote === "down") {
      setCurrentPost({
        ...currentPost,
        userVote: null,
        downvotes: currentPost.downvotes - 1
      });
      return;
    }
    
    // Otherwise show the modal to confirm downvote
    setShowDownvoteModal(true);
  };

  const confirmDownvote = (reason: string) => {
    // This would send the reason to an API in a real app
    console.log(`Downvote reason: ${reason}`);
    
    setCurrentPost({
      ...currentPost,
      userVote: "down",
      downvotes: currentPost.downvotes + 1,
      upvotes: currentPost.userVote === "up" 
        ? currentPost.upvotes - 1 
        : currentPost.upvotes
    });
    
    setShowDownvoteModal(false);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const contentDisplay = detailed 
    ? currentPost.content 
    : currentPost.content.length > 150 
      ? `${currentPost.content.slice(0, 150)}...` 
      : currentPost.content;

  return (
    <>
      <Card className="mb-4 card-hover overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold mb-1">
                {detailed ? (
                  currentPost.title
                ) : (
                  <Link to={`/ideas/${currentPost.id}`} className="hover:text-brand-orange transition-colors">
                    {currentPost.title}
                  </Link>
                )}
              </CardTitle>
              <p className="text-sm text-gray-500">
                Posted by {currentPost.author.username} • {formatDate(currentPost.createdAt)}
              </p>
            </div>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleUpvote}
                className={currentPost.userVote === "up" ? "text-brand-orange" : ""}
              >
                <ArrowUp className={currentPost.userVote === "up" ? "text-brand-orange" : ""} />
                <span className="ml-1">{currentPost.upvotes}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleDownvote}
                className={currentPost.userVote === "down" ? "text-brand-navy" : ""}
              >
                <ArrowDown className={currentPost.userVote === "down" ? "text-brand-navy" : ""} />
                <span className="ml-1">{currentPost.downvotes}</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 whitespace-pre-line">{contentDisplay}</p>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex items-center text-gray-500">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-sm">{currentPost.commentCount} comments</span>
          </div>
        </CardFooter>
      </Card>

      <DownvoteModal 
        open={showDownvoteModal} 
        onClose={() => setShowDownvoteModal(false)} 
        onConfirm={confirmDownvote} 
      />
    </>
  );
};
