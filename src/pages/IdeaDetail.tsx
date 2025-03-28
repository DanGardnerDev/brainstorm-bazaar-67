import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { PostCard, Post } from "@/components/PostCard";
import { Comment, CommentType } from "@/components/Comment";
import { CommentForm } from "@/components/CommentForm";
import { GrokInsight } from "@/components/GrokInsight";
import { Loader, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const IdeaDetail = () => {
  const { ideaId } = useParams<{ ideaId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchIdeaAndComments = async () => {
    try {
      const response = await fetch(`https://x6ma-scmt-8w96.n7c.xano.io/api:bE-tSUfR/post/${ideaId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        if (response.status === 404) throw new Error("Idea not found");
        throw new Error("Failed to fetch idea");
      }
      const data = await response.json();
      const mappedPost: Post = {
        id: data.id,
        title: data.title,
        content: data.content,
        author: { id: data.user_id, username: "User" },
        createdAt: data.created_at,
        upvotes: data.upvotes || 0,
        downvotes: data.downvotes || 0,
        commentCount: data.comments?.length || 0,
        userVote: null,
      };
      setPost(mappedPost);
      const serverComments: CommentType[] = (data.comments || []).map((c: any) => ({
        id: c.id,
        text: c.content,
        author: { id: c.user_id, username: "User" },
        createdAt: c.created_at,
      }));
      // Merge server comments with local optimistic updates
      setComments(prevComments => {
        const mergedComments = [...serverComments];
        prevComments.forEach(localComment => {
          if (!mergedComments.some(c => c.id === localComment.id)) {
            mergedComments.unshift(localComment);
          }
        });
        return mergedComments;
      });
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

  const handleCommentAdded = (commentText: string) => {
    const newComment: CommentType = {
      id: `temp-${Date.now()}`,
      text: commentText,
      author: { id: "current-user", username: "Current User" },
      createdAt: new Date().toISOString(),
    };
    setComments(prev => [newComment, ...prev]);
    if (post) {
      setPost({ ...post, commentCount: post.commentCount + 1 });
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
          
          <PostCard post={post} detailed={true} />
          
          <GrokInsight postTitle={post.title} postContent={post.content} postId={post.id} />
          
          <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>
          
          <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
          
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
          ) : (
            <div className="space-y-2">
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default IdeaDetail;