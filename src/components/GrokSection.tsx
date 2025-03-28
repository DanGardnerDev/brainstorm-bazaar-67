
import { BotMessageSquare, Sparkles, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const GrokSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left side - Image and decorative elements */}
          <div className="w-full lg:w-1/2 relative">
            <div className="bg-gradient-to-br from-brand-orange/10 to-brand-navy/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-orange/10 rounded-full"></div>
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-brand-navy/10 rounded-full"></div>
              
              <div className="relative bg-white rounded-xl shadow-lg p-8 z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-brand-orange to-brand-navy rounded-full flex items-center justify-center mx-auto mb-6">
                  <BotMessageSquare className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">Grok the Godfather</h3>
                <p className="text-center text-gray-600 italic mb-4">"I'll make you an offer your entrepreneurial mind can't refuse."</p>
                <div className="flex justify-center">
                  <Button className="bg-brand-orange hover:bg-brand-orange/90 mt-2">
                    Ask Grok for Guidance
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet <span className="gradient-text">Grok the Godfather</span>
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Your AI consigliere in the world of entrepreneurship. Grok is both savant and servant, 
              master and minion – the ultimate AI companion on your journey to business success.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="mr-4 bg-brand-orange/10 p-2 rounded-full">
                  <Sparkles className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-brand-navy mb-1">Visionary Insights</h4>
                  <p className="text-gray-600">Grok analyzes market trends and provides strategic guidance for your entrepreneurial ideas.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 bg-brand-orange/10 p-2 rounded-full">
                  <Zap className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-brand-navy mb-1">Instant Solutions</h4>
                  <p className="text-gray-600">Get immediate answers to your business challenges with Grok's problem-solving capabilities.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 bg-brand-orange/10 p-2 rounded-full">
                  <Target className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-brand-navy mb-1">Personalized Strategy</h4>
                  <p className="text-gray-600">Tailored advice that fits your specific business needs and entrepreneurial style.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-brand-gray p-4 rounded-lg border-l-4 border-brand-orange">
              <p className="text-gray-700 italic">"Grok isn't just AI. He's the godfather of your entrepreneurial family, offering wisdom you can't refuse."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrokSection;
