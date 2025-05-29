import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONTS } from '../../constants/styles';

export default function AppearanceScreen() {
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.section}>
        <Text style={styles.label}>Theme</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.option, theme === 'light' && styles.selected]} onPress={() => setTheme('light')}><Text>Light</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.option, theme === 'dark' && styles.selected]} onPress={() => setTheme('dark')}><Text>Dark</Text></TouchableOpacity>
        </View>
        <Text style={styles.label}>Font Size</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.option, fontSize === 'small' && styles.selected]} onPress={() => setFontSize('small')}><Text>Small</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.option, fontSize === 'medium' && styles.selected]} onPress={() => setFontSize('medium')}><Text>Medium</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.option, fontSize === 'large' && styles.selected]} onPress={() => setFontSize('large')}><Text>Large</Text></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fd', padding: 24 },
  backBtn: { marginBottom: 12 },
  backText: { fontSize: 24, color: '#1877f2', fontFamily: FONTS.bold },
  section: { backgroundColor: '#fff', borderRadius: 16, padding: 18 },
  label: { fontSize: 16, color: '#222', marginTop: 12, fontFamily: FONTS.regular },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  option: { backgroundColor: '#f2f4f7', borderRadius: 8, padding: 10, marginRight: 10 },
  selected: { backgroundColor: '#1877f2', color: '#fff' },
}); 