
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMotivationalQuote } from "@/services/aiService";
import { User, Calendar, ArrowRight, LineChart } from "lucide-react";

const ProfileTab: React.FC = () => {
  const { user } = useAuth();
  const [quote, setQuote] = useState<string>("");
  
  useEffect(() => {
    if (user?.attendance) {
      setQuote(getMotivationalQuote(user.attendance));
    } else {
      setQuote(getMotivationalQuote());
    }
  }, [user]);

  if (!user) return null;

  // Calculate attendance stats
  const attendanceCount = user.attendance?.length || 0;
  const currentMonth = new Date().getMonth();
  const currentMonthAttendance = user.attendance?.filter(date => 
    new Date(date).getMonth() === currentMonth
  ).length || 0;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-fitness rounded-lg p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome, {user.name}</h2>
        <p className="text-lg italic">"{quote}"</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <User className="h-4 w-4 mr-2" />
              Profile Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Height:</dt>
                <dd className="text-sm font-semibold">{user.height || "-"} cm</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Weight:</dt>
                <dd className="text-sm font-semibold">{user.weight || "-"} kg</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">BMI:</dt>
                <dd className="text-sm font-semibold">
                  {user.height && user.weight 
                    ? (user.weight / ((user.height / 100) ** 2)).toFixed(1)
                    : "-"}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">This Month:</dt>
                <dd className="text-sm font-semibold">{currentMonthAttendance} days</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Total:</dt>
                <dd className="text-sm font-semibold">{attendanceCount} days</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Last Visit:</dt>
                <dd className="text-sm font-semibold">
                  {user.attendance && user.attendance.length > 0
                    ? new Date(user.attendance[user.attendance.length - 1]).toLocaleDateString()
                    : "No visits recorded"}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <LineChart className="h-4 w-4 mr-2" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[calc(100%-2rem)]">
            <Button className="w-full bg-gradient-fitness">
              <span>View Workout Plans</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <h3 className="font-medium text-lg mb-2">Recent Activity</h3>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {user.attendance && user.attendance.length > 0 ? (
              [...user.attendance].reverse().slice(0, 5).map((date, index) => (
                <div key={index} className="flex items-center p-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-fitness-light flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-fitness-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Gym Visit</p>
                    <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">No activity recorded yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
