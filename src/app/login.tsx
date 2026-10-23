
import { supabase } from '@/lib/supabase';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    // Button press test
    if (loading) return;

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      Alert.alert('Details required', 'Email aur password enter karo.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Password error', 'Password kam se kam 6 characters ka hona chahiye.');
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
        });

        if (error) throw error;

        if (data.session) {
          Alert.alert('Success', 'Account create ho gaya.');
          router.replace('/qr-scanner');
        } else {
          Alert.alert(
            'Email confirmation',
            'Account request submit ho gayi. Email confirm karke login karo.'
          );
          setIsSignup(false);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (error) throw error;

        if (!data.session) {
          throw new Error('Login session nahi bani. Dobara try karo.');
        }

        Alert.alert('Success', 'Login successful!');
        router.replace('/qr-scanner');
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred';

      Alert.alert(isSignup ? 'Signup failed' : 'Login failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        <View style={styles.logo}>
          <Text style={styles.logoText}>F</Text>
        </View>

        <Text style={styles.brand}>FinGo</Text>

        <Text style={styles.title}>
          {isSignup ? 'Create your account' : 'Welcome back'}
        </Text>

        <Text style={styles.subtitle}>
          {isSignup
            ? 'Sign up to securely save your QR scan history.'
            : 'Log in to continue to your secure QR scanner.'}
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email address</Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor="#8190A5"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />

          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="At least 6 characters"
            placeholderTextColor="#8190A5"
            secureTextEntry
            autoCapitalize="none"
            editable={!loading}
          />

          <TouchableOpacity
            style={[styles.primaryButton, loading && styles.disabledButton]}
            onPress={handleAuth}
            disabled={loading}
            activeOpacity={0.7}
          >
            {loading ? (
              <ActivityIndicator color="#07130F" />
            ) : (
              <Text style={styles.primaryButtonText}>
                {isSignup ? 'Create Account' : 'Log In'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => setIsSignup((current) => !current)}
            disabled={loading}
            activeOpacity={0.7}
          >
            <Text style={styles.switchText}>
              {isSignup
                ? 'Already have an account? Log In'
                : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.securityNote}>
          🔒 Your account is protected by Supabase authentication.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B14',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
    justifyContent: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    marginBottom: 20,
  },
  backText: {
    color: '#B6C3D6',
    fontSize: 15,
  },
  logo: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: '#42E8C5',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  logoText: {
    color: '#07130F',
    fontSize: 36,
    fontWeight: '900',
  },
  brand: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 30,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 28,
  },
  form: {
    backgroundColor: '#111B2B',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#25364A',
  },
  label: {
    color: '#E5EDF8',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0A1220',
    borderWidth: 1,
    borderColor: '#2A3A50',
    borderRadius: 13,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 18,
  },
  primaryButton: {
    minHeight: 52,
    backgroundColor: '#42E8C5',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  disabledButton: {
    opacity: 0.65,
  },
  primaryButtonText: {
    color: '#07130F',
    fontSize: 16,
    fontWeight: '800',
  },
  switchButton: {
    alignItems: 'center',
    paddingVertical: 17,
  },
  switchText: {
    color: '#42E8C5',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  securityNote: {
    color: '#8190A5',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 19,
  },
});
