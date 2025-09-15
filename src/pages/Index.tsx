import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AIWorkspace from "@/components/AIWorkspace";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

interface IndexProps {
  onGetStarted?: () => void;
}

const Index = ({ onGetStarted }: IndexProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header onGetStarted={onGetStarted} />
      <main>
        <Hero onGetStarted={onGetStarted} />
        <Features />
        <AIWorkspace />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
