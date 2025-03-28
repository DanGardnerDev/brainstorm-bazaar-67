
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader, Pencil, Trash, Eye, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockPosts } from "@/utils/mockData";
import { Post } from "@/components/PostCard";

interface User {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [profileImageDialogOpen, setProfileImageDialogOpen] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // This would be API calls in a real app
    const fetchUserAndPosts = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock user data
        const mockUser: User = {
          id: "current-user",
          username: "Current User",
          email: "user@example.com",
          profilePicture: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=250&h=250&fit=crop"
        };
        
        setUser(mockUser);
        
        // Filter posts for this user
        const filteredPosts = mockPosts.filter(p => p.author.id === "current-user");
        setUserPosts(filteredPosts);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndPosts();
  }, []);

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleSaveEdit = () => {
    if (!editingPost) return;
    
    // This would be an API call in a real app
    const updatedPost = {
      ...editingPost,
      title: editTitle,
      content: editContent
    };
    
    setUserPosts(userPosts.map(p => 
      p.id === updatedPost.id ? updatedPost : p
    ));
    
    setEditingPost(null);
    
    toast({
      title: "Post updated",
      description: "Your idea has been updated successfully",
    });
  };

  const handleDeletePost = (postId: string) => {
    setDeletingPostId(postId);
  };

  const confirmDelete = () => {
    if (!deletingPostId) return;
    
    // This would be an API call in a real app
    setUserPosts(userPosts.filter(p => p.id !== deletingPostId));
    setDeletingPostId(null);
    
    toast({
      title: "Post deleted",
      description: "Your idea has been deleted successfully",
    });
  };

  const handleUpdateProfileImage = () => {
    if (!user) return;
    
    // This would be an API call in a real app
    setUser({
      ...user,
      profilePicture: profileImageUrl
    });
    
    setProfileImageDialogOpen(false);
    
    toast({
      title: "Profile updated",
      description: "Your profile picture has been updated successfully",
    });
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

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader />
        <main className="container mx-auto px-4 pt-20 mt-6">
          <div className="text-center py-10">
            <p className="text-orange-600 text-lg mb-4">{error || "Failed to load profile"}</p>
            <Button 
              className="bg-brand-navy hover:bg-brand-navy/90"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <AppHeader />
      
      <main className="container mx-auto px-4 pt-20 mt-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative group">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.profilePicture} alt={user.username} />
                  <AvatarFallback className="text-lg">{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setProfileImageDialogOpen(true)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <p className="font-medium">Username</p>
                  <p className="text-gray-700">{user.username}</p>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-700">{user.email}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mb-4">
          <h2 className="text-xl font-bold">Your Ideas</h2>
        </div>
        
        {userPosts.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 mb-4">You haven't posted any ideas yet</p>
            <Link to="/dashboard">
              <Button className="bg-brand-orange hover:bg-brand-orange/90">
                Share Your First Idea
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
                    <div className="flex space-x-2">
                      <Link to={`/ideas/${post.id}`}>
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-brand-orange"
                        onClick={() => handleEditPost(post)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-brand-navy"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    {post.content.length > 150 
                      ? `${post.content.slice(0, 150)}...` 
                      : post.content}
                  </p>
                  <div className="mt-2 text-sm text-gray-500">
                    <span>
                      {new Date(post.createdAt).toLocaleDateString()} • 
                    </span>
                    <span className="ml-1">
                      {post.upvotes} upvotes • 
                    </span>
                    <span className="ml-1">
                      {post.commentCount} comments
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      {/* Edit Post Dialog */}
      <Dialog open={!!editingPost} onOpenChange={() => setEditingPost(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Idea</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input 
                value={editTitle} 
                onChange={(e) => setEditTitle(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <Textarea 
                value={editContent} 
                onChange={(e) => setEditContent(e.target.value)} 
                className="min-h-[150px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPost(null)}>
              Cancel
            </Button>
            <Button 
              className="bg-brand-orange hover:bg-brand-orange/90" 
              onClick={handleSaveEdit}
              disabled={!editTitle.trim() || !editContent.trim()}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deletingPostId} onOpenChange={() => setDeletingPostId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this idea? This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingPostId(null)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Profile Picture Update Dialog */}
      <Dialog open={profileImageDialogOpen} onOpenChange={setProfileImageDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Image URL</label>
              <Input 
                placeholder="https://example.com/image.jpg"
                value={profileImageUrl} 
                onChange={(e) => setProfileImageUrl(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              {profileImageUrl ? (
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profileImageUrl} alt="Preview" />
                  <AvatarFallback>
                    <Loader className="h-8 w-8 animate-spin text-brand-navy" />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 text-center">
              In a real app, you would be able to upload a file directly.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setProfileImageDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-brand-orange hover:bg-brand-orange/90" 
              onClick={handleUpdateProfileImage}
              disabled={!profileImageUrl.trim()}
            >
              Update Picture
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
