
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Idea Validation",
    description: "Get real feedback on your ideas from a diverse community of entrepreneurs and industry experts.",
    icon: "CheckCircle"
  },
  {
    title: "Team Formation",
    description: "Find co-founders, collaborators, and advisors with complementary skills to build your dream team.",
    icon: "CheckCircle"
  },
  {
    title: "Resource Sharing",
    description: "Access shared resources, tools, and knowledge to accelerate your startup journey.",
    icon: "CheckCircle"
  },
  {
    title: "Mentorship",
    description: "Connect with experienced entrepreneurs who can guide you through challenges and opportunities.",
    icon: "CheckCircle"
  },
  {
    title: "Funding Opportunities",
    description: "Present your ideas to investors looking for the next big innovation to fund.",
    icon: "CheckCircle"
  },
  {
    title: "Startup Communities",
    description: "Join like-minded groups focused on specific industries, technologies, or business models.",
    icon: "CheckCircle"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 bg-brand-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="gradient-text">Synerthree</span> Works
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Everything you need to bring your entrepreneurial ideas to life, all in one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4 text-brand-orange">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand-navy">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 md:p-10 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4 text-brand-navy">Ready to Join the Community?</h3>
              <p className="text-gray-600 mb-6">
                Connect with thousands of entrepreneurs, share your ideas, and start building your dream team today.
              </p>
              <button className="btn-primary">
                Get Started for Free
              </button>
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-gradient-to-br from-brand-orange/20 to-brand-navy/20 rounded-xl p-6 text-center">
                <div className="text-5xl font-bold gradient-text mb-2">3K+</div>
                <p className="text-gray-700">Active Entrepreneurs</p>
                <div className="h-0.5 w-16 bg-brand-orange mx-auto my-4"></div>
                <div className="text-5xl font-bold gradient-text mb-2">500+</div>
                <p className="text-gray-700">Projects Launched</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
