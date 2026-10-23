
import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from 'react';

export type Language = 'en' | 'hi' | 'hinglish';

const translations = {
  en: {
    home: 'Home',
    cards: 'Cards',
    activity: 'Activity',
    profile: 'Profile',
    settings: 'Settings',
    myProfile: 'My Profile',
    yourAccount: 'YOUR ACCOUNT',
    accountSettings: 'Account settings',
    personalInfo: 'Personal Information',
    security: 'Security',
    notifications: 'Notifications',
    helpSupport: 'Help & Support',
    changeLanguage: 'Change Language',
    chooseLanguage: 'Choose your language',
    logout: 'Log Out',
    cancel: 'Cancel',
    languageChanged: 'Language changed successfully',
  },
  hi: {
    home: 'होम',
    cards: 'कार्ड',
    activity: 'गतिविधि',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    myProfile: 'मेरी प्रोफ़ाइल',
    yourAccount: 'आपका खाता',
    accountSettings: 'खाता सेटिंग्स',
    personalInfo: 'व्यक्तिगत जानकारी',
    security: 'सुरक्षा',
    notifications: 'सूचनाएँ',
    helpSupport: 'सहायता और समर्थन',
    changeLanguage: 'भाषा बदलें',
    chooseLanguage: 'अपनी भाषा चुनें',
    logout: 'लॉग आउट',
    cancel: 'रद्द करें',
    languageChanged: 'भाषा सफलतापूर्वक बदल गई',
  },
  hinglish: {
    home: 'Home',
    cards: 'Cards',
    activity: 'Activity',
    profile: 'Profile',
    settings: 'Settings',
    myProfile: 'Meri Profile',
    yourAccount: 'AAPKA ACCOUNT',
    accountSettings: 'Account Settings',
    personalInfo: 'Personal Information',
    security: 'Security',
    notifications: 'Notifications',
    helpSupport: 'Help & Support',
    changeLanguage: 'Language Badlein',
    chooseLanguage: 'Apni language chunein',
    logout: 'Log Out',
    cancel: 'Cancel',
    languageChanged: 'Language successfully change ho gayi',
  },
};

type TranslationKey = keyof typeof translations.en;

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: TranslationKey) => translations[language][key];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      'useLanguage must be used inside LanguageProvider'
    );
  }

  return context;
}
