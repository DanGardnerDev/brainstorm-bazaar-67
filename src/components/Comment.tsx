import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface CommentType {
  id: string;
  text: string;
  author: {
    id: string;
    username: string;
  };
  createdAt: string;
}

interface CommentProps {
  comment: CommentType;
  onDelete?: () => void;
}

export const Comment = ({ comment, onDelete }: CommentProps) => {
  const { toast } = useToast();
  const currentUserId = localStorage.getItem("user_id");
  const isAuthor = currentUserId === comment.author.id;

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Error",
        description: "Please log in to delete this comment",
        variant: "destructive",
      });
      return;
    }

    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      const response = await fetch(`https://x6ma-scmt-8w96.n7c.xano.io/api:bE-tSUfR/comment/${comment.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment_id: comment.id }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete comment");
      }

      toast({
        title: "Success",
        description: "Comment deleted successfully",
      });

      if (onDelete) onDelete();
    } catch (err) {
      console.error("Error deleting comment:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to delete comment. Please try again.",
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

  return (
    <Card className="border-l-4 border-brand-orange">
      <CardHeader className="py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">{comment.author.username}</p>
            <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
          </div>
          {isAuthor && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-gray-700">{comment.text}</p>
      </CardContent>
    </Card>
  );
};