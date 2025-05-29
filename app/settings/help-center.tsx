import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { LayoutAnimation, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, UIManager, View } from 'react-native';
import { FONTS } from '../../constants/styles';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// Dummy FAQ data
const faqData = [
  { question: 'How do I change my profile picture?', answer: 'You can change your profile picture from the Profile settings screen.' },
  { question: 'How can I reset my password?', answer: 'You can reset your password from the Profile settings screen under Account Management.' },
  { question: 'How do I adjust notification settings?', answer: 'Notification settings can be found and adjusted in the Notifications settings screen.' },
  { question: 'Can I use a different theme?', answer: 'Yes, you can switch between Light, Dark, and System Default themes in the Theme settings.' },
  // Add more FAQs as needed
];

export default function HelpCenterScreen() {
  const router = useRouter();
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [complaintText, setComplaintText] = useState('');

  const toggleFAQ = (index) => {
    LayoutAnimation.easeInEaseOut();
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleSubmitComplaint = () => {
    // Handle complaint submission
    console.log('Complaint submitted:', complaintText);
    // Add actual submission logic here (e.g., API call)
    setComplaintText(''); // Clear form after submission
    alert('Complaint submitted successfully!'); // Simple feedback
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help Center</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>

          {/* FAQ Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            <View style={styles.card}>
              {faqData.map((faq, index) => (
                <View key={index}>
                  <TouchableOpacity style={styles.faqQuestion} onPress={() => toggleFAQ(index)}>
                    <Text style={styles.faqQuestionText}>{faq.question}</Text>
                    <MaterialIcons
                      name={expandedFAQ === index ? 'expand-less' : 'expand-more'}
                      size={24}
                      color="#999"
                    />
                  </TouchableOpacity>
                   {expandedFAQ === index && (
                    <View style={styles.faqAnswer}>
                      <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                    </View>
                  )}
                   {index < faqData.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </View>

          {/* Complaint Form Section */}
          <View style={styles.section}>
             <Text style={styles.sectionTitle}>Submit a Complaint</Text>
             <View style={styles.card}>
               <Text style={styles.label}>Your Complaint</Text>
                <TextInput
                  style={styles.complaintInput}
                  value={complaintText}
                  onChangeText={setComplaintText}
                  placeholder="Enter your complaint here..."
                  placeholderTextColor="#666"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
               <TouchableOpacity style={styles.submitButton} onPress={handleSubmitComplaint}>
                 <Text style={styles.submitButtonText}>Submit Complaint</Text>
               </TouchableOpacity>
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
   faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: '#fff',
    marginRight: 8,
  },
  faqAnswer: {
    marginTop: 8,
  },
  faqAnswerText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: '#ccc',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: '#ccc',
    marginBottom: 8,
  },
  complaintInput: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: '#fff',
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: '#1A1A1A',
  },
}); 