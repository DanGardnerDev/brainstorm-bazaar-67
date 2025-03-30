import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, MessageSquare, Trash2, Edit } from "lucide-react";
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
  onVoteUpdate?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

export const PostCard = ({ post, detailed = false, onVoteUpdate, onDelete, onEdit }: PostCardProps) => {
  const [showDownvoteModal, setShowDownvoteModal] = useState(false);
  const { toast } = useToast();
  const currentUserId = localStorage.getItem("user_id")?.trim(); // Trim to remove any whitespace
  const postAuthorId = String(post.author.id).trim(); // Convert to string and trim
  const isAuthor = currentUserId === postAuthorId;

  // Debug logs to verify values and types
  console.log("PostCard - currentUserId:", currentUserId, "Type:", typeof currentUserId);
  console.log("PostCard - post.author.id:", postAuthorId, "Type:", typeof postAuthorId);
  console.log("PostCard - isAuthor:", isAuthor);

  const handleUpvote = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    if (!token || !userId) {
      toast({
        title: "Error",
        description: "Please log in to vote",
        variant: "destructive",
      });
      return;
    }

    const newVote = post.userVote === "up" ? null : "up";
    try {
      const response = await fetch("https://x6ma-scmt-8w96.n7c.xano.io/api:bE-tSUfR/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          vote_type: newVote || "remove", 
          post_id: post.id, 
          user_id: userId, 
          reason: null
        }),
      });
      const result = await response.json();

      if (result === "vote_exists") {
        toast({
          title: "Error",
          description: "You have already voted",
          variant: "destructive",
        });
        return;
      }

      if (result === "success") {
        toast({
          title: "Success",
          description: newVote === "up" ? "Upvoted!" : "Upvote removed",
        });
      } else {
        throw new Error("Unexpected response from server");
      }

      if (onVoteUpdate) onVoteUpdate();
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

    if (post.userVote === "down") {
      handleVoteRemoval("down");
    } else {
      setShowDownvoteModal(true);
    }
  };

  const handleVoteRemoval = async (voteType: "up" | "down") => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    try {
      const response = await fetch("https://x6ma-scmt-8w96.n7c.xano.io/api:bE-tSUfR/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          vote_type: "remove", 
          post_id: post.id, 
          user_id: userId, 
          reason: null 
        }),
      });
      const result = await response.json();

      if (result === "vote_exists") {
        toast({
          title: "Error",
          description: "You have already voted",
          variant: "destructive",
        });
        return;
      }

      if (result === "success") {
        toast({
          title: "Success",
          description: `${voteType === "up" ? "Upvote" : "Downvote"} removed`,
        });
      } else {
        throw new Error("Unexpected response from server");
      }

      if (onVoteUpdate) onVoteUpdate();
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
    const userId = localStorage.getItem("user_id");
    try {
      const response = await fetch("https://x6ma-scmt-8w96.n7c.xano.io/api:bE-tSUfR/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          vote_type: "down", 
          post_id: post.id, 
          user_id: userId, 
          reason 
        }),
      });
      const result = await response.json();

      if (result === "vote_exists") {
        toast({
          title: "Error",
          description: "You have already voted",
          variant: "destructive",
        });
        setShowDownvoteModal(false);
        return;
      }

      if (result === "success") {
        toast({
          title: "Success",
          description: "Downvoted!",
        });
      } else {
        throw new Error("Unexpected response from server");
      }

      setShowDownvoteModal(false);
      if (onVoteUpdate) onVoteUpdate();
    } catch (err) {
      console.error("Error downvoting:", err);
      toast({
        title: "Error",
        description: "Failed to downvote. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Error",
        description: "Please log in to delete this post",
        variant: "destructive",
      });
      return;
    }

    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`https://x6ma-scmt-8w96.n7c.xano.io/api:bE-tSUfR/post/${post.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete post");

      toast({
        title: "Success",
        description: "Post deleted successfully",
      });

      if (onDelete) onDelete();
    } catch (err) {
      console.error("Error deleting post:", err);
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
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
    ? post.content 
    : post.content.length > 150 
      ? `${post.content.slice(0, 150)}...` 
      : post.content;

  const titleContent = detailed ? (
    post.title
  ) : (
    <Link to={`/ideas/${post.id}`} className="hover:text-brand-orange transition-colors">
      {post.title}
    </Link>
  );

  return (
    <>
      <Card className="mb-4 card-hover overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold mb-1">
                {titleContent}
              </CardTitle>
              <p className="text-sm text-gray-500">
                Posted by {post.author.username} • {formatDate(post.createdAt)}
              </p>
            </div>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleUpvote}
                className={post.userVote === "up" ? "text-brand-orange" : ""}
              >
                <ArrowUp className={post.userVote === "up" ? "text-brand-orange" : ""} />
                <span className="ml-1">{post.upvotes}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleDownvote}
                className={post.userVote === "down" ? "text-brand-navy" : ""}
              >
                <ArrowDown className={post.userVote === "down" ? "text-brand-navy" : ""} />
                <span className="ml-1">{post.downvotes}</span>
              </Button>
              {isAuthor && (
                <div className="flex space-x-1">
                  {detailed && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={onEdit}
                      className="text-blue-500 hover:text-blue-700 p-1"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 whitespace-pre-line">{contentDisplay}</p>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex items-center text-gray-500">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-sm">{post.commentCount} comments</span>
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