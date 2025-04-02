
import React, { createContext, useContext, useState, useEffect } from "react";

type UserRole = "user" | "admin";

interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  height?: number;
  weight?: number;
  attendance?: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (phone: string, otp: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, check for stored tokens and validate session
    const storedUser = localStorage.getItem("fitwiseUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (phone: string, otp: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call to verify OTP
      // For demo purposes, any 6-digit OTP is valid
      if (otp.length === 6) {
        // Demo user data
        const newUser: User = {
          id: "user1",
          name: "John Doe",
          phone,
          // Set admin role for specific phone numbers
          role: phone === "+91 8309285636" || phone === "1234567890" ? "admin" : "user",
          height: 175,
          weight: 70,
          attendance: ["2023-09-01", "2023-09-03", "2023-09-05"],
        };
        
        setUser(newUser);
        localStorage.setItem("fitwiseUser", JSON.stringify(newUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fitwiseUser");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("fitwiseUser", JSON.stringify(updatedUser));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
