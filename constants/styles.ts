import { StyleSheet } from 'react-native';

// Theme Colors
export const COLORS = {
  primary: '#FF6B00',
  background: {
    start: '#060606',
    end: '#484848',
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    placeholder: '#999999',
  },
  input: {
    background: '#222222',
    border: '#484848',
  },
  button: {
    background: '#FF6B00',
    text: '#FFFFFF',
  },
  social: {
    background: '#FFFFFF',
  },
};

// Typography
export const FONTS = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  bold: 'Poppins_700Bold',
};

// Common Styles
export const commonStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  // Text styles
  title: {
    fontSize: 32,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: COLORS.text.primary,
    fontFamily: FONTS.regular,
    marginBottom: 4,
  },

  // Input styles
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.input.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: COLORS.text.primary,
    fontFamily: FONTS.regular,
    backgroundColor: COLORS.input.background,
  },

  // Button styles
  button: {
    backgroundColor: COLORS.button.background,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.button.text,
    fontFamily: FONTS.bold,
  },

  // Social button styles
  socialButton: {
    padding: 10,
    borderRadius: 28,
    backgroundColor: COLORS.social.background,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Section styles
  section: {
    marginBottom: 2,
    backgroundColor: 'transparent',
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: COLORS.text.primary,
    fontFamily: FONTS.bold,
    marginBottom: 12,
  },

  // Link styles
  link: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    fontFamily: FONTS.regular,
  },
}); 