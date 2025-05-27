import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS } from '../constants/styles';

const chatRooms = [
  { id: '1', user: 'Lily Fallen', lastMessage: 'Hey, how are you?', time: '14:30', avatar: 'https://randomuser.me/api/portraits/women/41.jpg' },
  { id: '2', user: 'Peter Johnson', lastMessage: 'Did you get the report?', time: '14:20', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '3', user: 'Dee Connor', lastMessage: 'See you tomorrow!', time: '14:15', avatar: 'https://randomuser.me/api/portraits/women/42.jpg' },
  { id: '4', user: 'Christina Alonso', lastMessage: 'What time is the meeting?', time: '14:10', avatar: 'https://randomuser.me/api/portraits/women/43.jpg' },
  { id: '5', user: 'Alex Lorie', lastMessage: "Don't forget to bring the slides", time: '14:05', avatar: 'https://randomuser.me/api/portraits/men/44.jpg' },
];

export default function ChatScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChatRooms, setFilteredChatRooms] = useState(chatRooms);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => router.push(`/chat/${item.id}?user=${encodeURIComponent(item.user)}`)}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity onPress={() => router.push('/settings')} style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search chats..."
          placeholderTextColor={COLORS.text.placeholder}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            setFilteredChatRooms(
              chatRooms.filter(room =>
                room.user.toLowerCase().includes(text.toLowerCase())
              )
            );
          }}
        />
      </View>

      <FlatList
        data={filteredChatRooms}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.start,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background.end,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: '#E6E6E6',
  },
  settingsButton: {
    padding: 8,
  },
  searchContainer: {
    padding: 16,
    paddingTop: 8,
  },
  searchInput: {
    fontSize: 16,
    padding: 12,
    backgroundColor: COLORS.background.end,
    borderRadius: 8,
    color: '#E6E6E6',
    fontFamily: FONTS.regular,
  },
  listContent: {
    padding: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background.end,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  userName: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: '#E6E6E6',
  },
  time: {
    fontSize: 14,
    color: '#B3B3B3',
    fontFamily: FONTS.regular,
  },
  lastMessage: {
    fontSize: 16,
    color: '#E6E6E6',
    fontFamily: FONTS.regular,
  },
}); 