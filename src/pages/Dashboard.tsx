import { useState, useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import { PostCard, Post } from "@/components/PostCard";
import { NewPostForm } from "@/components/NewPostForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { X, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username") || "User";
    try {
      const response = await fetch("https://x6ma-scmt-8w96.n7c.xano.io/api:bE-tSUfR/post", {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      console.log("Fetched posts:", data);
      const mappedPosts: Post[] = data.map((post: any) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        author: { 
          id: String(post.user_id), // Ensure author.id is a string
          username: post._user?.name || (post.user_id === localStorage.getItem("user_id") ? username : "User") 
        },
        createdAt: post.created_at,
        upvotes: post.upvote_count || 0,
        downvotes: post.downvote_count || 0,
        commentCount: post.comment_count || 0,
        userVote: null,
      }));
      console.log("Mapped posts:", mappedPosts);
      setPosts(mappedPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load ideas. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleFocus = () => fetchPosts();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleNewPost = async (postData: { title: string; content: string }) => {
    setShowNewPostForm(false);
    await fetchPosts();
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <AppHeader onNewIdea={() => setShowNewPostForm(true)} />
      
      <main className="container mx-auto px-4 pt-20 mt-6">
        {showNewPostForm && (
          <NewPostForm 
            onPost={handleNewPost} 
            onCancel={() => setShowNewPostForm(false)} 
          />
        )}

        <div className="mb-6">
          <h1 className="text-2xl font-bold">Ideas Feed</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader className="h-8 w-8 animate-spin text-brand-navy" />
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md flex items-start">
            <div className="mr-3 mt-0.5">
              <X className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-red-800">{error}</p>
              <Button 
                variant="outline" 
                className="mt-2"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {posts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">No ideas posted yet</p>
                <Button 
                  className="bg-brand-orange hover:bg-brand-orange/90"
                  onClick={() => setShowNewPostForm(true)}
                >
                  Be the first to share an idea
                </Button>
              </div>
            ) : (
              <div>
                {posts.map((post) => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    onVoteUpdate={fetchPosts}
                    onDelete={() => handleDeletePost(post.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;