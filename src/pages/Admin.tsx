
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import UserManagement from "@/components/admin/UserManagement";
import AttendanceLog from "@/components/admin/AttendanceLog";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Users, Calendar } from "lucide-react";

const Admin: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  // Redirect to login if not authenticated or not an admin
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600">Manage gym members and track attendance</p>
        </div>
        
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="users" className="py-3">
              <Users className="h-4 w-4 mr-2" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="attendance" className="py-3">
              <Calendar className="h-4 w-4 mr-2" />
              Attendance Log
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="attendance">
            <AttendanceLog />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-gray-500">
            <p>© 2023 FitWise AI Studio. All rights reserved.</p>
            <p className="mt-1">Admin Portal - Restricted Access</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Admin;
