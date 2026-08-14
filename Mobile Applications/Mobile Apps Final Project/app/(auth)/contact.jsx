import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { View, FlatList, Pressable, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Image } from "react-native";
import { Link,  } from "expo-router";
import CustomScreen from "../../components/CustomScreen";
import CustomText from "../../components/CustomText";
import Spacer from "../../components/Spacer";
import CustomButton from "../../components/CustomButton";
import Logo from "../../assets/apothecary.png";
import ConfettiCannon from "react-native-confetti-cannon";

// Email validation helper
function isValidEmailAddress(email) {
  const regExp = /^([a-zA-Z0-9_.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regExp.test(email);
}

export default function Contact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  

  // Validate form and set errors
  function validate() {
    let newErrors = {};
    let isValid = true;

    if (!firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmailAddress(email)) {
      newErrors.email = "Email is not valid";
      isValid = false;
    }

    if (!message) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  // Submit handler
  async function handleSubmit() {
    if (!validate()) return; 

       setIsLoading(true);
    
      try {
          console.log("Valid Contact Form:", { firstName, lastName, email, message });
      

          Alert.alert("Great to Hear from you!", 
            "Thank you for contacting us we will get back to you as soon as we can!",
            [{text: "OK", onPress: () => setShowConfetti(true)}]
            );
        
          
          

          // Clear form and errors
          setFirstName('');
          setLastName('');
          setEmail('');
          setMessage('');
          setErrors({});
        } finally {
          setIsLoading(false);
      }
  }

 return (
    <CustomScreen>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.page}>
          <FlatList
            data={[]}
            keyExtractor={() => "empty"}
            renderItem={null}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListHeaderComponentStyle={styles.headerCenter}
            ListHeaderComponent={
              <View style={styles.form}>
                <View style={styles.homeRow}>
                  <Link href="/" asChild>
                    <Pressable style={styles.homeBtn} disabled={isLoading}>
                      <Text style={styles.homeBtnText}>Home</Text>
                    </Pressable>
                  </Link>
                </View>

                <Image source={Logo} style={styles.logo} />
                <CustomText title>Contact Us</CustomText>
                <Text style={styles.subtitle}>We’d love to hear from you!</Text>
                <Spacer height={40} />

                <CustomText style={styles.label}>First Name</CustomText>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                />
                {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

                <CustomText style={styles.label}>Last Name</CustomText>
                <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                />
                {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

                <CustomText style={styles.label}>Email</CustomText>
                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <CustomText style={styles.label}>Message</CustomText>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  multiline
                  textAlignVertical="top"
                  value={message}
                  onChangeText={setMessage}
                />
                {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}

                <CustomButton style={styles.submitBtn} onPress={handleSubmit}>
                  <Text style={styles.submitBtnText}>
                    Send Message
                  </Text>
                </CustomButton>

                {showConfetti && (
                  <ConfettiCannon
                    count={150}
                    origin={{ x: 200, y: 0 }}
                    fadeOut
                    onAnimationEnd={() => setShowConfetti(false)}
                  />
                )}

                <StatusBar style="auto" />
              </View>
            }
          />
        </View>
      </KeyboardAvoidingView>
    </CustomScreen>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    maxWidth: 520,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 18,
  },
  headerCenter: {
    width: "100%",
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 18,
    alignItems: "center",
  },

  form: {
    width: "100%",
    alignItems: "center",
  },

  homeRow: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },

  subtitle: {
    textAlign: "center",
    opacity: 0.8,
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5,
    width: "100%",
    maxWidth: 420,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
    marginBottom: 5,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    width: "100%",
    maxWidth: 420,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    width: "100%",
    maxWidth: 420,
  },

  submitBtn: {
    marginTop: 20,
    width: "100%",
    maxWidth: 420,
  },
  submitBtnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});