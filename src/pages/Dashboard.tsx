
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import ProfileTab from "@/components/dashboard/ProfileTab";
import WorkoutTab from "@/components/dashboard/WorkoutTab";
import DietTab from "@/components/dashboard/DietTab";
import PrecautionsTab from "@/components/dashboard/PrecautionsTab";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { User, Dumbbell, Salad, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Function to handle "View Workout Plan" button click
  const handleViewWorkoutPlan = () => {
    setActiveTab("workout");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground pb-16">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6 mb-16">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsContent value="profile">
            <ProfileTab onViewWorkoutPlan={handleViewWorkoutPlan} />
          </TabsContent>
          
          <TabsContent value="workout">
            <WorkoutTab />
          </TabsContent>
          
          <TabsContent value="diet">
            <DietTab />
          </TabsContent>
          
          <TabsContent value="precautions">
            <PrecautionsTab />
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Bottom Tab Bar */}
      <div className="bottom-tabs">
        <Button
          variant="ghost"
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center justify-center p-2 ${
            activeTab === "profile" ? "text-redblack-primary" : "text-muted-foreground"
          } button-hover-effect`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => setActiveTab("workout")}
          className={`flex flex-col items-center justify-center p-2 ${
            activeTab === "workout" ? "text-redblack-primary" : "text-muted-foreground"
          } button-hover-effect`}
        >
          <Dumbbell className="h-5 w-5" />
          <span className="text-xs mt-1">Workout</span>
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => setActiveTab("diet")}
          className={`flex flex-col items-center justify-center p-2 ${
            activeTab === "diet" ? "text-redblack-primary" : "text-muted-foreground"
          } button-hover-effect`}
        >
          <Salad className="h-5 w-5" />
          <span className="text-xs mt-1">Diet</span>
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => setActiveTab("precautions")}
          className={`flex flex-col items-center justify-center p-2 ${
            activeTab === "precautions" ? "text-redblack-primary" : "text-muted-foreground"
          } button-hover-effect`}
        >
          <AlertTriangle className="h-5 w-5" />
          <span className="text-xs mt-1">Precautions</span>
        </Button>
      </div>
      
      <footer className="bg-card border-t border-border py-4 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2023 FitWise AI Studio. All rights reserved.</p>
            <p className="mt-1">A modern gym experience with AI-powered fitness guidance.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
