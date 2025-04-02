
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import PhoneLogin from "@/components/auth/PhoneLogin";
import { Dumbbell, GitPullRequest, Shield, BrainCircuit } from "lucide-react";

const Index = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/admin" : "/dashboard"} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-fitness text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                FitWise AI Studio
              </h1>
              <p className="text-xl mb-6">
                Advanced fitness tracking with AI-powered workout plans, diet recommendations, and expert guidance.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <Dumbbell className="h-5 w-5 mr-2" />
                  <span>Personalized Workouts</span>
                </div>
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <GitPullRequest className="h-5 w-5 mr-2" />
                  <span>Progress Tracking</span>
                </div>
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <Shield className="h-5 w-5 mr-2" />
                  <span>Safety First</span>
                </div>
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <BrainCircuit className="h-5 w-5 mr-2" />
                  <span>AI Powered</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <PhoneLogin />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features That Set Us Apart</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="fitness-card">
              <div className="h-12 w-12 bg-fitness-light rounded-full flex items-center justify-center mb-4">
                <Dumbbell className="h-6 w-6 text-fitness-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Workout Plans</h3>
              <p className="text-gray-600">
                Customized training splits and muscle-focused routines adapted to your fitness level and goals.
              </p>
            </div>
            
            <div className="fitness-card">
              <div className="h-12 w-12 bg-fitness-light rounded-full flex items-center justify-center mb-4">
                <GitPullRequest className="h-6 w-6 text-fitness-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Nutrition Guidance</h3>
              <p className="text-gray-600">
                AI-generated diet plans tailored to your body metrics, preferences, and weight management goals.
              </p>
            </div>
            
            <div className="fitness-card">
              <div className="h-12 w-12 bg-fitness-light rounded-full flex items-center justify-center mb-4">
                <BrainCircuit className="h-6 w-6 text-fitness-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Fitness Coach</h3>
              <p className="text-gray-600">
                Get real-time advice, answers to fitness questions, and motivation when you need it most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our streamlined process makes it easy to start your fitness journey with FitWise AI Studio
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-fitness-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-fitness-primary">1</span>
              </div>
              <h3 className="font-bold mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your account with just your phone number</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-fitness-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-fitness-primary">2</span>
              </div>
              <h3 className="font-bold mb-2">Set Goals</h3>
              <p className="text-gray-600">Define your fitness objectives and preferences</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-fitness-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-fitness-primary">3</span>
              </div>
              <h3 className="font-bold mb-2">Get Plans</h3>
              <p className="text-gray-600">Receive customized workout and diet plans</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-fitness-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-fitness-primary">4</span>
              </div>
              <h3 className="font-bold mb-2">Track Progress</h3>
              <p className="text-gray-600">Monitor your improvements and stay motivated</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-fitness text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Fitness Journey?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join FitWise AI Studio today and experience the future of personalized fitness coaching.
          </p>
          <a href="#top" className="bg-white text-fitness-primary font-semibold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors">
            Get Started Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <Dumbbell className="h-8 w-8 text-fitness-accent mr-2" />
                <span className="text-xl font-bold">FitWise AI Studio</span>
              </div>
              <p className="mt-2 text-gray-400 max-w-xs">
                Transforming fitness with AI-powered personal training and nutrition guidance.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Features</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Workout Plans</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Diet Recommendations</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Progress Tracking</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">AI Assistant</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} FitWise AI Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
