import { useLanguage } from '@/components/context/languagecontext';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CardsScreen() {
  const { t, language } = useLanguage();

  const cardText = {
    en: {
      account: 'FinGo Account',
      title: 'My Cards',
      demoCard: 'DEMO CARD',
      cardHolder: 'CARD HOLDER',
      validThru: 'VALID THRU',
      noticeTitle: 'Demo card only',
      noticeText: 'This is a sample card for your FinGo app. It is not connected to a real bank account.',
      settings: 'Card settings',
      details: 'Card details',
      detailsText: 'View your demo card information',
      security: 'Card security',
      securityText: 'Demo security settings',
    },
    hi: {
      account: 'FinGo खाता',
      title: 'मेरे कार्ड',
      demoCard: 'डेमो कार्ड',
      cardHolder: 'कार्ड धारक',
      validThru: 'वैधता',
      noticeTitle: 'केवल डेमो कार्ड',
      noticeText: 'यह आपके FinGo ऐप के लिए एक नमूना कार्ड है। यह किसी वास्तविक बैंक खाते से जुड़ा नहीं है।',
      settings: 'कार्ड सेटिंग्स',
      details: 'कार्ड की जानकारी',
      detailsText: 'अपने डेमो कार्ड की जानकारी देखें',
      security: 'कार्ड सुरक्षा',
      securityText: 'डेमो सुरक्षा सेटिंग्स',
    },
    hinglish: {
      account: 'FinGo Account',
      title: 'Mere Cards',
      demoCard: 'DEMO CARD',
      cardHolder: 'CARD HOLDER',
      validThru: 'VALID THRU',
      noticeTitle: 'Sirf Demo Card',
      noticeText: 'Ye aapke FinGo app ke liye sample card hai. Ye kisi real bank account se connected nahi hai.',
      settings: 'Card Settings',
      details: 'Card Details',
      detailsText: 'Apne demo card ki information dekhein',
      security: 'Card Security',
      securityText: 'Demo security settings',
    },
  } as const;

  const labels = cardText[language];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>{labels.account}</Text>
        <Text style={styles.title}>{labels.title}</Text>

        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={styles.brand}>FinGo</Text>
            <Text style={styles.chip}>▦</Text>
          </View>

          <Text style={styles.cardLabel}>{labels.demoCard}</Text>
          <Text style={styles.cardNumber}>••••  ••••  ••••  4829</Text>

          <View style={styles.cardBottom}>
            <View>
              <Text style={styles.label}>{labels.cardHolder}</Text>
              <Text style={styles.holder}>AMARDEEP</Text>
            </View>
            <View>
              <Text style={styles.label}>{labels.validThru}</Text>
              <Text style={styles.holder}>12/28</Text>
            </View>
          </View>
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>{labels.noticeTitle}</Text>
          <Text style={styles.noticeText}>{labels.noticeText}</Text>
        </View>

        <Text style={styles.sectionTitle}>{labels.settings}</Text>

        <View style={styles.option}>
          <Text style={styles.optionIcon}>◎</Text>
          <View style={styles.optionInfo}>
            <Text style={styles.optionTitle}>{labels.details}</Text>
            <Text style={styles.optionText}>{labels.detailsText}</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </View>

        <View style={styles.option}>
          <Text style={styles.optionIcon}>♙</Text>
          <View style={styles.optionInfo}>
            <Text style={styles.optionTitle}>{labels.security}</Text>
            <Text style={styles.optionText}>{labels.securityText}</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
    fontSize: 14,
    marginTop: 10,
  },
  title: {
    color: '#17213B',
    fontSize: 29,
    fontWeight: '800',
    marginTop: 6,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#2457E6',
    borderRadius: 24,
    padding: 24,
    minHeight: 220,
    justifyContent: 'space-between',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '800',
  },
  chip: {
    color: '#FFFFFF',
    fontSize: 30,
  },
  cardLabel: {
    color: '#DCE5FF',
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 20,
  },
  cardNumber: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 8,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 26,
  },
  label: {
    color: '#DCE5FF',
    fontSize: 9,
    letterSpacing: 1,
    marginBottom: 5,
  },
  holder: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  notice: {
    backgroundColor: '#FFF3D8',
    borderRadius: 14,
    padding: 15,
    marginTop: 20,
  },
  noticeTitle: {
    color: '#805500',
    fontWeight: '800',
    fontSize: 14,
  },
  noticeText: {
    color: '#805500',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 5,
  },
  sectionTitle: {
    color: '#17213B',
    fontSize: 19,
    fontWeight: '800',
    marginTop: 28,
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
    color: '#2457E6',
    fontSize: 25,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    color: '#17213B',
    fontSize: 14,
    fontWeight: '700',
  },
  optionText: {
    color: '#778198',
    fontSize: 12,
    marginTop: 4,
  },
  arrow: {
    color: '#778198',
    fontSize: 25,
  },
});
