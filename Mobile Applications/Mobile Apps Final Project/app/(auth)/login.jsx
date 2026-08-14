// Imports:
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, Image, ActivityIndicator, Pressable } from "react-native";
import { useRouter, Link } from "expo-router";

// Import Auth:
import { useAuth } from "../../components/AuthContext";

// Import API:
import { login as apiLogin } from "../../api/auth";

// Import Images:
import Logo from "../../assets/apothecary.png";

// Import Custom Components:
import CustomScreen from "../../components/CustomScreen";
import CustomText from "../../components/CustomText";
import Spacer from "../../components/Spacer";
import CustomButton from "../../components/CustomButton";

// Login Component:
const Login = () => {
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // LOGIN VALIDATION:
  const validate = (nextEmail, nextPassword) => {
    const nextErrors = {};

    if (!nextEmail?.trim()) {
      nextErrors.email = "Email is required.";
    }

    if (!nextPassword) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const getNiceLoginError = (error) => {
    const status = error?.response?.status;

    if (status === 401) return "Incorrect email or password.";
    if (status === 403) return "Your account does not have access.";
    if (status === 429) return "Too many attempts. Please try again in a bit.";
    if (error?.message?.toLowerCase?.().includes("network")) {
      return "Network error. Check your connection and try again.";
    }

    return "Login failed. Please try again.";
  };

  // LOGIN HANDLE (if validated):
  const handleLogin = async () => {
    if (!validate(email, password)) return;

    setIsLoading(true);
    setErrors({});

    try {
      const { user, token } = await apiLogin(email.trim(), password);

      if (!token) {
        throw new Error("No token returned from server.");
      }

      if (user?.active === false) {
        setErrors({ invalidLogin: "Your account is inactive. Please contact support." });
        setPassword("");
        return;
      }

      await authLogin(user, token);

      // Route based on role:
      const isAdmin = user?.roleId === 1 || user?.role === "Admin";
      router.replace(isAdmin ? "/users" : "/profile");
    } catch (error) {
      setErrors({ invalidLogin: getNiceLoginError(error) });
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomScreen>
      <Link href="/" asChild>
        <Pressable style={styles.homeBtn} disabled={isLoading}>
          <Text style={styles.homeBtnText}>Home</Text>
        </Pressable>
      </Link>

      <Image source={Logo} style={{ width: 100, height: 100, marginBottom: 20 }} />
      <CustomText title>Apothecary Project</CustomText>

      <Text>Welcome to the Apothecary!</Text>
      <Spacer height={40} />

      {!!errors.invalidLogin && (
        <Text style={styles.errorText}>{errors.invalidLogin}</Text>
      )}

      <CustomText style={styles.label}>Email</CustomText>
      <TextInput
        placeholder="Enter your email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!isLoading}
      />
      {!!errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <CustomText style={styles.label}>Password</CustomText>
      <TextInput
        placeholder="Enter your password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        secureTextEntry
        editable={!isLoading}
      />
      {!!errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <CustomButton
        style={{ margin: 20, width: "80%" }}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
            Login
          </Text>
        )}
      </CustomButton>

      <StatusBar style="auto" />
    </CustomScreen>
  );
};

export default Login;

const styles = StyleSheet.create({
  homeBtn: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginBottom: 12,
  },
  homeBtnText: {
    fontWeight: "700",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    width: "80%",
    paddingHorizontal: 10,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
    alignItems: "flex-start",
    width: "80%",
  },
  errorText: {
    width: "80%",
    marginBottom: 10,
    color: "#cc0000",
    fontWeight: "600",
  },
});