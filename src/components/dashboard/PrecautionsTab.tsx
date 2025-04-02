import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { getSafetyTips, chatWithAI } from "@/services/aiService";
import { AlertTriangle, MessageSquare, Send, Shield, HeartCrack, Stethoscope } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const PrecautionsTab: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your fitness assistant. How can I help you with your fitness journey today?"
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const safetyTips = getSafetyTips();
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const userMessage: Message = {
      role: "user",
      content: newMessage
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);
    
    try {
      const response = await chatWithAI([...messages, userMessage]);
      
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: response
        }
      ]);
    } catch (error) {
      console.error("Error chatting with AI:", error);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again later."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Get the appropriate icon for each category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Muscle Recovery":
        return <Stethoscope className="h-5 w-5 text-blue-500" />;
      case "Cravings Management":
        return <HeartCrack className="h-5 w-5 text-red-500" />;
      case "Injury Prevention":
        return <Shield className="h-5 w-5 text-green-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-fitness rounded-lg p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2 flex items-center">
          <AlertTriangle className="mr-2 h-6 w-6" />
          Safety Precautions
        </h2>
        <p>Important tips and advice to keep your fitness journey safe</p>
      </div>
      
      {/* Payment Alert - Example for demo purposes */}
      {Math.random() > 0.5 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h3 className="font-medium text-red-800">Payment Reminder</h3>
            <p className="text-sm text-red-700 mt-1">
              Your membership fee is due in 5 days. Please make the payment to avoid any interruption to your gym access.
            </p>
            <Button className="mt-2 bg-red-600 hover:bg-red-700 text-white">
              Pay Now
            </Button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h3 className="font-medium text-lg">Safety Tips</h3>
          
          {safetyTips.map((category, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  {getCategoryIcon(category.category)}
                  <span className="ml-2">{category.category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2">
                      <div className="h-5 w-5 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-fitness-primary"></div>
                      </div>
                      <span className="text-sm text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Fitness Assistant</h3>
          
          <Card className="flex flex-col h-[600px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-fitness-primary" />
                Chat with AI Fitness Coach
              </CardTitle>
              <CardDescription>
                Ask questions about workouts, nutrition, or fitness advice
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user" 
                          ? "bg-fitness-primary text-white" 
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  disabled={isLoading || !newMessage.trim()}
                  className="bg-fitness-primary"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrecautionsTab;
