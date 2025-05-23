import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, KeyboardAvoidingView, Platform, StatusBar, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

interface BaseMessage {
  id: string;
  sender: 'user' | 'other';
  time: string;
  type: 'text' | 'image' | 'voice';
}

interface TextMessage extends BaseMessage {
  type: 'text';
  text: string;
}

interface ImageMessage extends BaseMessage {
  type: 'image';
  imageUri: string;
}

interface VoiceMessage extends BaseMessage {
  type: 'voice';
  audioUri: string;
}

type Message = TextMessage | ImageMessage | VoiceMessage;

const avatars = {
  'Lily Fallen': 'https://randomuser.me/api/portraits/women/41.jpg',
  'Peter Johnson': 'https://randomuser.me/api/portraits/men/32.jpg',
  'Dee Connor': 'https://randomuser.me/api/portraits/women/42.jpg',
  'Christina Alonso': 'https://randomuser.me/api/portraits/women/43.jpg',
  'Alex Lorie': 'https://randomuser.me/api/portraits/men/44.jpg',
};

export default function ChatScreen() {
  const { user } = useLocalSearchParams();
  const router = useRouter();
  const userName = typeof user === 'string' ? user : '';
  const avatar = (avatars as Record<string, string>)[userName] || 'https://randomuser.me/api/portraits/men/10.jpg';

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hi!', sender: 'other', time: '13:30', type: 'text' },
    { id: '2', text: 'Hello! How are you?', sender: 'user', time: '13:31', type: 'text' },
    { id: '3', text: 'I am good, thanks!', sender: 'other', time: '13:32', type: 'text' },
  ]);
  const [inputText, setInputText] = useState('');
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewVoice, setPreviewVoice] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recordingTimer = useRef<NodeJS.Timeout | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
      }
    };
  }, [sound]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredMessages(messages);
    } else {
      setFilteredMessages(messages.filter(message =>
        message.type === 'text' && message.text.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
  }, [messages, searchQuery]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
    }
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      setRecordingDuration(0);
      
      // Start timer for recording duration
      recordingTimer.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
      }
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setIsRecording(false);

      if (uri) {
        setPreviewVoice(uri);
      }
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const playVoiceMessage = async (uri: string) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (err) {
      console.error('Failed to play voice message', err);
    }
  };

  const sendPreview = () => {
    if (previewImage) {
      const newMessage: ImageMessage = {
        id: Date.now().toString(),
        type: 'image',
        imageUri: previewImage,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setPreviewImage(null);
    } else if (previewVoice) {
      const newMessage: VoiceMessage = {
        id: Date.now().toString(),
        type: 'voice',
        audioUri: previewVoice,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setPreviewVoice(null);
    }
  };

  const cancelPreview = () => {
    setPreviewImage(null);
    setPreviewVoice(null);
    setRecordingDuration(0);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    const newMessage: TextMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.messageRow, isUser ? styles.userRow : styles.otherRow]}>
        {!isUser && <Image source={{ uri: avatar }} style={styles.avatarSmall} />}
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.otherBubble]}>
          {item.type === 'text' && (
            <Text style={[styles.messageText, isUser ? styles.userText : styles.otherText]}>{item.text}</Text>
          )}
          {item.type === 'image' && (
            <Image source={{ uri: item.imageUri }} style={styles.messageImage} />
          )}
          {item.type === 'voice' && (
            <TouchableOpacity 
              style={styles.voiceMessage}
              onPress={() => playVoiceMessage(item.audioUri)}
            >
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={24} 
                color="#F5C8BD" 
              />
              <View style={styles.voiceWaveform} />
            </TouchableOpacity>
          )}
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        {isUser && <Image source={{ uri: avatar }} style={styles.avatarSmall} />}
      </View>
    );
  };

  const handleMenuPress = () => {
    router.push({
      pathname: '/chat/shared-media',
      params: {
        user,
        messages: JSON.stringify(messages)
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {/* Custom Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => router.back()}>
          <Text style={styles.headerIconText}>{'<'}</Text>
        </TouchableOpacity>
        <Image source={{ uri: avatar }} style={styles.headerAvatar} />
        
        {isSearching ? (
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        ) : (
          <TouchableOpacity 
            style={{ flex: 1, marginLeft: 8 }}
            onPress={handleMenuPress}
          >
            <Text style={styles.headerName}>{userName}</Text>
            <View style={styles.headerStatusRow}>
              <View style={styles.headerOnlineDot} />
              <Text style={styles.headerStatusText}>Online</Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.headerIcon} onPress={() => setIsSearching(!isSearching)}>
           <Ionicons name={isSearching ? "close" : "search"} size={24} color="#F5C8BD" />
        </TouchableOpacity>

      </View>

      {/* Preview Modal */}
      <Modal
        visible={!!previewImage || !!previewVoice}
        transparent
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.previewContainer}>
            {previewImage && (
              <Image source={{ uri: previewImage }} style={styles.previewImage} />
            )}
            {previewVoice && (
              <View style={styles.voicePreview}>
                <TouchableOpacity 
                  style={styles.voicePreviewButton}
                  onPress={() => playVoiceMessage(previewVoice)}
                >
                  <Ionicons 
                    name={isPlaying ? "pause" : "play"} 
                    size={32} 
                    color="#F5C8BD" 
                  />
                </TouchableOpacity>
                <Text style={styles.voiceDuration}>
                  {formatDuration(recordingDuration)}
                </Text>
              </View>
            )}
            <View style={styles.previewActions}>
              <TouchableOpacity 
                style={[styles.previewButton, styles.cancelButton]} 
                onPress={cancelPreview}
              >
                <Text style={styles.previewButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.previewButton, styles.sendButton]} 
                onPress={sendPreview}
              >
                <Text style={styles.previewButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Chat List */}
      <FlatList
        data={filteredMessages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatList}
      />

      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
            <Ionicons name="image" size={24} color="#F5C8BD" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type message ..."
            placeholderTextColor="#666"
          />
          {inputText.trim() === '' ? (
            <TouchableOpacity 
              style={styles.iconButton} 
              onPressIn={startRecording}
              onPressOut={stopRecording}
            >
              <Ionicons 
                name={isRecording ? "radio-button-on" : "mic"} 
                size={24} 
                color={isRecording ? "#ff4444" : "#F5C8BD"} 
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.iconButton} onPress={sendMessage}>
              <Ionicons name="send" size={24} color="#F5C8BD" />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 8,
    marginHorizontal: -2,
    minHeight: 70,
  },
  headerIcon: {
    padding: 4,
    marginRight: 2,
  },
  headerIconText: {
    color: '#F5C8BD',
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 2,
    fontFamily: 'Poppins_700Bold',
  },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: '#F5C8BD',
    marginRight: 8,
  },
  headerName: {
    color: '#F5C8BD',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
  headerStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  headerOnlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4cd137',
    marginRight: 5,
  },
  headerStatusText: {
    color: '#F5C8BD',
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
  },
  chatList: {
    padding: 16,
    paddingBottom: 0,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  otherRow: {
    justifyContent: 'flex-start',
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#F5C8BD',
  },
  bubble: {
    maxWidth: '70%',
    borderRadius: 18,
    padding: 12,
    marginHorizontal: 2,
    backgroundColor: '#222',
  },
  userBubble: {
    backgroundColor: '#484848',
    borderTopRightRadius: 4,
    alignSelf: 'flex-end',
  },
  otherBubble: {
    backgroundColor: '#222',
    borderTopLeftRadius: 4,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#484848',
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#F5C8BD',
    fontFamily: 'Poppins_400Regular',
  },
  userText: {
    color: '#F5C8BD',
    fontFamily: 'Poppins_400Regular',
  },
  otherText: {
    color: '#F5C8BD',
    fontFamily: 'Poppins_400Regular',
  },
  timeText: {
    fontSize: 11,
    color: '#F5C8BD',
    marginTop: 4,
    alignSelf: 'flex-end',
    fontFamily: 'Poppins_400Regular',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 16,
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    borderRadius: 12,
    marginRight: 8,
    color: '#F5C8BD',
    fontFamily: 'Poppins_400Regular',
  },
  iconButton: {
    padding: 6,
    marginLeft: 2,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 4,
  },
  voiceMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 4,
  },
  voiceWaveform: {
    width: 100,
    height: 20,
    backgroundColor: '#444',
    borderRadius: 10,
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    backgroundColor: '#222',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
  voicePreview: {
    alignItems: 'center',
    marginBottom: 20,
  },
  voicePreviewButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  voiceDuration: {
    color: '#F5C8BD',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#444',
  },
  sendButton: {
    backgroundColor: '#F5C8BD',
  },
  previewButtonText: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins_700Bold',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#333',
    borderRadius: 12,
    marginRight: 8,
    color: '#F5C8BD',
    fontFamily: 'Poppins_400Regular',
  },
}); 