import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("jwtToken");
      const storedUser = await AsyncStorage.getItem("userData");
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData, authToken) => {
    try {
      // Store token and user data
      await AsyncStorage.setItem("jwtToken", authToken);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      
      setToken(authToken);
      setUser(userData);
    } catch (error) {
      console.error("Error storing auth data:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Clear stored data
      await AsyncStorage.removeItem("jwtToken");
      await AsyncStorage.removeItem("userData");
      
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
};
