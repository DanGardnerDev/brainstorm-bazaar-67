
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GrokInsightProps {
  postTitle: string;
  postContent: string;
}

export const GrokInsight = ({ postTitle, postContent }: GrokInsightProps) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getInsight = async () => {
    setIsLoading(true);
    
    try {
      // This would be an actual API call in a real app
      console.log(`Getting insight for: ${postTitle}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response
      const mockInsights = [
        "Consider exploring partnerships with established companies in this field to gain credibility.",
        "This idea could benefit from a freemium model to attract initial users.",
        "Focus on a very specific niche first before expanding to broader markets.",
        "Have you considered how this idea could be monetized through subscription tiers?",
        "The regulatory landscape in this area might present challenges. Research compliance requirements early."
      ];
      
      const randomInsight = mockInsights[Math.floor(Math.random() * mockInsights.length)];
      setInsight(randomInsight);
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
