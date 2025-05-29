import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FONTS } from '../../constants/styles';

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Privacy Policy</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Introduction</Text>
            <View style={styles.card}>
              <Text style={[styles.bodyText, styles.justifyText]}>
                Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application [App Name]. Please read this policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the application.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Information We Collect</Text>
            <View style={styles.card}>
              <Text style={[styles.bodyText, styles.justifyText]}>
                We may collect information about you in a variety of ways. The information we may collect via the Application depends on the content and materials you use, and includes:
              </Text>
              <Text style={[styles.bodyText, styles.justifyText]}>
                Personal Data: Demographics and other personally identifiable information (such as your name and email address) that you voluntarily give to us when you choose to participate in various activities related to the Application, such as creating a profile.
              </Text>
               <Text style={[styles.bodyText, styles.justifyText, {marginTop: 8}]}>
                Derivative Data: Information our servers automatically collect when you access the Application, such as your native actions that are a part of the Application, and other interactions.
              </Text>
               <Text style={[styles.bodyText, styles.justifyText, {marginTop: 8}]}>
                Information from Third Parties: Information from third parties, such as personal information or network friends, if you connect the Application to a third-party service.
              </Text>
            </View>
          </View>
           <View style={styles.section}>
            <Text style={styles.sectionTitle}>How We Use Your Information</Text>
            <View style={styles.card}>
              <Text style={[styles.bodyText, styles.justifyText]}>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:
              </Text>
               <Text style={[styles.bodyText, styles.justifyText, {marginTop: 8}]}>
                - Create and manage your account.
              </Text>
              <Text style={[styles.bodyText, styles.justifyText, {marginTop: 4}]}>
                - Enable user-to-user communications.
              </Text>
              <Text style={[styles.bodyText, styles.justifyText, {marginTop: 4}]}>
                - Compile anonymous statistical data and analysis for internal use.
              </Text>
              <Text style={[styles.bodyText, styles.justifyText, {marginTop: 4}]}>
                - Increase the efficiency and operation of the Application.
              </Text>
              <Text style={[styles.bodyText, styles.justifyText, {marginTop: 4}]}>
                - Monitor and analyze usage and trends to improve your experience with the Application.
              </Text>
               <Text style={[styles.bodyText, styles.justifyText, {marginTop: 4}]}>
                - Notify you of updates to the Application.
              </Text>
              {/* Add more uses as needed */}
            </View>
          </View>
           <View style={styles.section}>
            <Text style={styles.sectionTitle}>Disclosure of Your Information</Text>
            <View style={styles.card}>
              <Text style={[styles.bodyText, styles.justifyText]}>
                We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
              </Text>
              <Text style={[styles.bodyText, styles.justifyText, {marginTop: 8}]}>
                By Law or to Protect Rights: If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
              </Text>
              <Text style={[styles.bodyText, styles.justifyText, {marginTop: 8}]}>
                Third-Party Service Providers: We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, hosting services, and marketing assistance. They will have access to your personal information only to perform these tasks and are obligated not to disclose or use it for other purposes.
              </Text>
               {/* Add more disclosure scenarios as needed */}
            </View>
          </View>
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Security of Your Information</Text>
            <View style={styles.card}>
              <Text style={[styles.bodyText, styles.justifyText]}>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </Text>
            </View>
          </View>

           <View style={styles.section}>
            <Text style={styles.sectionTitle}>Policy for Children</Text>
            <View style={styles.card}>
              <Text style={[styles.bodyText, styles.justifyText]}>
               We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.
              </Text>
            </View>
          </View>
           <View style={styles.section}>
            <Text style={styles.sectionTitle}>Changes to This Privacy Policy</Text>
            <View style={styles.card}>
              <Text style={[styles.bodyText, styles.justifyText]}>
               We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </Text>
            </View>
          </View>
           <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Us</Text>
            <View style={styles.card}>
              <Text style={[styles.bodyText, styles.justifyText]}>
               If you have any questions about this Privacy Policy, please contact us at [Your Contact Email].
              </Text>
            </View>
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
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: '#fff',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: '#999',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#252525',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bodyText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: '#fff',
  },
   justifyText: {
    textAlign: 'justify',
   },
}); 