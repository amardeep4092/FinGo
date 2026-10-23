
import { Language, useLanguage } from '@/components/context/languagecontext';
import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { language, setLanguage, t } = useLanguage();

  const showMessage = (title: string) => {
    Alert.alert(title, 'This feature is coming soon.');
  };

  const handleLogout = () => {
    Alert.alert(
      t('logout'),
      'This demo app does not have a real login system yet.',
      [{ text: 'OK' }]
    );
  };

  const changeLanguage = () => {
    const options: { label: string; value: Language }[] = [
      { label: 'English', value: 'en' },
      { label: 'हिन्दी (Hindi)', value: 'hi' },
      { label: 'Hinglish', value: 'hinglish' },
    ];

    Alert.alert(
      t('chooseLanguage'),
      undefined,
      [
        ...options.map((option) => ({
          text: `${language === option.value ? '✓ ' : ''}${option.label}`,
          onPress: () => {
            setLanguage(option.value);
            Alert.alert(
              tForLanguage(option.value, 'languageChanged')
            );
          },
        })),
        { text: t('cancel'), style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>{t('yourAccount')}</Text>
        <Text style={styles.title}>{t('myProfile')}</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>

          <Text style={styles.name}>Amardeep</Text>
          <Text style={styles.email}>amardeep@example.com</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>FinGo Demo Account</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{t('accountSettings')}</Text>

        <TouchableOpacity
          style={styles.option}
          onPress={() => showMessage(t('personalInfo'))}
        >
          <Text style={styles.optionIcon}>👤</Text>
          <View style={styles.optionInfo}>
            <Text style={styles.optionTitle}>{t('personalInfo')}</Text>
            <Text style={styles.optionSubtitle}>
              Manage your profile details
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => showMessage(t('security'))}
        >
          <Text style={styles.optionIcon}>🔒</Text>
          <View style={styles.optionInfo}>
            <Text style={styles.optionTitle}>{t('security')}</Text>
            <Text style={styles.optionSubtitle}>
              Password and account safety
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => showMessage(t('notifications'))}
        >
          <Text style={styles.optionIcon}>🔔</Text>
          <View style={styles.optionInfo}>
            <Text style={styles.optionTitle}>{t('notifications')}</Text>
            <Text style={styles.optionSubtitle}>
              Manage app notifications
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => showMessage(t('helpSupport'))}
        >
          <Text style={styles.optionIcon}>💬</Text>
          <View style={styles.optionInfo}>
            <Text style={styles.optionTitle}>{t('helpSupport')}</Text>
            <Text style={styles.optionSubtitle}>
              Get help with FinGo
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={changeLanguage}
        >
          <Text style={styles.optionIcon}>🌐</Text>
          <View style={styles.optionInfo}>
            <Text style={styles.optionTitle}>
              {t('changeLanguage')}
            </Text>
            <Text style={styles.optionSubtitle}>
              {language === 'en'
                ? 'English'
                : language === 'hi'
                ? 'हिन्दी'
                : 'Hinglish'}
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>{t('logout')}</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>FinGo · Demo Version 1.0</Text>
        <Text style={styles.disclaimer}>
          Sample profile only. No real banking services are connected.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function tForLanguage(
  language: Language,
  key: 'languageChanged'
) {
  const messages = {
    en: 'Language changed successfully',
    hi: 'भाषा सफलतापूर्वक बदल गई',
    hinglish: 'Language successfully change ho gayi',
  };

  return messages[language];
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  container: {
    padding: 22,
    paddingBottom: 35,
  },
  subtitle: {
    color: '#778198',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginTop: 10,
  },
  title: {
    color: '#17213B',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 7,
    marginBottom: 22,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 25,
    alignItems: 'center',
    marginBottom: 28,
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 43,
    backgroundColor: '#E1E9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  avatarText: {
    color: '#2457E6',
    fontSize: 38,
    fontWeight: '800',
  },
  name: {
    color: '#17213B',
    fontSize: 23,
    fontWeight: '800',
  },
  email: {
    color: '#778198',
    fontSize: 13,
    marginTop: 6,
  },
  badge: {
    backgroundColor: '#E7F8EE',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
  },
  badgeText: {
    color: '#15965B',
    fontSize: 11,
    fontWeight: '700',
  },
  sectionTitle: {
    color: '#17213B',
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 14,
  },
  option: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionIcon: {
    fontSize: 23,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    color: '#17213B',
    fontSize: 13,
    fontWeight: '700',
  },
  optionSubtitle: {
    color: '#778198',
    fontSize: 11,
    marginTop: 5,
  },
  arrow: {
    color: '#778198',
    fontSize: 25,
  },
  logoutButton: {
    backgroundColor: '#FDEAEA',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 12,
  },
  logoutText: {
    color: '#D64545',
    fontSize: 15,
    fontWeight: '800',
  },
  footer: {
    color: '#778198',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 24,
  },
  disclaimer: {
    color: '#929AAF',
    textAlign: 'center',
    fontSize: 10,
    marginTop: 8,
  },
});
