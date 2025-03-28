
import { useState, useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import { PostCard, Post } from "@/components/PostCard";
import { NewPostForm } from "@/components/NewPostForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { X, Loader } from "lucide-react";
import { mockPosts } from "@/utils/mockData";

const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // This would be an API call in a real app
    const fetchPosts = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPosts(mockPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load ideas. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleNewPost = (postData: { title: string; content: string }) => {
    // This would be an API call in a real app
    const newPost: Post = {
      id: `temp-${Date.now()}`,
      title: postData.title,
      content: postData.content,
      author: {
        id: "current-user",
        username: "Current User"
      },
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      commentCount: 0,
      userVote: null
    };

    setPosts([newPost, ...posts]);
    setShowNewPostForm(false);
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

        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Ideas Feed</h1>
          {!showNewPostForm && (
            <Button 
              className="bg-brand-orange hover:bg-brand-orange/90"
              onClick={() => setShowNewPostForm(true)}
            >
              New Idea
            </Button>
          )}
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
                  <PostCard key={post.id} post={post} />
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
