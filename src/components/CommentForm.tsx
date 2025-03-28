import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface CommentFormProps {
  postId: string;
  onCommentAdded: (commentText: string) => void;
}

export const CommentForm = ({ postId, onCommentAdded }: CommentFormProps) => {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) return;
    
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Error",
        description: "Please log in to comment",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://x6ma-scmt-8w96.n7c.xano.io/api:bE-tSUfR/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post_id: postId, content: comment }),
      });
      if (!response.ok) throw new Error("Failed to post comment");

      toast({
        title: "Comment added",
        description: "Your comment has been posted successfully",
      });
      
      onCommentAdded(comment);
      setComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
      toast({
        title: "Comment failed",
        description: "There was an error posting your comment",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <Textarea
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="mb-2 min-h-[100px]"
      />
      <Button 
        type="submit" 
        className="bg-brand-orange hover:bg-brand-orange/90"
        disabled={isSubmitting || !comment.trim()}
      >
        {isSubmitting ? "Submitting..." : "Submit Comment"}
      </Button>
    </form>
  );
};