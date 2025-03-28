import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface NewPostFormProps {
  onPost: (post: { title: string; content: string }) => void;
  onCancel?: () => void;
}

export const NewPostForm = ({ onPost, onCancel }: NewPostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in both title and content",
        variant: "destructive",
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Error",
        description: "Please log in to post an idea",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_XANO_API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      if (!response.ok) throw new Error("Failed to post idea");

      const newPost = await response.json();
      onPost({ title, content }); // Pass to parent for state update
      setTitle("");
      setContent("");
      
      toast({
        title: "Idea posted",
        description: "Your idea has been posted successfully",
      });
    } catch (error) {
      console.error("Error posting idea:", error);
      toast({
        title: "Post failed",
        description: "There was an error posting your idea",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-xl">Share a new idea</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-2"
            />
            <Textarea
              placeholder="Describe your idea..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            className="bg-brand-orange hover:bg-brand-orange/90"
            disabled={isSubmitting || !title.trim() || !content.trim()}
          >
            {isSubmitting ? "Posting..." : "Post Idea"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};