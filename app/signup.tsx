import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, commonStyles } from '../constants/styles';

const placeholderAvatar = 'https://randomuser.me/api/portraits/men/10.jpg';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(placeholderAvatar);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSendOtp = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email to send OTP');
      return;
    }
    console.log('Sending OTP to:', email);
    setOtpSent(true);
    Alert.alert('OTP Sent', 'OTP sent to your email!');
  };

  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword || !otp) {
      Alert.alert('Error', 'Please fill in all fields and enter OTP');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    console.log('Signup successful with:', { name, email, password, avatar, otp });
    Alert.alert('Success', 'Account created!');
    router.replace('/login');
  };

  return (
    <LinearGradient
      colors={[COLORS.background.start, COLORS.background.end]}
      style={styles.gradientBackground}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={commonStyles.safeArea}>
        <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.scrollContent}>
          <View style={styles.topContainer}>
            <Text style={commonStyles.title}>Sign Up</Text>
            <Ionicons name="chatbubbles" size={50} color={COLORS.primary} style={styles.appIconPlaceholder} />
            <Text style={commonStyles.subtitle}>Create your account to explore our app</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.avatarBox}>
              <Image source={{ uri: avatar }} style={styles.avatar} />
              <TouchableOpacity style={styles.editAvatar} onPress={pickImage}>
                <Text style={styles.editAvatarText}>Choose Photo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signupForm}>
              <Text style={commonStyles.label}>Name</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="Enter your name"
                placeholderTextColor={COLORS.text.placeholder}
                value={name}
                onChangeText={setName}
              />

              <Text style={commonStyles.label}>Email</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.text.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={commonStyles.label}>OTP</Text>
              <View style={styles.otpContainer}>
                <TextInput
                  style={[commonStyles.input, styles.otpInput]}
                  placeholder="Enter OTP"
                  placeholderTextColor={COLORS.text.placeholder}
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                />
                {!otpSent ? (
                  <TouchableOpacity style={commonStyles.button} onPress={handleSendOtp}>
                    <Text style={commonStyles.buttonText}>Send OTP</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={[commonStyles.button, styles.resendOtpButton]} onPress={handleSendOtp}>
                    <Text style={commonStyles.buttonText}>Resend OTP</Text>
                  </TouchableOpacity>
                )}
              </View>

              <Text style={commonStyles.label}>Password</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="Create a password"
                placeholderTextColor={COLORS.text.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <Text style={commonStyles.label}>Confirm Password</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="Confirm your password"
                placeholderTextColor={COLORS.text.placeholder}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={commonStyles.button} onPress={handleSignup}>
              <Text style={commonStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={commonStyles.link} onPress={() => router.replace('/login')}>
              <Text style={commonStyles.linkText}>Already have an account? <Text style={{ color: '#007AFF', fontFamily: FONTS.bold }}>Log In</Text></Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  appIconPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    padding: 24,
  },
  avatarBox: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginBottom: 8,
  },
  editAvatar: {
    // Styles for the Choose Photo button
  },
  editAvatarText: {
    color: '#007AFF',
    fontFamily: FONTS.bold,
    fontSize: 14,
  },
  signupForm: {
    // Styles specific to signup form if needed
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  otpInput: {
    flex: 1,
    marginRight: 12,
    marginBottom: 0,
  },
  resendOtpButton: {
    backgroundColor: COLORS.background.end,
  },
}); 