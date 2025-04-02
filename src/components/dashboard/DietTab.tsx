
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { generateDietPlan } from "@/services/aiService";
import { Salad, UserPlus, BarChart, ArrowRight, RefreshCw } from "lucide-react";

type Goal = "gain" | "maintain" | "lose";

interface DietPlan {
  meals: {
    time: string;
    description: string;
    calories: number;
  }[];
  totalCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  tips: string[];
}

const DietTab: React.FC = () => {
  const { user } = useAuth();
  const [selectedGoal, setSelectedGoal] = useState<Goal>("maintain");
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateDiet = async () => {
    if (!user?.weight || !user?.height) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const plan = await generateDietPlan({
        goal: selectedGoal,
        weight: user.weight,
        height: user.height,
      });
      
      setDietPlan(plan);
    } catch (error) {
      console.error("Error generating diet plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-fitness rounded-lg p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2 flex items-center">
          <Salad className="mr-2 h-6 w-6" />
          Diet Planner
        </h2>
        <p>Get a personalized diet plan based on your goals</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Set Your Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <RadioGroup 
                value={selectedGoal} 
                onValueChange={(value) => setSelectedGoal(value as Goal)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gain" id="gain" />
                  <Label htmlFor="gain" className="flex items-center cursor-pointer">
                    <UserPlus className="h-5 w-5 mr-2 text-green-500" />
                    <div>
                      <div className="font-medium">Gain Weight</div>
                      <div className="text-sm text-gray-500">Build muscle mass</div>
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maintain" id="maintain" />
                  <Label htmlFor="maintain" className="flex items-center cursor-pointer">
                    <BarChart className="h-5 w-5 mr-2 text-blue-500" />
                    <div>
                      <div className="font-medium">Maintain Weight</div>
                      <div className="text-sm text-gray-500">Stay at current weight</div>
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lose" id="lose" />
                  <Label htmlFor="lose" className="flex items-center cursor-pointer">
                    <ArrowRight className="h-5 w-5 mr-2 text-red-500" />
                    <div>
                      <div className="font-medium">Lose Weight</div>
                      <div className="text-sm text-gray-500">Reduce body fat</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              
              <Button 
                onClick={handleGenerateDiet} 
                className="w-full bg-gradient-fitness"
                disabled={isLoading || !user?.weight || !user?.height}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Diet Plan"
                )}
              </Button>
              
              {(!user?.weight || !user?.height) && (
                <p className="text-sm text-red-500 text-center">
                  Height and weight information required to generate a diet plan.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Your Personalized Diet Plan</CardTitle>
          </CardHeader>
          <CardContent>
            {dietPlan ? (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-fitness-light rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-500">Calories</div>
                    <div className="text-xl font-bold text-fitness-primary">{dietPlan.totalCalories}</div>
                    <div className="text-xs">kcal/day</div>
                  </div>
                  <div className="bg-fitness-light rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-500">Protein</div>
                    <div className="text-xl font-bold text-fitness-primary">{dietPlan.proteinGrams}g</div>
                    <div className="text-xs">{Math.round((dietPlan.proteinGrams * 4 / dietPlan.totalCalories) * 100)}%</div>
                  </div>
                  <div className="bg-fitness-light rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-500">Carbs</div>
                    <div className="text-xl font-bold text-fitness-primary">{dietPlan.carbsGrams}g</div>
                    <div className="text-xs">{Math.round((dietPlan.carbsGrams * 4 / dietPlan.totalCalories) * 100)}%</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Daily Meal Plan</h3>
                  <div className="space-y-3">
                    {dietPlan.meals.map((meal, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">{meal.time}</div>
                          <div className="text-sm font-medium text-fitness-primary">{meal.calories} kcal</div>
                        </div>
                        <p className="text-sm text-gray-600">{meal.description}</p>
                        <Progress 
                          value={(meal.calories / dietPlan.totalCalories) * 100} 
                          className="h-1 mt-2" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Nutrition Tips</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {dietPlan.tips.map((tip, index) => (
                      <li key={index} className="text-sm text-gray-600">{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Salad className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-1">No Diet Plan Generated</h3>
                <p className="text-sm text-gray-400 text-center max-w-md">
                  Select your goal and click "Generate Diet Plan" to get personalized nutrition recommendations.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DietTab;
