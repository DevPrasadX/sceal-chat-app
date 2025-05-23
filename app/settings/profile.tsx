import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const avatar = 'https://randomuser.me/api/portraits/men/32.jpg';

export default function ProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState('Peter Johnson');
  const [status, setStatus] = useState('Online');

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.avatarBox}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <TouchableOpacity style={styles.editAvatar}><Text style={styles.editAvatarText}>Edit</Text></TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.label}>Status</Text>
        <TextInput style={styles.input} value={status} onChangeText={setStatus} />
        <TouchableOpacity style={styles.saveBtn}><Text style={styles.saveText}>Save</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fd', padding: 24 },
  backBtn: { marginBottom: 12 },
  backText: { fontSize: 24, color: '#1877f2', fontWeight: 'bold' },
  avatarBox: { alignItems: 'center', marginBottom: 24 },
  avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 2, borderColor: '#1877f2' },
  editAvatar: { marginTop: 8 },
  editAvatarText: { color: '#1877f2', fontWeight: 'bold' },
  form: { backgroundColor: '#fff', borderRadius: 16, padding: 18 },
  label: { fontSize: 14, color: '#888', marginTop: 12 },
  input: { fontSize: 16, color: '#222', borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 6 },
  saveBtn: { backgroundColor: '#1877f2', borderRadius: 10, marginTop: 24, padding: 12, alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
}); 