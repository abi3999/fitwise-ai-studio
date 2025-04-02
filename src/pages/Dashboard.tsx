
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import ProfileTab from "@/components/dashboard/ProfileTab";
import WorkoutTab from "@/components/dashboard/WorkoutTab";
import DietTab from "@/components/dashboard/DietTab";
import PrecautionsTab from "@/components/dashboard/PrecautionsTab";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { User, Dumbbell, Salad, AlertTriangle } from "lucide-react";

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <Tabs 
          defaultValue="profile" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="profile" className="py-3">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="workout" className="py-3">
              <Dumbbell className="h-4 w-4 mr-2" />
              Workout
            </TabsTrigger>
            <TabsTrigger value="diet" className="py-3">
              <Salad className="h-4 w-4 mr-2" />
              Diet
            </TabsTrigger>
            <TabsTrigger value="precautions" className="py-3">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Precautions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <ProfileTab />
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
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-gray-500">
            <p>© 2023 FitWise AI Studio. All rights reserved.</p>
            <p className="mt-1">A modern gym experience with AI-powered fitness guidance.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
