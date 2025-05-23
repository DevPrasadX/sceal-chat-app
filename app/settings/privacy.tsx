import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyScreen() {
  const router = useRouter();
  const [lastSeen, setLastSeen] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Show Last Seen</Text>
          <Switch value={lastSeen} onValueChange={setLastSeen} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Read Receipts</Text>
          <Switch value={readReceipts} onValueChange={setReadReceipts} />
        </View>
        <TouchableOpacity style={styles.blockedBtn}>
          <Text style={styles.blockedText}>Blocked Users</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fd', padding: 24 },
  backBtn: { marginBottom: 12 },
  backText: { fontSize: 24, color: '#1877f2', fontWeight: 'bold' },
  section: { backgroundColor: '#fff', borderRadius: 16, padding: 18 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  label: { fontSize: 16, color: '#222' },
  blockedBtn: { marginTop: 18, backgroundColor: '#f2f4f7', borderRadius: 10, padding: 12, alignItems: 'center' },
  blockedText: { color: '#1877f2', fontWeight: 'bold' },
}); 