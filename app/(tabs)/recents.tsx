import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const chatRooms = [
  { id: '1', user: 'Lily Fallen', lastMessage: 'Hey, how are you?', time: '14:30', avatar: 'https://randomuser.me/api/portraits/women/41.jpg' },
  { id: '2', user: 'Peter Johnson', lastMessage: 'Did you get the report?', time: '14:20', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '3', user: 'Dee Connor', lastMessage: 'See you tomorrow!', time: '14:15', avatar: 'https://randomuser.me/api/portraits/women/42.jpg' },
  { id: '4', user: 'Christina Alonso', lastMessage: 'What time is the meeting?', time: '14:10', avatar: 'https://randomuser.me/api/portraits/women/43.jpg' },
  { id: '5', user: 'Alex Lorie', lastMessage: "Don't forget to bring the slides", time: '14:05', avatar: 'https://randomuser.me/api/portraits/men/44.jpg' },
  // Add more chat rooms as needed
];

// Placeholder data for users with pending requests (sent by the current user)
const pendingRequests = [
  { id: 'pr1', user: 'Alice Wonderland', avatar: 'https://randomuser.me/api/portraits/women/11.jpg' },
  { id: 'pr2', user: 'Bob The Builder', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
  // Add more pending requests as needed
];

export default function RecentsScreen() {
  const router = useRouter();

  const renderChatItem = ({ item }: { item: typeof chatRooms[0] }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => router.push({ pathname: '/chat', params: { user: item.user } })}
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

  const renderPendingRequestItem = ({ item }: { item: typeof pendingRequests[0] }) => (
    <TouchableOpacity style={styles.pendingRequestItem}>
      <Image source={{ uri: item.avatar }} style={styles.pendingRequestAvatar} />
      <Text style={styles.pendingRequestName}>{item.user}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Plus button */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recents</Text>
        <TouchableOpacity onPress={() => router.push('/add-contact')}> 
          <Ionicons name="add-circle-outline" size={30} color="#F5C8BD" />
        </TouchableOpacity>
      </View>

      {/* Pending Requests Section */}
      {pendingRequests.length > 0 && (
        <View style={styles.pendingRequestsContainer}>
          <Text style={styles.pendingRequestsTitle}>Pending Requests</Text>
          <FlatList
            data={pendingRequests}
            renderItem={renderPendingRequestItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pendingRequestsList}
          />
        </View>
      )}

      {/* Recent Chats List */}
      <FlatList
        data={chatRooms}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        style={styles.chatList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#222',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F5C8BD',
    fontFamily: 'Poppins_700Bold',
  },
  pendingRequestsContainer: {
    paddingVertical: 12,
    backgroundColor: '#222',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  pendingRequestsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F5C8BD',
    fontFamily: 'Poppins_700Bold',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  pendingRequestsList: {
    paddingHorizontal: 16,
  },
  pendingRequestItem: {
    alignItems: 'center',
    marginRight: 12,
  },
  pendingRequestAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#F5C8BD',
  },
  pendingRequestName: {
    fontSize: 12,
    color: '#F5C8BD',
    fontFamily: 'Poppins_400Regular',
  },
  chatList: {
    flex: 1,
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
    borderBottomColor: '#333',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#F5C8BD',
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
    fontWeight: 'bold',
    color: '#F5C8BD',
    fontFamily: 'Poppins_700Bold',
  },
  time: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
  },
  lastMessage: {
    fontSize: 16,
    color: '#F5C8BD',
    fontFamily: 'Poppins_400Regular',
  },
}); 