import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS } from '../constants/styles';

const chatRooms = [
  { id: '1', user: 'Sara Sanders', lastMessage: 'Can you buy me dinner?', time: '12:35', unreadCount: 100, avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '2', user: 'Doris Diaz', lastMessage: 'Read this article, it is so awesome..', time: '12:35', unreadCount: 99, avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '3', user: 'Dorothy Oliver', lastMessage: "Where you at? I'm here.", time: '12:35', unreadCount: 3, avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: '4', user: 'Rebecca Fox', lastMessage: 'What do you need?', time: '12:35', unreadCount: 0, avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: '5', user: 'Louisa McCoy', lastMessage: 'Read this article, it is so sad... awesome...', time: '12:35', unreadCount: 0, avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
  { id: '6', user: 'Jasmine Freeman', lastMessage: 'Are you sure?', time: '12:35', unreadCount: 0, avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
  { id: '7', user: 'Marie Lucas', lastMessage: 'I know that.', time: '12:35', unreadCount: 0, avatar: 'https://randomuser.me/api/portraits/women/7.jpg' },
  { id: '8', user: 'Sara Sanders', lastMessage: 'Can you buy me dinner?', time: '12:35', unreadCount: 100, avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '9', user: 'Sara Sanders', lastMessage: 'Can you buy me dinner?', time: '12:35', unreadCount: 100, avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },

];


export default function ChatScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChatRooms, setFilteredChatRooms] = useState(chatRooms);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => router.push(`/chat/${item.id}?user=${encodeURIComponent(item.user)}`)}
    >
<LinearGradient
  colors={['#00000070', '#2A2A2A', '#00000070']}
  start={{ x: 0.3, y: 0 }}
  end={{ x: 0.7, y: 1 }}
  style={styles.avatar}
>
  <Image
    source={{ uri: item.avatar }}
    style={{
      width: 56,
      height: 56,
      borderRadius: 28,
      borderWidth: 1,
      borderColor: '#00000070',
    }}
  />
</LinearGradient>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName}>{item.user}</Text>
        </View>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      <View style={styles.timeAndBadgeContainer}>
        <Text style={styles.time}>{item.time}</Text>
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount > 99 ? '99+' : item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
    colors={[COLORS.background.start, COLORS.background.end]}
    style={styles.gradientBackground}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <View style={styles.outerContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.push('/settings')}>
              <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.headerAvatar} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Chats</Text>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={24} color="#fff" />
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
        </View>
      </SafeAreaView>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerAvatar: {
    width: 40,
    height:40,
    borderRadius:20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#00000070",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 2.5,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: '#E6E6E6',
  },
  addButton: {
    backgroundColor: COLORS.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 2.5,
    elevation: 5,
  },
  searchContainer: {
    padding: 16,
    paddingTop: 8,
  },
  searchInput: {
    fontSize: 16,
    padding: 12,
    backgroundColor: COLORS.background.end,
    borderRadius: 50,
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
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 12,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'white',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 3,
    overflow: 'hidden',
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
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: '#E6E6E6',
  },
  time: {
    fontSize: 14,
    color: '#B3B3B3',
    fontFamily: FONTS.regular,
  },
  lastMessage: {
    fontSize: 14,
    color: '#E6E6E6',
    fontFamily: FONTS.regular,
  },
  timeAndBadgeContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  unreadBadge: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: FONTS.bold,
  },
}); 