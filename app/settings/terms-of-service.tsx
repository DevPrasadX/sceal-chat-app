import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FONTS } from '../../constants/styles';

export default function TermsOfServiceScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Terms of Service</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Introduction</Text>
            <View style={styles.card}>
              <Text style={[styles.bodyText, styles.justifyText]}>
                These Terms of Service govern your use of the [App Name] mobile application. By accessing or using the app, you agree to be bound by these terms and conditions. If you disagree with any part of the terms, then you may not access the service.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>User Accounts</Text>
            <View style={styles.card}>
              <Text style={[styles.bodyText, styles.justifyText]}>
                When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
              </Text>
            </View>
          </View>
           <View style={styles.section}>
            <Text style={styles.sectionTitle}>Content</Text>
            <View style={styles.card}>
              <Text style={[styles.bodyText, styles.justifyText]}>
                Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ('Content'). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness. By posting Content on or through the Service, You represent and warrant that: (i) the Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity.
              </Text>
            </View>
          </View>
           <View style={styles.section}>
            <Text style={styles.sectionTitle}>Links to Other Web Sites</Text>
            <View style={styles.card}>
              <Text style={[styles.bodyText, styles.justifyText]}>
                Our Service may contain links to third-party web sites or services that are not owned or controlled by [App Name]. [App Name] has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that [App Name] shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
              </Text>
            </View>
          </View>
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Termination</Text>
            <View style={styles.card}>
              <Text style={[styles.bodyText, styles.justifyText]}>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
              </Text>
            </View>
          </View>

           <View style={styles.section}>
            <Text style={styles.sectionTitle}>Governing Law</Text>
            <View style={styles.card}>
              <Text style={[styles.bodyText, styles.justifyText]}>
               These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
              </Text>
            </View>
          </View>
           <View style={styles.section}>
            <Text style={styles.sectionTitle}>Changes</Text>
            <View style={styles.card}>
              <Text style={[styles.bodyText, styles.justifyText]}>
               We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </Text>
            </View>
          </View>
           <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Us</Text>
            <View style={styles.card}>
              <Text style={[styles.bodyText, styles.justifyText]}>
               If you have any questions about these Terms, please contact us at [Your Contact Email].
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