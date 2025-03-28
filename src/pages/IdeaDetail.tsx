
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { PostCard, Post } from "@/components/PostCard";
import { Comment, CommentType } from "@/components/Comment";
import { CommentForm } from "@/components/CommentForm";
import { GrokInsight } from "@/components/GrokInsight";
import { mockPosts, mockComments } from "@/utils/mockData";
import { Loader, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const IdeaDetail = () => {
  const { ideaId } = useParams<{ ideaId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This would be API calls in a real app
    const fetchIdeaAndComments = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const foundPost = mockPosts.find(p => p.id === ideaId);
        if (!foundPost) {
          setError("Idea not found");
          setIsLoading(false);
          return;
        }
        
        setPost(foundPost);
        
        // Filter comments for this post
        const postComments = mockComments.filter(c => c.postId === ideaId);
        setComments(postComments);
      } catch (err) {
        console.error("Error fetching idea details:", err);
        setError("Failed to load idea details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIdeaAndComments();
  }, [ideaId]);

  const handleCommentAdded = () => {
    // In a real app, this would refetch comments from the API
    const newComment: CommentType = {
      id: `temp-${Date.now()}`,
      text: "This is your new comment",
      author: {
        id: "current-user",
        username: "Current User"
      },
      createdAt: new Date().toISOString()
    };

    setComments([newComment, ...comments]);
    
    // Update the comment count on the post
    if (post) {
      setPost({
        ...post,
        commentCount: post.commentCount + 1
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
          
          <PostCard post={post} detailed={true} />
          
          <GrokInsight postTitle={post.title} postContent={post.content} />
          
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
