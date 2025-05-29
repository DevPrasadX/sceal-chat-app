import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FONTS } from '../../constants/styles';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [step, setStep] = useState<'request' | 'verify' | 'change'>('request');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRequestOTP = () => {
    // Here you would typically send OTP to user's email/phone
    Alert.alert('OTP Sent', 'Please check your email for the OTP');
    setStep('verify');
  };

  const handleVerifyOTP = () => {
    // Here you would typically verify the OTP
    if (otp.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP');
      return;
    }
    setStep('change');
  };

  const handleChangePassword = () => {
    if (newPassword.length < 8) {
      Alert.alert('Invalid Password', 'Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }

    // Here you would typically update the password
    Alert.alert('Success', 'Password changed successfully', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const renderRequestStep = () => (
    <View style={styles.card}>
      <Text style={styles.description}>
        To change your password, we'll send a verification code to your registered email address.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleRequestOTP}>
        <Text style={styles.buttonText}>Send Verification Code</Text>
      </TouchableOpacity>
    </View>
  );

  const renderVerifyStep = () => (
    <View style={styles.card}>
      <Text style={styles.description}>
        Enter the 6-digit verification code sent to your email.
      </Text>
      <View style={styles.otpContainer}>
        <TextInput
          style={styles.otpInput}
          value={otp}
          onChangeText={setOtp}
          placeholder="Enter OTP"
          placeholderTextColor="#666"
          keyboardType="number-pad"
          maxLength={6}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify Code</Text>
      </TouchableOpacity>
    </View>
  );

  const renderChangeStep = () => (
    <View style={styles.card}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>New Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password"
            placeholderTextColor="#666"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
            placeholderTextColor="#666"
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <MaterialIcons
              name={showConfirmPassword ? 'visibility' : 'visibility-off'}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Change Password</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.section}>
            {step === 'request' && renderRequestStep()}
            {step === 'verify' && renderVerifyStep()}
            {step === 'change' && renderChangeStep()}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#252525',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: '#fff',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#252525',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  description: {
    fontSize: 15,
    fontFamily: FONTS.regular,
    color: '#ccc',
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#FF6B00',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  otpContainer: {
    marginBottom: 20,
  },
  otpInput: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 24,
    fontFamily: FONTS.regular,
    textAlign: 'center',
    letterSpacing: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: '#999',
    marginBottom: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingRight: 12,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.regular,
  },
  eyeIcon: {
    padding: 4,
  },
}); 