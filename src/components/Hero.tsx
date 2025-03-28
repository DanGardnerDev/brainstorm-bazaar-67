import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const Hero = () => {
  return <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-b from-white to-brand-gray">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Connect. Collaborate. <span className="gradient-text">Create.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">Synerthree is where entrepreneurs like Dan, Tommy, and Evan meet to share ideas, find collaborators, and build the next big thing together.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold text-lg py-6 px-8">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-brand-navy text-brand-navy hover:bg-brand-navy/5 font-semibold text-lg py-6 px-8">
                Learn More
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 animate-fade-in-right">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg mx-auto">
              <div className="w-full h-64 bg-gradient-to-r from-brand-orange/10 to-brand-navy/10 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-brand-orange rounded-full mx-auto flex items-center justify-center mb-4">
                    <span className="text-white text-2xl font-bold">S3</span>
                  </div>
                  <p className="text-brand-navy font-semibold">Synerthree Platform</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-brand-gray p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-brand-orange/20 rounded-full flex items-center justify-center mr-3">
                      <div className="w-3 h-3 bg-brand-orange rounded-full"></div>
                    </div>
                    <p className="text-gray-700">Connect with like-minded entrepreneurs</p>
                  </div>
                </div>
                <div className="bg-brand-gray p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-brand-orange/20 rounded-full flex items-center justify-center mr-3">
                      <div className="w-3 h-3 bg-brand-orange rounded-full"></div>
                    </div>
                    <p className="text-gray-700">Share and develop innovative ideas</p>
                  </div>
                </div>
                <div className="bg-brand-gray p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-brand-orange/20 rounded-full flex items-center justify-center mr-3">
                      <div className="w-3 h-3 bg-brand-orange rounded-full"></div>
                    </div>
                    <p className="text-gray-700">Build teams and turn ideas into reality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;