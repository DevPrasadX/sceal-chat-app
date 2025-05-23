import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  const router = useRouter();
  const [push, setPush] = useState(true);
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Push Notifications</Text>
          <Switch value={push} onValueChange={setPush} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Sound</Text>
          <Switch value={sound} onValueChange={setSound} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Vibration</Text>
          <Switch value={vibration} onValueChange={setVibration} />
        </View>
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
}); 