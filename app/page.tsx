import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MuscleActivation from "@/components/MuscleActivation";
import MealPlans from "@/components/MealPlans";
import WorkoutSplits from "@/components/WorkoutSplits";
import LeadCapture from "@/components/LeadCapture";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070707] text-white overflow-hidden font-sans">
      <Navbar />
      <Hero />
      <MuscleActivation />
      <MealPlans />
      <WorkoutSplits />
      <LeadCapture />
      <Footer />
    </main>
  );
}
