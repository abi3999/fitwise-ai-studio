
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { Dumbbell, Calendar, TrendingUp, Edit, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ProfileTabProps {
  onViewWorkoutPlan: () => void;
}

const getMotivationalQuote = (attendanceCount: number) => {
  if (attendanceCount === 0) {
    return "The journey of a thousand miles begins with a single step. Start today!";
  } else if (attendanceCount < 5) {
    return "Consistency is key. Keep showing up, and results will follow!";
  } else if (attendanceCount < 10) {
    return "Progress is progress, no matter how small. You're doing great!";
  } else if (attendanceCount < 20) {
    return "Your dedication is inspiring! Keep pushing your limits!";
  } else {
    return "You're a fitness warrior! Your commitment is truly remarkable!";
  }
};

const ProfileTab: React.FC<ProfileTabProps> = ({ onViewWorkoutPlan }) => {
  const { user, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    height: user?.height || 175,
    weight: user?.weight || 70
  });

  const attendanceCount = user?.attendance?.length || 0;
  const motivationalQuote = getMotivationalQuote(attendanceCount);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: name === 'name' ? value : Number(value)
    }));
  };

  const handleSaveProfile = () => {
    // Validate inputs
    if (!profileData.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    
    if (profileData.height <= 0 || profileData.weight <= 0) {
      toast.error("Height and weight must be positive values");
      return;
    }

    // Update user data
    updateUser({
      name: profileData.name,
      height: profileData.height,
      weight: profileData.weight
    });
    
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleCancelEdit = () => {
    // Reset form data to current user data
    setProfileData({
      name: user?.name || "",
      height: user?.height || 175,
      weight: user?.weight || 70
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-redblack rounded-lg p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome, {user?.name || "Fitness Enthusiast"}!</h2>
        <p className="text-sm opacity-90">{motivationalQuote}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="fitness-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-redblack-primary" />
              Your Stats
            </CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => isEditing ? handleCancelEdit() : setIsEditing(true)}
              className="h-8 w-8"
            >
              {isEditing ? (
                <span className="text-red-500">X</span>
              ) : (
                <Edit className="h-4 w-4 text-redblack-primary" />
              )}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              // Edit mode
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    value={profileData.height}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    value={profileData.weight}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <Button 
                  className="w-full mt-4 button-hover-effect bg-redblack-primary" 
                  onClick={handleSaveProfile}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Profile
                </Button>
              </div>
            ) : (
              // View mode
              <>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Height</span>
                  <span className="font-semibold">{user?.height || 175} cm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Weight</span>
                  <span className="font-semibold">{user?.weight || 70} kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">BMI</span>
                  <span className="font-semibold">
                    {user?.height && user?.weight
                      ? (user.weight / ((user.height / 100) * (user.height / 100))).toFixed(1)
                      : "22.9"}
                  </span>
                </div>
                <Button className="w-full mt-4 button-hover-effect bg-redblack-primary" onClick={onViewWorkoutPlan}>
                  <Dumbbell className="mr-2 h-4 w-4" />
                  View Workout Plan
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="fitness-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-redblack-primary" />
              Attendance History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Total Visits</span>
                <Badge variant="secondary" className="bg-redblack-primary">
                  {attendanceCount}
                </Badge>
              </div>
              <div className="bg-muted h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-redblack-primary h-full rounded-full"
                  style={{ width: `${Math.min(attendanceCount * 3.33, 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {30 - attendanceCount} more visits to reach monthly goal
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 14 }).map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const dateStr = date.toISOString().split('T')[0];
                const attended = user?.attendance?.includes(dateStr);
                
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-full flex items-center justify-center text-xs ${
                      attended
                        ? "bg-redblack-primary text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                    title={dateStr}
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileTab;
