import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, commonStyles } from '../constants/styles';

export default function LoginScreen() {
  const [email, setEmail] = useState(''); // Using email based on image
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // Clear any existing data first
      await AsyncStorage.clear();
      // Store new user data
      await AsyncStorage.setItem('user', JSON.stringify({ email }));
      router.replace('/chat');
    } catch (error) {
      Alert.alert('Error', 'Failed to login');
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook' | 'apple') => {
    console.log(`Continue with ${provider}`);
    // Future: Implement social login logic
    Alert.alert('Social Login', `Continue with ${provider} - Not implemented`);
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
            <Ionicons name="chatbubbles" size={50} color={COLORS.primary} style={styles.appIconPlaceholder} />
            <Text style={commonStyles.title}>SCÉAL</Text>
            <Text style={commonStyles.subtitle}>Create an account or log in to explore about our app</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.loginForm}>
              <Text style={commonStyles.label}>Email</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="loisbecket@gmail.com"
                placeholderTextColor={COLORS.text.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={commonStyles.label}>Password</Text>
              <TextInput
                style={commonStyles.input}
                placeholder="********"
                placeholderTextColor={COLORS.text.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.rememberMe}>
                  <View style={styles.checkboxPlaceholder} />
                  <Text style={styles.optionsText}>Remember me</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={commonStyles.button} onPress={handleLogin}>
                <Text style={commonStyles.buttonText}>Log In</Text>
              </TouchableOpacity>

              <Text style={styles.orText}>Or</Text>

              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={commonStyles.socialButton} onPress={() => handleSocialLogin('google')}>
                  <Ionicons name="logo-google" size={24} color="#DB4437" />
                </TouchableOpacity>

                <TouchableOpacity style={commonStyles.socialButton} onPress={() => handleSocialLogin('facebook')}>
                  <Ionicons name="logo-facebook" size={24} color="#4267B2" />
                </TouchableOpacity>

                <TouchableOpacity style={commonStyles.socialButton} onPress={() => handleSocialLogin('apple')}>
                  <Ionicons name="logo-apple" size={24} color="#000000" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={commonStyles.link} onPress={() => router.push('/signup')}>
              <Text style={commonStyles.linkText}>Don't have an account? <Text style={{ color: '#007AFF', fontFamily: FONTS.bold }}>Sign Up</Text></Text>
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
  loginForm: {
    // Styles specific to login form if needed
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxPlaceholder: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    marginRight: 8,
  },
  optionsText: {
    fontSize: 14,
    color: COLORS.text.primary,
    fontFamily: FONTS.regular,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: COLORS.text.primary,
    fontFamily: FONTS.regular,
  },
  orText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    gap: 20,
  },
}); 