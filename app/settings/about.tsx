import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.section}>
        <Text style={styles.label}>App Version</Text>
        <Text style={styles.value}>1.0.0</Text>
        <Text style={styles.label}>Developer</Text>
        <Text style={styles.value}>Your Name or Company</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fd', padding: 24 },
  backBtn: { marginBottom: 12 },
  backText: { fontSize: 24, color: '#1877f2', fontWeight: 'bold' },
  section: { backgroundColor: '#fff', borderRadius: 16, padding: 18 },
  label: { fontSize: 16, color: '#222', marginTop: 12 },
  value: { fontSize: 15, color: '#888', marginTop: 2 },
}); 