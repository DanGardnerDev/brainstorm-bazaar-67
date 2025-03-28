import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, MessageSquare } from "lucide-react";
import { DownvoteModal } from "@/components/DownvoteModal";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleUpvote = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Error",
        description: "Please log in to vote",
        variant: "destructive",
      });
      return;
    }

    const newVote = currentPost.userVote === "up" ? null : "up";
    try {
      const response = await fetch(`${process.env.REACT_APP_XANO_API_URL}/votes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post_id: currentPost.id, vote_type: newVote || "remove" }), // Adjust "remove" logic if Xano supports it
      });
      if (!response.ok) throw new Error("Failed to upvote");

      setCurrentPost({
        ...currentPost,
        userVote: newVote,
        upvotes: newVote === "up" 
          ? currentPost.upvotes + 1 
          : currentPost.upvotes - 1,
        downvotes: currentPost.userVote === "down" 
          ? currentPost.downvotes - 1 
          : currentPost.downvotes,
      });
      toast({
        title: "Success",
        description: newVote === "up" ? "Upvoted!" : "Upvote removed",
      });
    } catch (err) {
      console.error("Error upvoting:", err);
      toast({
        title: "Error",
        description: "Failed to upvote. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownvote = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Error",
        description: "Please log in to vote",
        variant: "destructive",
      });
      return;
    }

    if (currentPost.userVote === "down") {
      handleVoteRemoval("down");
    } else {
      setShowDownvoteModal(true);
    }
  };

  const handleVoteRemoval = async (voteType: "up" | "down") => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.REACT_APP_XANO_API_URL}/votes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post_id: currentPost.id, vote_type: "remove" }), // Adjust if Xano uses DELETE or different logic
      });
      if (!response.ok) throw new Error("Failed to remove vote");

      setCurrentPost({
        ...currentPost,
        userVote: null,
        upvotes: voteType === "up" ? currentPost.upvotes - 1 : currentPost.upvotes,
        downvotes: voteType === "down" ? currentPost.downvotes - 1 : currentPost.downvotes,
      });
      toast({
        title: "Success",
        description: `${voteType === "up" ? "Upvote" : "Downvote"} removed`,
      });
    } catch (err) {
      console.error("Error removing vote:", err);
      toast({
        title: "Error",
        description: "Failed to remove vote. Please try again.",
        variant: "destructive",
      });
    }
  };

  const confirmDownvote = async (reason: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.REACT_APP_XANO_API_URL}/votes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post_id: currentPost.id, vote_type: "down", reason }),
      });
      if (!response.ok) throw new Error("Failed to downvote");

      setCurrentPost({
        ...currentPost,
        userVote: "down",
        downvotes: currentPost.downvotes + 1,
        upvotes: currentPost.userVote === "up" ? currentPost.upvotes - 1 : currentPost.upvotes,
      });
      setShowDownvoteModal(false);
      toast({
        title: "Success",
        description: "Downvoted!",
      });
    } catch (err) {
      console.error("Error downvoting:", err);
      toast({
        title: "Error",
        description: "Failed to downvote. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: "numeric", 
      month: "short", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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