
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BicepsFlexed, Calendar, Dumbbell, ChevronDown, ChevronUp, CheckSquare } from "lucide-react";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  description?: string;
}

interface WorkoutPlan {
  name: string;
  description: string;
  exercises: Exercise[];
}

const splitPlans: Record<string, WorkoutPlan> = {
  push: {
    name: "Push Day",
    description: "Focus on chest, shoulders, and triceps",
    exercises: [
      { name: "Bench Press", sets: 4, reps: "8-10", rest: "90 sec", description: "Keep your feet flat on the floor and maintain a natural arch in your lower back." },
      { name: "Overhead Press", sets: 3, reps: "10-12", rest: "60 sec", description: "Keep your core tight and avoid arching your back during the movement." },
      { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "60 sec" },
      { name: "Lateral Raises", sets: 3, reps: "12-15", rest: "45 sec" },
      { name: "Tricep Pushdowns", sets: 3, reps: "12-15", rest: "45 sec" },
      { name: "Overhead Tricep Extension", sets: 3, reps: "12-15", rest: "45 sec" },
    ],
  },
  pull: {
    name: "Pull Day",
    description: "Focus on back and biceps",
    exercises: [
      { name: "Deadlift", sets: 4, reps: "6-8", rest: "120 sec", description: "Keep your back straight and push through your heels." },
      { name: "Pull-ups", sets: 3, reps: "8-10", rest: "90 sec" },
      { name: "Barbell Rows", sets: 3, reps: "8-12", rest: "60 sec" },
      { name: "Face Pulls", sets: 3, reps: "12-15", rest: "45 sec" },
      { name: "Bicep Curls", sets: 3, reps: "10-12", rest: "45 sec" },
      { name: "Hammer Curls", sets: 3, reps: "10-12", rest: "45 sec" },
    ],
  },
  legs: {
    name: "Leg Day",
    description: "Focus on quadriceps, hamstrings, and calves",
    exercises: [
      { name: "Squats", sets: 4, reps: "8-10", rest: "120 sec", description: "Keep your knees in line with your toes and go as deep as comfortably possible." },
      { name: "Romanian Deadlift", sets: 3, reps: "10-12", rest: "90 sec" },
      { name: "Leg Press", sets: 3, reps: "10-12", rest: "60 sec" },
      { name: "Leg Extensions", sets: 3, reps: "12-15", rest: "45 sec" },
      { name: "Leg Curls", sets: 3, reps: "12-15", rest: "45 sec" },
      { name: "Calf Raises", sets: 4, reps: "15-20", rest: "30 sec" },
    ],
  },
};

const muscleGroups: Record<string, WorkoutPlan> = {
  chest: {
    name: "Chest Workout",
    description: "Comprehensive chest development",
    exercises: [
      { name: "Flat Bench Press", sets: 4, reps: "8-10", rest: "90 sec" },
      { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "60 sec" },
      { name: "Decline Push-ups", sets: 3, reps: "12-15", rest: "60 sec" },
      { name: "Cable Flyes", sets: 3, reps: "12-15", rest: "45 sec" },
      { name: "Chest Dips", sets: 3, reps: "10-12", rest: "60 sec" },
    ],
  },
  back: {
    name: "Back Workout",
    description: "Build a stronger, wider back",
    exercises: [
      { name: "Deadlifts", sets: 4, reps: "6-8", rest: "120 sec" },
      { name: "Pull-ups", sets: 3, reps: "8-10", rest: "90 sec" },
      { name: "Barbell Rows", sets: 3, reps: "8-12", rest: "60 sec" },
      { name: "Lat Pulldowns", sets: 3, reps: "10-12", rest: "60 sec" },
      { name: "Seated Rows", sets: 3, reps: "10-12", rest: "60 sec" },
    ],
  },
  legs: {
    name: "Legs Workout",
    description: "Complete leg development",
    exercises: [
      { name: "Squats", sets: 4, reps: "8-10", rest: "120 sec" },
      { name: "Leg Press", sets: 3, reps: "10-12", rest: "90 sec" },
      { name: "Romanian Deadlifts", sets: 3, reps: "10-12", rest: "90 sec" },
      { name: "Walking Lunges", sets: 3, reps: "12 per leg", rest: "60 sec" },
      { name: "Calf Raises", sets: 4, reps: "15-20", rest: "30 sec" },
    ],
  },
  arms: {
    name: "Arms Workout",
    description: "Focus on biceps and triceps",
    exercises: [
      { name: "Barbell Curls", sets: 3, reps: "10-12", rest: "60 sec" },
      { name: "Skull Crushers", sets: 3, reps: "10-12", rest: "60 sec" },
      { name: "Hammer Curls", sets: 3, reps: "10-12", rest: "45 sec" },
      { name: "Tricep Pushdowns", sets: 3, reps: "12-15", rest: "45 sec" },
      { name: "Preacher Curls", sets: 3, reps: "10-12", rest: "45 sec" },
      { name: "Overhead Tricep Extensions", sets: 3, reps: "12-15", rest: "45 sec" },
    ],
  },
};

const WorkoutTab: React.FC = () => {
  const [selectedSplit, setSelectedSplit] = useState("push");
  const [selectedMuscle, setSelectedMuscle] = useState("chest");
  const [expandedExercises, setExpandedExercises] = useState<Record<string, boolean>>({});

  const toggleExercise = (exerciseName: string) => {
    setExpandedExercises(prev => ({
      ...prev,
      [exerciseName]: !prev[exerciseName]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-fitness rounded-lg p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2 flex items-center">
          <Dumbbell className="mr-2 h-6 w-6" />
          Workout Plans
        </h2>
        <p>Customize your training with our specialized workout plans</p>
      </div>

      <Tabs defaultValue="splits" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="splits" className="text-base">
            <Calendar className="h-4 w-4 mr-2" />
            Training Splits
          </TabsTrigger>
          <TabsTrigger value="muscles" className="text-base">
            <BicepsFlexed className="h-4 w-4 mr-2" />
            Muscle Groups
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="splits" className="pt-4">
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Button 
              variant={selectedSplit === "push" ? "default" : "outline"}
              className={selectedSplit === "push" ? "bg-fitness-primary" : "border-fitness-primary text-fitness-primary"}
              onClick={() => setSelectedSplit("push")}
            >
              Push
            </Button>
            <Button 
              variant={selectedSplit === "pull" ? "default" : "outline"}
              className={selectedSplit === "pull" ? "bg-fitness-primary" : "border-fitness-primary text-fitness-primary"}
              onClick={() => setSelectedSplit("pull")}
            >
              Pull
            </Button>
            <Button 
              variant={selectedSplit === "legs" ? "default" : "outline"}
              className={selectedSplit === "legs" ? "bg-fitness-primary" : "border-fitness-primary text-fitness-primary"}
              onClick={() => setSelectedSplit("legs")}
            >
              Legs
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>{splitPlans[selectedSplit].name}</CardTitle>
              <p className="text-sm text-gray-500">{splitPlans[selectedSplit].description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {splitPlans[selectedSplit].exercises.map((exercise, index) => (
                  <div key={index} className="border rounded-md overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleExercise(exercise.name)}
                    >
                      <div className="font-medium">{exercise.name}</div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">{exercise.sets} sets × {exercise.reps}</span>
                        {expandedExercises[exercise.name] ? (
                          <ChevronUp className="h-5 w-5 text-fitness-primary" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-fitness-primary" />
                        )}
                      </div>
                    </div>
                    
                    {expandedExercises[exercise.name] && (
                      <div className="p-3 bg-gray-50 border-t">
                        <div className="grid grid-cols-3 gap-4 mb-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-500">Sets:</span> {exercise.sets}
                          </div>
                          <div>
                            <span className="font-medium text-gray-500">Reps:</span> {exercise.reps}
                          </div>
                          <div>
                            <span className="font-medium text-gray-500">Rest:</span> {exercise.rest}
                          </div>
                        </div>
                        {exercise.description && (
                          <div className="text-sm mt-2">
                            <span className="font-medium text-gray-500">Tip:</span> {exercise.description}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-6 bg-gradient-fitness">
                <CheckSquare className="mr-2 h-4 w-4" />
                Start Workout
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="muscles" className="pt-4">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button 
              variant={selectedMuscle === "chest" ? "default" : "outline"}
              className={selectedMuscle === "chest" ? "bg-fitness-primary" : "border-fitness-primary text-fitness-primary"}
              onClick={() => setSelectedMuscle("chest")}
            >
              Chest
            </Button>
            <Button 
              variant={selectedMuscle === "back" ? "default" : "outline"}
              className={selectedMuscle === "back" ? "bg-fitness-primary" : "border-fitness-primary text-fitness-primary"}
              onClick={() => setSelectedMuscle("back")}
            >
              Back
            </Button>
            <Button 
              variant={selectedMuscle === "legs" ? "default" : "outline"}
              className={selectedMuscle === "legs" ? "bg-fitness-primary" : "border-fitness-primary text-fitness-primary"}
              onClick={() => setSelectedMuscle("legs")}
            >
              Legs
            </Button>
            <Button 
              variant={selectedMuscle === "arms" ? "default" : "outline"}
              className={selectedMuscle === "arms" ? "bg-fitness-primary" : "border-fitness-primary text-fitness-primary"}
              onClick={() => setSelectedMuscle("arms")}
            >
              Arms
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>{muscleGroups[selectedMuscle].name}</CardTitle>
              <p className="text-sm text-gray-500">{muscleGroups[selectedMuscle].description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {muscleGroups[selectedMuscle].exercises.map((exercise, index) => (
                  <div key={index} className="border rounded-md overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleExercise(`muscle-${exercise.name}`)}
                    >
                      <div className="font-medium">{exercise.name}</div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">{exercise.sets} sets × {exercise.reps}</span>
                        {expandedExercises[`muscle-${exercise.name}`] ? (
                          <ChevronUp className="h-5 w-5 text-fitness-primary" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-fitness-primary" />
                        )}
                      </div>
                    </div>
                    
                    {expandedExercises[`muscle-${exercise.name}`] && (
                      <div className="p-3 bg-gray-50 border-t">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-500">Sets:</span> {exercise.sets}
                          </div>
                          <div>
                            <span className="font-medium text-gray-500">Reps:</span> {exercise.reps}
                          </div>
                          <div>
                            <span className="font-medium text-gray-500">Rest:</span> {exercise.rest}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-6 bg-gradient-fitness">
                <CheckSquare className="mr-2 h-4 w-4" />
                Start Workout
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkoutTab;
