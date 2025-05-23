import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';

const chatRooms = [
  { id: '1', user: 'Lily Fallen', lastMessage: 'Hey, how are you?', time: '14:30', avatar: 'https://randomuser.me/api/portraits/women/41.jpg' },
  { id: '2', user: 'Peter Johnson', lastMessage: 'Did you get the report?', time: '14:20', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '3', user: 'Dee Connor', lastMessage: 'See you tomorrow!', time: '14:15', avatar: 'https://randomuser.me/api/portraits/women/42.jpg' },
  { id: '4', user: 'Christina Alonso', lastMessage: 'What time is the meeting?', time: '14:10', avatar: 'https://randomuser.me/api/portraits/women/43.jpg' },
  { id: '5', user: 'Alex Lorie', lastMessage: "Don't forget to bring the slides", time: '14:05', avatar: 'https://randomuser.me/api/portraits/men/44.jpg' },
  // Add more chat rooms as needed
];

export default function IndexScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChatRooms, setFilteredChatRooms] = useState(chatRooms);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredChatRooms(chatRooms);
    } else {
      setFilteredChatRooms(chatRooms.filter(room =>
        room.user.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
  }, [chatRooms, searchQuery]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const renderItem = ({ item }: { item: typeof chatRooms[0] }) => (
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

  const renderMessage = ({ item }: { item: typeof messages[0] }) => (
    <View style={styles.messageItem}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  const sendMessage = () => {
    // Implement the logic to send a message
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Chat List */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
      />
      {/* Typing Indicator */}
      {isTyping && (
        <View style={styles.typingRow}>
          <Text style={styles.typingText}>Peter Typing </Text>
          <Text style={styles.typingDot}>•</Text>
          <Text style={styles.typingDot}>•</Text>
        </View>
      )}
      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={text => {
              setInputText(text);
              setIsTyping(true);
            }}
            placeholder="Type message ..."
            placeholderTextColor="#bbb"
          />
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.icon}>📎</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={sendMessage}>
            <Text style={styles.icon}>📤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Use transparent to show the linear gradient background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#222', // Dark header background
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F5C8BD', // SCÉAL text color
    fontFamily: 'Poppins_700Bold', // SCÉAL font
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#222', // Match header background
    borderBottomWidth: 1,
    borderBottomColor: '#333', // Separator line
  },
  searchInput: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#333', // Slightly lighter than background
    borderRadius: 8,
    color: '#F5C8BD',
    fontFamily: 'Poppins_400Regular',
  },
  listContent: {
    padding: 16,
    paddingTop: 8, // Add some padding at the top of the list
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333', // Darker shade for separator
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#F5C8BD', // SCÉAL text color for border
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
    color: '#F5C8BD', // SCÉAL text color
    fontFamily: 'Poppins_700Bold', // SCÉAL font
  },
  time: {
    fontSize: 14,
    color: '#666', // Adjust time color for dark theme
    fontFamily: 'Poppins_400Regular', // SCÉAL font
  },
  lastMessage: {
    fontSize: 16,
    color: '#F5C8BD', // SCÉAL text color
    fontFamily: 'Poppins_400Regular', // SCÉAL font
  },
  chatList: {
    padding: 16,
    paddingTop: 8,
  },
  messageItem: {
    marginBottom: 16,
  },
  messageText: {
    fontSize: 16,
    color: '#F5C8BD',
    fontFamily: 'Poppins_400Regular',
  },
  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  typingText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
  },
  typingDot: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
    marginHorizontal: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 12,
    backgroundColor: '#333',
    borderRadius: 8,
    color: '#F5C8BD',
    fontFamily: 'Poppins_400Regular',
  },
  iconButton: {
    padding: 12,
  },
  icon: {
    fontSize: 20,
    color: '#F5C8BD',
  },
}); 