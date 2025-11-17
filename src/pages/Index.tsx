import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import Community from "@/components/Community";
import Plans from "@/components/Plans";
import SavingsSection from "@/components/SavingsSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <Community />
      <Plans />
      <SavingsSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;