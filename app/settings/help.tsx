import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONTS } from '../../constants/styles';

export default function HelpScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.section}>
        <Text style={styles.label}>FAQ</Text>
        <Text style={styles.faq}>Q: How do I reset my password?{"\n"}A: Go to Account settings and tap 'Change Password'.</Text>
        <Text style={styles.faq}>Q: How do I contact support?{"\n"}A: Tap the button below.</Text>
        <TouchableOpacity style={styles.supportBtn}><Text style={styles.supportText}>Contact Support</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fd', padding: 24 },
  backBtn: { marginBottom: 12 },
  backText: { fontSize: 24, color: '#1877f2', fontFamily: FONTS.bold },
  section: { backgroundColor: '#fff', borderRadius: 16, padding: 18 },
  label: { fontSize: 16, color: '#222', marginBottom: 8, fontFamily: FONTS.regular },
  faq: { fontSize: 14, color: '#888', marginBottom: 12, fontFamily: FONTS.regular },
  supportBtn: { backgroundColor: '#1877f2', borderRadius: 10, padding: 12, alignItems: 'center', marginTop: 12 },
  supportText: { color: '#fff', fontFamily: FONTS.bold, fontSize: 16 },
}); 