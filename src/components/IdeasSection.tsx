
import { Star, Users, Heart, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ideas = [
  {
    id: 1,
    title: "AI-Powered Personal Shopping Assistant",
    description: "A mobile app that uses AI to help users find the perfect clothes based on their style preferences and body measurements.",
    category: "E-commerce",
    collaborators: 3,
    likes: 28,
    rating: 4.7,
  },
  {
    id: 2,
    title: "Sustainable Food Delivery Network",
    description: "A platform connecting local farmers directly with consumers for fresh, sustainable produce delivery with zero-waste packaging.",
    category: "Food & Sustainability",
    collaborators: 5,
    likes: 42,
    rating: 4.9,
  },
  {
    id: 3,
    title: "Remote Team Virtual Office",
    description: "A virtual office space for remote teams that simulates in-person collaboration through spatial audio and interactive environments.",
    category: "Productivity",
    collaborators: 4,
    likes: 36,
    rating: 4.5,
  },
  {
    id: 4,
    title: "Educational AR Learning Platform",
    description: "An augmented reality platform that transforms traditional learning materials into interactive 3D experiences for K-12 students.",
    category: "Education",
    collaborators: 7,
    likes: 52,
    rating: 4.8,
  },
  {
    id: 5,
    title: "Community-based Elderly Care Network",
    description: "A service connecting seniors with local volunteers and verified professionals for everyday assistance and companionship.",
    category: "Healthcare",
    collaborators: 6,
    likes: 47,
    rating: 4.9,
  },
  {
    id: 6,
    title: "Smart Home Energy Management",
    description: "A system that optimizes home energy usage through AI predictions and integration with renewable energy sources.",
    category: "CleanTech",
    collaborators: 4,
    likes: 33,
    rating: 4.6,
  },
];

const IdeasSection = () => {
  return (
    <section id="ideas" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trending <span className="gradient-text">Ideas</span>
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Explore innovative concepts from entrepreneurs around the world and find your next collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <Card key={idea.id} className="card-hover">
              <CardContent className="p-6">
                <div className="bg-brand-gray px-3 py-1 rounded-full inline-block mb-4">
                  <span className="text-sm font-medium text-gray-700">{idea.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-brand-navy">{idea.title}</h3>
                <p className="text-gray-600 mb-4">{idea.description}</p>
                <div className="flex justify-between items-center border-t pt-4 mt-2">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center text-gray-500">
                      <Users className="h-4 w-4 mr-1 text-brand-orange" />
                      <span className="text-sm">{idea.collaborators}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Heart className="h-4 w-4 mr-1 text-brand-orange" />
                      <span className="text-sm">{idea.likes}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-brand-orange" />
                    <span className="text-sm ml-1">{idea.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-flex items-center text-brand-orange hover:text-brand-orange/80 font-medium"
          >
            View all ideas
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default IdeasSection;
