import { useState } from "react";
import { View, Pressable, ScrollView, Text, TextInput, StyleSheet, Alert, ActivityIndicator, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import ConfettiCannon from "react-native-confetti-cannon";

import CustomScreen from "../../components/CustomScreen";
import CustomText from "../../components/CustomText";
import Spacer from "../../components/Spacer";
import CustomButton from "../../components/CustomButton";
import Logo from "../../assets/apothecary.png";

import { useAuth } from "../../components/AuthContext";
import { createUserAsAdmin, setUserPasswordAsAdmin } from "../../api/users";

const Register = () => {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  const isAdmin = user?.roleId === 1 || user?.role === "Admin";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const validate = () => {
    const nextErrors = {};

    if (!firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!lastName.trim()) nextErrors.lastName = "Last name is required.";

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!email.includes("@")) {
      nextErrors.email = "Enter a valid email.";
    }

    if (!password) nextErrors.password = "Password is required.";
    if (password && password.length < 8) nextErrors.password = "Password must be at least 8 characters.";

    if (!confirmPassword) nextErrors.confirmPassword = "Please confirm your password.";
    if (password && confirmPassword && password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const getNiceError = (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) return "Admin access required.";
    if (status === 400) {
      // backend might return { message, errors }
      const apiErrors = error?.response?.data?.errors;
      if (apiErrors && typeof apiErrors === "object") {
        setErrors(apiErrors);
        return null;
      }
      return "Please check the fields and try again.";
    }

    const msg = String(error?.response?.data?.message || "");
    if (msg.toLowerCase().includes("duplicate") || msg.toLowerCase().includes("unique")) {
      return "That email is already in use.";
    }

    if (error?.message?.toLowerCase?.().includes("network")) {
      return "Network error. Check your connection and try again.";
    }

    return "Failed to create user. Please try again.";
  };

  const handleCreate = async () => {
    if (!validate()) return;

    setSaving(true);
    setErrors({});

    try {
      // Step 1: Create user row (admin-only)
      const created = await createUserAsAdmin({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password
      });

      const newId = created?.id;
      if (!newId) {
        throw new Error("User created but no id returned.");
      }

      // Step 2: Set hashed password via update (this triggers setUserPassword on backend)
      await setUserPasswordAsAdmin({
        id: newId,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password
      });

           // Clear form
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setErrors({});

          // Trigger confetti
          setShowConfetti(true);

        Alert.alert(
          "Account Created!",
          "Thank you for creating a new account – Admin.",
          [{ text: "Awesome!" }]
        );
     

    } catch (error) {
      const nice = getNiceError(error);
      if (nice) setErrors((prev) => ({ ...prev, form: nice }));
      setPassword("");
      setConfirmPassword("");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return null;

  // If not logged in or not admin, show a friendly message instead of a broken form
  if (!isAuthenticated || !isAdmin) {
    return (
      <CustomScreen>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <Image source={Logo} style={styles.logo} />
            <CustomText title="Register" />
            <Text>This screen is admin-only right now.</Text>
            <Spacer height={16} />

            <Link href="/login" style={styles.link}>Go to Login</Link>
            <Link href="/" style={styles.link}>Back to Home</Link>
          </View>
        </ScrollView>
      </CustomScreen>
    );
  }

  return (
    <CustomScreen>
      <ScrollView style={styles.scrollView}>

        <View style={styles.topNav}>
          <Link href="/" asChild>
            <Pressable
              style={styles.homeBtn}
              disabled={isLoading}
              hitSlop={12}>

              <Text style={styles.homeBtnText}>Home</Text>

            </Pressable>
          </Link>
        </View>

      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} />
        <CustomText title="Create Standard User" />
        <Text>Admins can create standard users here.</Text>

        <Spacer height={24} />

        {!!errors.form && <Text style={styles.errorText}>{errors.form}</Text>}

        <CustomText style={styles.label}>First Name</CustomText>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
          editable={!saving}
        />
        {!!errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

        <CustomText style={styles.label}>Last Name</CustomText>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="words"
          editable={!saving}
        />
        {!!errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

        <CustomText style={styles.label}>Email</CustomText>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!saving}
        />
        {!!errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <CustomText style={styles.label}>Password</CustomText>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          editable={!saving}
        />
        {!!errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <CustomText style={styles.label}>Confirm Password</CustomText>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
          editable={!saving}
        />
        {!!errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

        <Spacer height={16} />

        <CustomButton style={{ width: "80%" }} onPress={handleCreate} disabled={saving}>
          {saving ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
              Create user
            </Text>
          )}
        </CustomButton>
          {/* ConfettiCannon effect */}
              {showConfetti && (
                <ConfettiCannon
                  count={150}
                  origin={{ x: 200, y: 0 }}
                  fadeOut
                  onAnimationEnd={() => setShowConfetti(false)}
                />
              )}

        <Spacer height={14} />
        <Link href="/users" style={styles.link}>Back to Admin</Link>
      </View>
      </ScrollView>
    </CustomScreen>
  );
};

export default Register;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 16,
    paddingBottom: 24,
  },

  topNav: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },

  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 20,
    marginBottom: 10
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    width: "80%",
    paddingHorizontal: 10,
    borderRadius: 8
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
    width: "80%"
  },
  errorText: {
    width: "80%",
    marginBottom: 10,
    color: "#cc0000",
    fontWeight: "600"
  },
  link: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 8
  }
});