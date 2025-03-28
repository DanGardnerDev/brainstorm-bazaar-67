
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GrokSection from "@/components/GrokSection";
import IdeasSection from "@/components/IdeasSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <GrokSection />
        <IdeasSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
