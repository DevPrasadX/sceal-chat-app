import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Easing,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { FONTS } from '../../constants/styles';

type EventType = 'date' | 'anniversary' | 'birthday' | 'travel' | 'other';

interface Media {
  uri: string;
  type: 'image' | 'video';
}

interface Event {
  id: string;
  date: string;
  title: string;
  description: string;
  media: Media[];
  type: EventType;
}

const EVENT_TYPE_COLORS = {
  date: '#FF6B00',
  anniversary: '#FF1493',
  birthday: '#FFD700',
  travel: '#00BFFF',
  other: '#808080'
};

const EVENT_TYPE_ICONS = {
  date: 'favorite',
  anniversary: 'favorite-border',
  birthday: 'cake',
  travel: 'flight',
  other: 'event'
};

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [animatedValues] = useState<{[key: string]: Animated.Value}>(() => ({}));
  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    description: '',
    type: 'date',
    media: []
  });
  const [isEditing, setIsEditing] = useState(false);

  const pickMedia = async (type: 'image' | 'video') => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permission.status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: type === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const newMedia = result.assets.map(asset => ({
        uri: asset.uri,
        type: type as 'image' | 'video' // Explicitly cast type
      }));
      
      if (isEditing && selectedEvent) {
        setSelectedEvent(prev => ({
          ...prev!,
          media: [...(prev?.media || []), ...newMedia]
        }));
      } else {
        setNewEvent(prev => ({
          ...prev,
          media: [...(prev.media || []), ...newMedia]
        }));
      }
    }
  };

  const removeMedia = (index: number) => {
    if (isEditing && selectedEvent) {
      setSelectedEvent(prev => ({
        ...prev!,
        media: prev!.media.filter((_, i) => i !== index)
      }));
    } else {
      setNewEvent(prev => ({
        ...prev,
        media: prev.media?.filter((_, i) => i !== index) || []
      }));
    }
  };

  const addEvent = () => {
    if (!selectedDate || !newEvent.title) {
      alert('Please select a date and enter a title for your moment');
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      date: selectedDate,
      title: newEvent.title,
      description: newEvent.description || '',
      media: newEvent.media || [],
      type: newEvent.type || 'date'
    };

    setEvents([...events, event]);
    setModalVisible(false);
    setNewEvent({ title: '', description: '', type: 'date', media: [] });
  };

  const updateEvent = () => {
    if (!selectedEvent) return;

    setEvents(events.map(event => 
      event.id === selectedEvent.id ? selectedEvent : event
    ));
    setViewModalVisible(false);
    setIsEditing(false);
    setSelectedEvent(null);
  };

  const openEventDetails = (event: Event) => {
    setSelectedEvent(event);
    setViewModalVisible(true);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const getMarkedDates = () => {
    const marked: { [key: string]: any } = {};
    events.forEach(event => {
      marked[event.date] = { 
        marked: true, 
        dotColor: EVENT_TYPE_COLORS[event.type],
        type: event.type
      };
    });
    if (selectedDate) {
      marked[selectedDate] = {
        ...marked[selectedDate],
        selected: true,
        selectedColor: '#FF6B00',
      };
    }
    return marked;
  };

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const getUpcomingEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return events
      .filter(event => event.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const deleteEvent = (eventId: string) => {
    Alert.alert(
      'Delete Memory',
      'Are you sure you want to delete this memory? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (animatedValues[eventId]) {
              Animated.timing(animatedValues[eventId], {
                toValue: Dimensions.get('window').width,
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
              }).start(() => {
                setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
                delete animatedValues[eventId];
              });
            } else {
              setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
            }
          }
        }
      ]
    );
  };

  const renderEventCard = (event: Event) => {
    if (!animatedValues[event.id]) {
      animatedValues[event.id] = new Animated.Value(0);
    }

    return (
      <Animated.View 
        style={[
          styles.eventCard,
          { borderLeftColor: EVENT_TYPE_COLORS[event.type] },
          { transform: [{ translateX: animatedValues[event.id] }] },
        ]}
      >
        <TouchableOpacity 
          key={event.id} 
          style={{ flex: 1, paddingRight: 30 }}
          onPress={() => openEventDetails(event)}
        >
          <View style={styles.eventHeader}>
            <View style={styles.eventTypeContainer}>
              <MaterialIcons name={EVENT_TYPE_ICONS[event.type]} size={16} color={EVENT_TYPE_COLORS[event.type]} />
              <Text style={[styles.eventType, { color: EVENT_TYPE_COLORS[event.type] }]}>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
            </View>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => deleteEvent(event.id)}
            >
              <MaterialIcons name="delete" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.eventTitle}>{event.title}</Text>
          {event.description && (
            <Text style={styles.eventDescription} numberOfLines={2}>{event.description}</Text>
          )}
          {event.media.length > 0 && (
            <View style={styles.mediaPreview}>
              <Image
                source={{ uri: event.media[0].uri }}
                style={styles.mediaThumbnail}
                resizeMode="cover"
              />
              {event.media.length > 1 && (
                <View style={styles.mediaCount}>
                  <Text style={styles.mediaCountText}>+{event.media.length - 1}</Text>
                </View>
              )}
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderMediaGrid = (media: Media[], canOpen: boolean) => (
    <View style={styles.mediaGrid}>
      {media.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.mediaItem}
          onPress={() => { if (canOpen) { setCurrentMediaIndex(index); setPhotoModalVisible(true); } }}
          disabled={!canOpen}
        >
          <Image
            source={{ uri: item.uri }}
            style={styles.mediaGridImage}
            resizeMode="cover"
          />
          {isEditing && (
            <TouchableOpacity 
              style={styles.removeMediaButton}
              onPress={() => removeMedia(index)}
            >
              <MaterialIcons name="close" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  const openAddMomentModal = () => {
    if (!selectedDate) {
      alert('Please select a date first');
      return;
    }
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Our Special Moments</Text>
        </View>
        
        <ScrollView style={styles.scrollView}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={getMarkedDates()}
              theme={{
                backgroundColor: '#252525',
                calendarBackground: '#252525',
                textSectionTitleColor: '#fff',
                selectedDayBackgroundColor: '#FF6B00',
                selectedDayTextColor: '#fff',
                todayTextColor: '#FF6B00',
                dayTextColor: '#fff',
                textDisabledColor: '#666',
                monthTextColor: '#fff',
                arrowColor: '#FF6B00',
                dotColor: '#FF6B00',
                selectedDotColor: '#fff',
              }}
              enableSwipeMonths={true}
              hideExtraDays={false}
              disableAllTouchEventsForDisabledDays={true}
              hideArrows={false}
              firstDay={1}
              monthFormat={'MMMM yyyy'}
            />
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={openAddMomentModal}
          >
            <MaterialIcons name="add" size={24} color="#fff" />
            <Text style={styles.addButtonText}>Add Special Moment</Text>
          </TouchableOpacity>

          {selectedDate && (
            <View style={styles.selectedDateEvents}>
              <View style={styles.sectionHeader}>
                <MaterialIcons name="today" size={24} color="#FF6B00" />
                <Text style={styles.sectionTitle}>
                  {getEventsForDate(selectedDate).length > 0 
                    ? `Memories for ${formatDate(selectedDate)}`
                    : `No memories for ${formatDate(selectedDate)}`}
                </Text>
              </View>
              {getEventsForDate(selectedDate).map(renderEventCard)}
            </View>
          )}

          <View style={styles.upcomingEvents}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="event" size={24} color="#FF6B00" />
              <Text style={styles.sectionTitle}>Upcoming Moments</Text>
            </View>
            {getUpcomingEvents().map(renderEventCard)}
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContainer}
          >
            <TouchableOpacity 
              style={styles.modalOverlay} 
              activeOpacity={1} 
              onPress={() => {
                Keyboard.dismiss();
                setModalVisible(false);
              }}
            />
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add Special Moment</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <MaterialIcons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              
              <ScrollView 
                style={styles.modalScrollView}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.selectedDateInfo}>
                  <MaterialIcons name="calendar-today" size={20} color="#FF6B00" />
                  <Text style={styles.selectedDateText}>
                    {formatDate(selectedDate)}
                  </Text>
                </View>

                <View style={styles.eventTypeSelector}>
                  {Object.keys(EVENT_TYPE_COLORS).map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.eventTypeButton,
                        newEvent.type === type && { backgroundColor: EVENT_TYPE_COLORS[type as EventType] }
                      ]}
                      onPress={() => setNewEvent({ ...newEvent, type: type as EventType })}
                    >
                      <MaterialIcons 
                        name={EVENT_TYPE_ICONS[type as EventType]} 
                        size={20} 
                        color={newEvent.type === type ? '#fff' : EVENT_TYPE_COLORS[type as EventType]} 
                      />
                      <Text style={[
                        styles.eventTypeButtonText,
                        newEvent.type === type && { color: '#fff' }
                      ]}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="What's the special moment?"
                  placeholderTextColor="#666"
                  value={newEvent.title}
                  onChangeText={text => setNewEvent({ ...newEvent, title: text })}
                />
                
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Share your feelings about this moment..."
                  placeholderTextColor="#666"
                  multiline
                  value={newEvent.description}
                  onChangeText={text => setNewEvent({ ...newEvent, description: text })}
                />

                <View style={styles.mediaButtons}>
                  <TouchableOpacity
                    style={styles.mediaButton}
                    onPress={() => pickMedia('image')}
                  >
                    <MaterialIcons name="image" size={24} color="#FF6B00" />
                    <Text style={styles.mediaButtonText}>Add Photo</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.mediaButton}
                    onPress={() => pickMedia('video')}
                  >
                    <MaterialIcons name="videocam" size={24} color="#FF6B00" />
                    <Text style={styles.mediaButtonText}>Add Video</Text>
                  </TouchableOpacity>
                </View>

                {newEvent.media.length > 0 && renderMediaGrid(newEvent.media)}

                <TouchableOpacity
                  style={styles.addEventButton}
                  onPress={addEvent}
                >
                  <Text style={styles.buttonText}>Save Moment</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={viewModalVisible}
          onRequestClose={() => {
            setViewModalVisible(false);
            setIsEditing(false);
            setSelectedEvent(null);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {isEditing ? 'Edit Moment' : 'View Moment'}
                </Text>
                <TouchableOpacity 
                  onPress={() => {
                    setViewModalVisible(false);
                    setIsEditing(false);
                    setSelectedEvent(null);
                  }}
                >
                  <MaterialIcons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalScrollView}>
                {selectedEvent && (
                  <>
                    <View style={styles.eventTypeContainer}>
                      <MaterialIcons 
                        name={EVENT_TYPE_ICONS[selectedEvent.type]} 
                        size={20} 
                        color={EVENT_TYPE_COLORS[selectedEvent.type]} 
                      />
                      <Text style={[styles.eventType, { color: EVENT_TYPE_COLORS[selectedEvent.type] }]}>
                        {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                      </Text>
                    </View>

                    <Text style={styles.viewEventTitle}>{selectedEvent.title}</Text>
                    <Text style={styles.viewEventDate}>{formatDate(selectedEvent.date)}</Text>
                    
                    {selectedEvent.description && (
                      <Text style={styles.viewEventDescription}>{selectedEvent.description}</Text>
                    )}

                    {selectedEvent.media.length > 0 && renderMediaGrid(selectedEvent.media)}

                    {!isEditing ? (
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={startEditing}
                      >
                        <MaterialIcons name="edit" size={20} color="#fff" />
                        <Text style={styles.editButtonText}>Edit Moment</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.saveButton}
                        onPress={updateEvent}
                      >
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    padding: 16,
    backgroundColor: '#252525',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: '#fff',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  calendarContainer: {
    marginVertical: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#252525',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B00',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  contentContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: '#fff',
  },
  selectedDateEvents: {
    backgroundColor: '#252525',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  upcomingEvents: {
    backgroundColor: '#252525',
    borderRadius: 16,
    padding: 16,
    marginBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  eventCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  eventHeader: {
    marginBottom: 12,
  },
  dateContainer: {
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  eventDate: {
    color: '#FF6B00',
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: '#fff',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 15,
    fontFamily: FONTS.regular,
    color: '#ccc',
    lineHeight: 22,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#252525',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 0,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: '#fff',
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.regular,
    marginBottom: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  mediaButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  mediaButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  mediaButtonText: {
    color: '#FF6B00',
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  selectedMedia: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  addEventButton: {
    backgroundColor: '#FF6B00',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  modalScrollView: {
    padding: 24,
  },
  eventTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  eventType: {
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  eventTypeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  eventTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#333',
    gap: 4,
  },
  eventTypeButtonText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: '#FF6B00',
  },
  selectedDateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  selectedDateText: {
    color: '#FF6B00',
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  mediaPreview: {
    position: 'relative',
    marginTop: 12,
  },
  mediaThumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  mediaCount: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  mediaCountText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  mediaItem: {
    width: (Dimensions.get('window').width - 80) / 2,
    height: (Dimensions.get('window').width - 80) / 2,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  mediaGridImage: {
    width: '100%',
    height: '100%',
  },
  removeMediaButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 4,
  },
  viewEventTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: '#fff',
    marginBottom: 8,
  },
  viewEventDate: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: '#FF6B00',
    marginBottom: 16,
  },
  viewEventDescription: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: '#ccc',
    lineHeight: 24,
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B00',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  saveButton: {
    backgroundColor: '#FF6B00',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
    opacity: 0.8,
  },
  fullScreenImage: {
    width: '100%',
    height: '80%',
  },
  photoModalNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  photoIndexText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: FONTS.medium,
  },
  viewEventTitleInput: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: '#fff',
    marginBottom: 8,
    paddingVertical: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#666',
  },
  viewEventDescriptionInput: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: '#ccc',
    lineHeight: 24,
    marginBottom: 16,
    paddingVertical: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#666',
  },
  photoModalContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  closePhotoButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 8,
  },
}); 