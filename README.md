# Sceal Chat App

A modern, feature-rich chat application built with React Native and Expo, designed to help couples share and cherish their special moments together.

## Features

### Chat & Memories
- Real-time messaging between partners
  - Instant message delivery
  - Message status indicators
  - Typing indicators
  - Read receipts
  - Message reactions

- Shared memories section to store and organize special moments
  - Multiple memory types with distinct color coding:
    - Date (#FF6B00)
    - Anniversary (#FF8A9A)
    - Birthday (#FFD166)
    - Travel (#06D6A0)
    - Other (#B3B3B3)
  - Memory cards with:
    - Title and description
    - Date and type indicators
    - Media previews
    - Quick actions (edit/delete)

- Media support
  - Photo upload and preview
  - Video support
  - Multiple media items per memory
  - Grid view for media collections
  - Full-screen media viewer

- Search and filter capabilities
  - Real-time search across titles and descriptions
  - Date-based filtering
  - Type-based filtering
  - Sort by date or type
  - Ascending/descending order options

### UI/UX
- Modern, clean interface with dark theme
  - Dark background (#1A1A1A)
  - Card-based design
  - Consistent spacing and padding
  - Smooth transitions

- Custom font implementation (Poppins)
  - Regular (400) for body text
  - Medium (500) for buttons and labels
  - Bold (700) for headings

- Responsive components
  - Adaptive layouts for different screen sizes
  - Touch-friendly interface
  - Proper keyboard handling
  - Safe area awareness

### Calendar Integration
- Interactive calendar view
  - Month navigation
  - Date selection
  - Event indicators
  - Color-coded event types
  - Today's date highlighting

- Memory organization
  - Date-based grouping
  - Chronological display
  - Quick access to memories
  - Upcoming events section

### Technical Features
- Built with React Native and Expo
  - Latest stable versions
  - Expo SDK compatibility
  - Native module support

- TypeScript implementation
  - Strict type checking
  - Interface definitions
  - Type safety for props and state

- Performance optimizations
  - Efficient rendering
  - Memory management
  - Image optimization
  - Smooth animations

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sceal-chat-app.git
cd sceal-chat-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Run on your preferred platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## Project Structure

```
sceal-chat-app/
├── app/
│   ├── (tabs)/           # Main tab navigation
│   ├── chat/            # Chat related screens
│   ├── settings/        # App settings
│   └── calendar/        # Calendar integration
├── components/          # Reusable components
├── constants/          # App constants and styles
├── assets/            # Images, fonts, etc.
└── types/             # TypeScript type definitions
```

## Key Components

### Shared Memories
- Memory cards with type-based color coding
- Media grid for photos and videos
- Search and filter functionality
- Date-based organization
- Edit and delete capabilities

### Calendar Integration
- Interactive calendar view
- Date-based memory organization
- Special date highlighting
- Upcoming events display

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Poppins Font](https://fonts.google.com/specimen/Poppins)

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://github.com/yourusername/sceal-chat-app](https://github.com/yourusername/sceal-chat-app)
