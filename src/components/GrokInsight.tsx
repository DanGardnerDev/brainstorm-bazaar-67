import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GrokInsightProps {
  postTitle: string;
  postContent: string;
  postId?: string; // Added to link to Xano
}

export const GrokInsight = ({ postTitle, postContent, postId }: GrokInsightProps) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getInsight = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Error",
        description: "Please log in to get insights",
        variant: "destructive",
      });
      return;
    }

    if (!postId) {
      toast({
        title: "Error",
        description: "Post ID is missing",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Save request to Xano
      const xanoResponse = await fetch(`${process.env.REACT_APP_XANO_API_URL}/grok-suggestion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post_id: postId }),
      });
      if (!xanoResponse.ok) throw new Error("Failed to save insight request");

      // Step 2: Call Grok 3 API
      const grokResponse = await fetch("https://api.x.ai/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_GROK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "grok-beta",
          prompt: `Suggest improvements or insights for this idea: "${postTitle}" - ${postContent}`,
          max_tokens: 100,
        }),
      });
      if (!grokResponse.ok) throw new Error("Failed to fetch Grok insight");
      const grokData = await grokResponse.json();
      const newInsight = grokData.choices[0]?.text.trim() || "No insight available";
      setInsight(newInsight);

      toast({
        title: "Success",
        description: "Insight generated!",
      });
    } catch (error) {
      console.error("Error getting insight:", error);
      toast({
        title: "Failed to get insight",
        description: "There was an error connecting to Grok AI",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Lightbulb className="mr-2 h-5 w-5 text-brand-orange" />
          Grok AI Insight
        </CardTitle>
      </CardHeader>
      <CardContent>
        {insight ? (
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <p className="text-gray-700">{insight}</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Get AI-powered suggestions and feedback on your idea
            </p>
            <Button 
              onClick={getInsight} 
              className="bg-brand-orange hover:bg-brand-orange/90"
              disabled={isLoading}
            >
              {isLoading ? "Thinking..." : "Get Grok Insight"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};