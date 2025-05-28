import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, KeyboardAvoidingView, Modal, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS } from '../../constants/styles';

interface Message {
  id: string;
  text?: string;
  sender: 'user' | 'other';
  time: string;
  type: 'text' | 'image' | 'audio' | 'file';
  uri?: string;
  fileName?: string;
}

export default function IndividualChatScreen() {
  const { id, user } = useLocalSearchParams();
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hi!', sender: 'other', time: '13:30', type: 'text' },
    { id: '2', text: 'Hello! How are you?', sender: 'user', time: '13:31', type: 'text' },
    { id: '3', text: 'I am good, thanks!', sender: 'other', time: '13:32', type: 'text' },
  ]);

  const [recording, setRecording] = useState<Audio.Recording | undefined>(undefined);
  const [isRecording, setIsRecording] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioMessageId, setCurrentAudioMessageId] = useState<string | null>(null);
  const [fullscreenImageUri, setFullscreenImageUri] = useState<string | null>(null);

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const handleAttachFile = async () => {
    console.log('Attach file button pressed');
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Allow all file types
        copyToCacheDirectory: false, // Don't copy to cache directory
      });

      if (result.canceled === false) {
        const file = result.assets[0];
        console.log(file.uri, file.name, file.size);
        // Add file message to state
        const newMessage: Message = {
          id: Date.now().toString(),
          sender: 'user',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'file',
          uri: file.uri,
          fileName: file.name,
        };
        setMessages([...messages, newMessage]);
      }
    } catch (e) {
      console.error('Error picking document:', e);
    }
  };

  const handleOpenCamera = async () => {
    console.log('Camera button pressed');
    try {
      // Ask for camera roll permissions
      const { status: cameraRollStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraRollStatus !== 'granted') {
        alert('Permission to access camera roll is required!');
        return;
      }

      // Ask for camera permissions if you also want to take photos/videos directly
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus !== 'granted') {
         alert('Permission to access camera is required!');
        //  return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        console.log(asset.uri, asset.type);
        // Add image or video message to state
        const messageType = asset.type === 'image' ? 'image' : 'file'; // Use 'file' for video for now, can refine later
        const newMessage: Message = {
          id: Date.now().toString(),
          sender: 'user',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: messageType,
          uri: asset.uri,
          // You might want to add a thumbnail for video messages
        };
        setMessages([...messages, newMessage]);
      }
    } catch (e) {
      console.error('Error picking image/video:', e);
    }
  };

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setIsRecording(false);
    setRecording(undefined);
    await recording?.stopAndUnloadAsync();
    const uri = recording?.getURI();
    console.log('Recording stopped and stored at', uri);

    if (uri) {
      // Add audio message to state
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'audio',
        uri: uri,
      };
      setMessages([...messages, newMessage]);
    }
  }

  const handleAudioAction = async () => {
    console.log('Audio/Send button pressed');
    if (inputText.trim() === '') {
      if (isRecording) {
        stopRecording();
      } else {
        startRecording();
      }
    } else {
      sendMessage(); // Send text message
    }
  };

  async function playSound(uri: string, messageId: string) {
    console.log('Loading Sound');
    try {
      if (sound) {
        // Stop the currently playing sound if any
        await sound.stopAsync();
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      setSound(newSound);
      setCurrentAudioMessageId(messageId);
      setIsPlaying(true);
      console.log('Playing Sound');

      // Listen for playback status changes
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && !status.isPlaying && status.didJustFinish) {
          setIsPlaying(false);
          setCurrentAudioMessageId(null);
          newSound.unloadAsync(); // Unload sound when finished
          setSound(undefined);
        }
      });

    } catch (error) {
      console.error('Error playing sound:', error);
      setIsPlaying(false);
      setCurrentAudioMessageId(null);
      setSound(undefined);
    }
  }

  async function pauseSound() {
    console.log('Pausing Sound');
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  async function stopSound() {
    console.log('Stopping Sound');
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(undefined);
      setIsPlaying(false);
      setCurrentAudioMessageId(null);
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    const isCurrentAudio = currentAudioMessageId === item.id && isPlaying;

    const handlePressMessage = async () => {
      if (item.type === 'text') {
        // No action for text messages on press
        return;
      } else if (item.type === 'file' && item.uri) {
        console.log('Attempting to share file URI:', item.uri);
        try {
          // Use expo-sharing to open the file with native sharing capabilities
          const isAvailable = await Sharing.isAvailableAsync();
          if (isAvailable) {
            await Sharing.shareAsync(item.uri, { dialogTitle: 'Open file with...' });
          } else {
            alert('Sharing is not available on this device.');
          }
        } catch (error: any) { // Explicitly type error as any
          console.error('Error sharing file:', error);
          alert('Could not share file: ' + error.message);
        }
      } else if (item.type === 'image' && item.uri) {
        console.log('Image pressed:', item.uri);
        setFullscreenImageUri(item.uri);
      } else if (item.type === 'audio' && item.uri) {
        if (isCurrentAudio) {
          pauseSound();
        } else {
          playSound(item.uri, item.id);
        }
      }
    };

    return (
      <View style={[styles.messageRow, isUser ? styles.userRow : styles.otherRow]}>
        <TouchableOpacity
          onPress={handlePressMessage}
          style={[styles.bubble, isUser ? styles.userBubble : styles.otherBubble]}
        >
          {item.type === 'text' && (
            <Text style={[styles.messageText, isUser ? styles.userText : styles.otherText]}>
              {item.text}
            </Text>
          )}
          {item.type === 'file' && item.fileName && (
            <View style={styles.fileMessageContent}>
              <Ionicons name="document-outline" size={20} color="#B3B3B3" style={styles.fileIcon} />
              <Text style={[styles.messageText, isUser ? styles.userText : styles.otherText]}>
                {item.fileName}
              </Text>
            </View>
          )}
          {item.type === 'image' && item.uri && (
            <Image source={{ uri: item.uri }} style={styles.chatImage} />
          )}
          {item.type === 'audio' && item.uri && (
            <View style={styles.audioMessageContent}>
              <Ionicons
                name={isCurrentAudio ? "pause-circle-outline" : "play-circle-outline"}
                size={24}
                color="#B3B3B3"
                style={styles.audioPlayIcon}
              />
              <Text style={[styles.messageText, isUser ? styles.userText : styles.otherText]}>
                Audio Message
              </Text>
            </View>
          )}

          <Text style={styles.timeText}>{item.time}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const { width, height } = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#333',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    backButton: {
      marginRight: 10,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 3,
      backgroundColor: '#252525',
      borderRadius: 20,
      padding: 8,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 3,
    },
    userInfo: {
      flex: 1,
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: 18,
      fontFamily: FONTS.bold,
      color: '#F5C8BD',
    },
    typingStatus: {
      fontSize: 12,
      color: '#B3B3B3',
      fontFamily: FONTS.regular,
    },
    callButton: {
      padding: 8,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 3,
      backgroundColor: '#252525',
      borderRadius: 20,
    },
    chatList: {
      padding: 16,
    },
    messageRow: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    userRow: {
      justifyContent: 'flex-end',
    },
    otherRow: {
      justifyContent: 'flex-start',
    },
    bubbleContainer: {
      // Add any styling needed for the TouchableOpacity wrapping the bubble
    },
    bubble: {
      maxWidth: '75%',
      borderRadius: 12,
      padding: 10,
      marginHorizontal: 4,
      flexDirection: 'row',
      alignItems: 'flex-end',
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 3,
    },
    userBubble: {
      backgroundColor: '#EE3B3B',
      borderBottomRightRadius: 4,
    },
    otherBubble: {
      backgroundColor: '#333',
      borderBottomLeftRadius: 4,
    },
    messageText: {
      fontSize: 15,
      color: '#E6E6E6',
      fontFamily: FONTS.regular,
      marginRight: 8,
    },
    userText: {
      color: '#FFFFFF',
    },
    otherText: {
      color: '#E6E6E6',
    },
    timeText: {
      fontSize: 10,
      color: '#B3B3B3',
      fontFamily: FONTS.regular,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: '#1E1E1E',
      borderRadius: 24,
      marginHorizontal: 16,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 3,
    },
    input: {
      flex: 1,
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 8,
      backgroundColor: 'transparent',
      color: '#E6E6E6',
      fontFamily: FONTS.regular,
      marginRight: 4,
    },
    iconButton: {
      padding: 6,
      marginLeft: 4,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 3,
      backgroundColor: '#1E1E1E',
      borderRadius: 20,
    },
    sendButton: {
      padding: 6,
      marginLeft: 4,
    },
    chatImage: {
      width: 200, // Or appropriate styling
      height: 200, // Or appropriate styling
      borderRadius: 8,
      marginVertical: 4,
    },

    // Styles for fullscreen image viewer
    fullscreenContainer: {
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fullscreenImage: {
      width: width,
      height: height,
    },
    closeButton: {
      position: 'absolute',
      top: 40,
      right: 20,
      zIndex: 1,
    },

    fileMessageContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    fileIcon: {
      marginRight: 8,
    },
    audioMessageContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    audioPlayIcon: {
      marginRight: 8,
    },

  });

  return (
    <LinearGradient
    colors={[COLORS.background.start, COLORS.background.end]}
    style={styles.container}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
      <SafeAreaView style={styles.safeArea}>
          
   
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#F5C8BD" />
          </TouchableOpacity>
          <Image source={{ uri: 'https://randomuser.me/api/portraits/women/41.jpg' }} style={styles.avatar} />

          <View style={styles.userInfo}>
            <Text style={styles.headerTitle}>{user}</Text>
            <Text style={styles.typingStatus}>Typing...</Text>
          </View>

          <TouchableOpacity style={styles.callButton}>
            <Ionicons name="call-outline" size={24} color="#F5C8BD" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatList}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={80}
        >
          <View style={styles.inputRow}>
            {/* Emoji/Smiley Icon - Keep as is for now */}
            {/* Assuming an emoji picker button exists or will be added */} 

            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
              placeholderTextColor={'#B3B3B3'} // Adjusted placeholder color
            />

            {/* Attach file button */}
            <TouchableOpacity style={styles.iconButton} onPress={handleAttachFile}>
              <Ionicons name="attach-outline" size={24} color="#B3B3B3" />
            </TouchableOpacity>

            {/* Camera button */}
            <TouchableOpacity style={styles.iconButton} onPress={handleOpenCamera}>
              <Ionicons name="camera-outline" size={24} color="#B3B3B3" />
            </TouchableOpacity>

            {/* Microphone/Send button */}
            <TouchableOpacity style={styles.iconButton} onPress={handleAudioAction}>
               {/* Conditional rendering based on inputText and isRecording */}
              {inputText === '' ? (
                isRecording ? (
                  <Ionicons name="square" size={24} color="red" /> // Stop recording icon
                ) : (
                  <Ionicons name="mic-outline" size={24} color="#B3B3B3" /> // Start recording icon
                )
              ) : (
                <Ionicons name="send" size={24} color="#EE3B3B" />
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Fullscreen Image Modal */}
      <Modal
        visible={!!fullscreenImageUri}
        transparent={true}
        onRequestClose={() => setFullscreenImageUri(null)}
      >
        <View style={styles.fullscreenContainer}>
          <Image
            source={{ uri: fullscreenImageUri || '' }} // Provide empty string as fallback
            style={styles.fullscreenImage}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setFullscreenImageUri(null)}
          >
            <Ionicons name="close-circle" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>

      </LinearGradient>


  );
} 