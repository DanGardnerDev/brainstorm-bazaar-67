import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { PostCard, Post } from "@/components/PostCard";
import { Comment, CommentType } from "@/components/Comment";
import { CommentForm } from "@/components/CommentForm";
import { GrokInsight } from "@/components/GrokInsight";
import { Loader, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

const IdeaDetail = () => {
  const { ideaId } = useParams<{ ideaId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchIdeaAndComments = async () => {
    try {
      const postResponse = await fetch(`https://x6ma-scmt-8w96.n7c.xano.io/api:bE-tSUfR/post/${ideaId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!postResponse.ok) {
        if (postResponse.status === 404) throw new Error("Idea not found");
        throw new Error("Failed to fetch idea");
      }
      const postData = await postResponse.json();
      console.log("Fetched post:", postData);

      const commentsResponse = await fetch(`https://x6ma-scmt-8w96.n7c.xano.io/api:bE-tSUfR/get_post_comments?post_id=${ideaId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!commentsResponse.ok) throw new Error("Failed to fetch comments");
      const commentsData = await commentsResponse.json();

      const username = localStorage.getItem("username") || "User";
      const mappedPost: Post = {
        id: postData.id,
        title: postData.title,
        content: postData.content,
        author: { 
          id: String(postData.user_id),
          username: postData._user?.name || (postData.user_id === localStorage.getItem("user_id") ? username : "User") 
        },
        createdAt: postData.created_at,
        upvotes: postData.upvote_count || 0,
        downvotes: postData.downvote_count || 0,
        commentCount: postData.comment_count || commentsData.length || 0,
        userVote: null,
      };
      console.log("Mapped post:", mappedPost);
      setPost(mappedPost);
      setEditTitle(mappedPost.title);
      setEditContent(mappedPost.content);

      const mappedComments: CommentType[] = commentsData.map((c: any) => ({
        id: c.id,
        text: c.content,
        author: { 
          id: String(c.user_id),
          username: c._user?.name || (c.user_id === localStorage.getItem("user_id") ? username : "User") 
        },
        createdAt: c.created_at,
      }));
      setComments(mappedComments); // Replace comments, don’t merge
    } catch (err) {
      console.error("Error fetching idea details:", err);
      setError(err.message || "Failed to load idea details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeaAndComments();
  }, [ideaId]);

  useEffect(() => {
    const handleFocus = () => fetchIdeaAndComments();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [ideaId]);

  const handleCommentAdded = (newComment: CommentType) => {
    // Optimistically update the UI with the new comment
    setComments((prevComments) => [newComment, ...prevComments]);

    // Alternative: Refetch comments from the server to ensure consistency
    // fetchIdeaAndComments();
  };

  const handleDeleteComment = async (commentId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Error",
        description: "Please log in to delete this comment",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`https://x6ma-scmt-8w96.n7c.xano.io/api:bE-tSUfR/comment/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete comment");

      toast({
        title: "Success",
        description: "Comment deleted successfully",
      });

      await fetchIdeaAndComments();
    } catch (err) {
      console.error("Error deleting comment:", err);
      toast({
        title: "Error",
        description: "Failed to delete comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditPost = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Error",
        description: "Please log in to edit this post",
        variant: "destructive",
      });
      return;
    }

    if (!editTitle.trim() || !editContent.trim()) {
      toast({
        title: "Error",
        description: "Title and content cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`https://x6ma-scmt-8w96.n7c.xano.io/api:bE-tSUfR/post/${ideaId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post_id: ideaId,
          title: editTitle,
          content: editContent,
        }),
      });
      if (!response.ok) throw new Error("Failed to update post");

      toast({
        title: "Success",
        description: "Post updated successfully",
      });

      setIsEditing(false);
      await fetchIdeaAndComments();
    } catch (err) {
      console.error("Error updating post:", err);
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePost = async () => {
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
      const response = await fetch(`https://x6ma-scmt-8w96.n7c.xano.io/api:bE-tSUfR/post/${ideaId}`, {
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

      navigate("/dashboard");
    } catch (err) {
      console.error("Error deleting post:", err);
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader />
        <main className="container mx-auto px-4 pt-20 mt-6">
          <div className="flex justify-center py-20">
            <Loader className="h-8 w-8 animate-spin text-brand-navy" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader />
        <main className="container mx-auto px-4 pt-20 mt-6">
          <div className="text-center py-10">
            <p className="text-orange-600 text-lg mb-4">{error || "Idea not found"}</p>
            <Link to="/dashboard">
              <Button className="bg-brand-navy hover:bg-brand-navy/90">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Ideas
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <AppHeader />
      
      <main className="container mx-auto px-4 pt-20 mt-6">
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center text-brand-navy hover:text-brand-orange transition-colors mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Ideas
          </Link>
          
          {isEditing ? (
            <Card className="mb-6 border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Edit Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input
                    placeholder="Title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="mb-2 border-gray-300 focus:border-brand-orange"
                  />
                  <Textarea
                    placeholder="Describe your idea..."
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="min-h-[100px] border-gray-300 focus:border-brand-orange"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsEditing(false);
                    setEditTitle(post.title);
                    setEditContent(post.content);
                  }}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white"
                  onClick={handleEditPost}
                >
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <PostCard 
              post={post} 
              detailed={true} 
              onVoteUpdate={fetchIdeaAndComments}
              onDelete={handleDeletePost}
              onEdit={() => setIsEditing(true)}
            />
          )}
          
          <GrokInsight postTitle={post.title} postContent={post.content} postId={post.id} />
          
          <h2 className="text-xl font-bold mb-4 text-gray-800">Comments ({comments.length})</h2>
          
          <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
          
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
          ) : (
            <div className="space-y-2">
              {comments.map((comment) => (
                <Comment 
                  key={comment.id} 
                  comment={comment} 
                  onDelete={() => handleDeleteComment(comment.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default IdeaDetail;