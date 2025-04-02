
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Phone, Lock } from "lucide-react";

const PhoneLogin: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would be an API call to send OTP
    // For demo, we'll just simulate a delay
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to ${phoneNumber}`,
      });
    }, 1000);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(phoneNumber, otp);
      
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome to FitWise AI Studio!",
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid OTP. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">FitWise AI Studio</CardTitle>
        <CardDescription className="text-center">
          {otpSent ? "Enter the OTP sent to your phone" : "Login with your phone number"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-gray-500" />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-fitness"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-gray-500" />
              <Input
                type="text"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="flex-1"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-fitness"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          {otpSent ? (
            <button 
              onClick={() => setOtpSent(false)} 
              className="text-fitness-primary hover:underline"
            >
              Change phone number
            </button>
          ) : (
            "You'll receive a 6-digit code to verify"
          )}
        </p>
      </CardFooter>
    </Card>
  );
};

export default PhoneLogin;
