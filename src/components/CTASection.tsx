
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return <section id="about" className="py-20 bg-brand-navy text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Turn Your Ideas Into Reality With <span className="text-brand-orange">Synerthree</span>
          </h2>
          <p className="text-lg md:text-xl mb-10 text-gray-200">
            Join our community of innovative entrepreneurs and start your journey today.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-orange mb-2">3</div>
                <p className="text-gray-200">Active Users</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-orange mb-2">1,400</div>
                <p className="text-gray-200">Ideas Shared</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-orange mb-2">350+</div>
                <p className="text-gray-200">Successful Teams</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-3 h-auto">
                Join Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="border border-white/30 hover:border-white/50 text-white px-6 py-3 h-auto">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default CTASection;
