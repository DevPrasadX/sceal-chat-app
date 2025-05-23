# SCÉAL - Modern Chat App

A modern chat application built with React Native and Expo, featuring a beautiful dark theme and comprehensive chat functionality.

## Features

- Modern dark theme with custom branding
- Real-time chat functionality
- Voice message support
- Image sharing
- Media previews
- Search functionality
- User authentication
- Profile management
- Shared media gallery

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation
- Expo AV (for audio)
- Expo Image Picker
- AsyncStorage

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd chat-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your preferred platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## Project Structure

```
chat-app/
├── app/                    # Main application code
│   ├── chat/              # Chat-related screens
│   ├── settings/          # Settings screens
│   └── _layout.tsx        # Root layout configuration
├── assets/                # Static assets
├── constants/             # Constants and theme configuration
└── components/            # Reusable components
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
