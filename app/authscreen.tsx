import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image } from 'expo-image';

export default function LoginScreen() {
  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth with Better Auth
    console.log('Google login pressed');
  };

  const handleAppleLogin = () => {
    // TODO: Apple login UI only (as per requirements)
    console.log('Apple login pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>EveryNote</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Capture your thoughts, your way.{'\n'}
          Text, voice, or media—<Text style={styles.italicText}>EveryNote</Text> makes it effortless to
          record your day and reflect with AI-powered clarity.
        </Text>

        {/* Illustration Container */}
        <View style={styles.illustrationContainer}>
          <TouchableOpacity onPress={() => router.push('/home')}>
            <Image
              source={require('../assets/images/everynote.png')}
              style={styles.illustration}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Google Login Button */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
          activeOpacity={0.8}
        >
          <Image
            source={require('../assets/images/google-logo.png')}
            style={{ width: 26, height: 26 }}
            contentFit="contain"
          />
          <Text style={styles.googleButtonText}>Log in with Google</Text>
        </TouchableOpacity>

        {/* Apple Login Button */}
        <TouchableOpacity
          style={styles.appleButton}
          onPress={handleAppleLogin}
          activeOpacity={0.8}
        >
          <Ionicons name="logo-apple" size={26} color="#FFFFFF" />
          <Text style={styles.appleButtonText}>Log in with Apple</Text>
        </TouchableOpacity>

        {/* Terms and Privacy */}
        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text>Terms of Service</Text>
          {'\n'}and <Text>Privacy Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 15,
    color: '#A0A0A0',
    lineHeight: 24,
    marginBottom: 0,
  },
  italicText: {
    fontStyle: 'italic',
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: 350,
    height: 350,
    marginBottom: 20,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginLeft: 12,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#262625',
    borderRadius: 25,
    paddingVertical: 12,
    marginBottom: 24,
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  termsText: {
    fontSize: 14,
    color: '#808080',
    textAlign: 'center',
    lineHeight: 20,
  },
});
