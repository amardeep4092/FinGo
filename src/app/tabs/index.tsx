
import { useLanguage } from '@/components/context/languagecontext';
import { useRouter } from 'expo-router';
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

const transactions = [
  {
    id: 'coffee',
    name: 'Coffee House',
    category: 'Food & Drinks',
    amount: '-₹180',
    icon: '☕',
    color: '#FCE8D8',
  },
  {
    id: 'salary',
    name: 'Salary Received',
    category: 'Income',
    amount: '+₹25,000',
    icon: '↙',
    color: '#DDF7E8',
  },
  {
    id: 'shopping',
    name: 'Shopping',
    category: 'Shopping',
    amount: '-₹1,250',
    icon: '🛍',
    color: '#E8E4FF',
  },
];

const homeText = {
  en: {
    goodMorning: 'Good morning,',
    welcome: 'Welcome back 👋',
    totalBalance: 'Total balance',
    monthlySpending: 'Monthly spending',
    demo: 'DEMO BALANCE · NOT REAL MONEY',
    quickActions: 'Quick actions',
    send: 'Send',
    receive: 'Receive',
    payBills: 'Pay bills',
    addMoney: 'Add money',
    recentTransactions: 'Recent transactions',
    viewAll: 'View all',
    coffee: 'Coffee House',
    food: 'Food & Drinks',
    salary: 'Salary Received',
    income: 'Income',
    shopping: 'Shopping',
  },
  hi: {
    goodMorning: 'सुप्रभात,',
    welcome: 'वापसी पर स्वागत है 👋',
    totalBalance: 'कुल बैलेंस',
    monthlySpending: 'मासिक खर्च',
    demo: 'डेमो बैलेंस · असली पैसा नहीं',
    quickActions: 'त्वरित कार्य',
    send: 'पैसे भेजें',
    receive: 'पैसे प्राप्त करें',
    payBills: 'बिल भरें',
    addMoney: 'पैसे जोड़ें',
    recentTransactions: 'हाल के लेन-देन',
    viewAll: 'सभी देखें',
    coffee: 'कॉफी हाउस',
    food: 'खाना और पेय',
    salary: 'सैलरी मिली',
    income: 'आय',
    shopping: 'खरीदारी',
  },
  hinglish: {
    goodMorning: 'Good morning,',
    welcome: 'Welcome back 👋',
    totalBalance: 'Total Balance',
    monthlySpending: 'Monthly Spending',
    demo: 'DEMO BALANCE · REAL MONEY NAHI HAI',
    quickActions: 'Quick Actions',
    send: 'Paise Bhejein',
    receive: 'Paise Receive',
    payBills: 'Bills Pay Karein',
    addMoney: 'Money Add Karein',
    recentTransactions: 'Recent Transactions',
    viewAll: 'Sab Dekhein',
    coffee: 'Coffee House',
    food: 'Food & Drinks',
    salary: 'Salary Received',
    income: 'Income',
    shopping: 'Shopping',
  },
};

export default function HomeScreen() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = homeText[language];

  const openLogin = () => {
    Alert.alert(
      'Login Button Working',
      'Button press ho gaya hai. Ab Login screen khol rahe hain.',
      [
        {
          text: 'Continue',
          onPress: () => {
            try {
              router.push('/login');
            } catch (error) {
              Alert.alert(
                'Navigation Error',
                error instanceof Error
                  ? error.message
                  : 'Login screen open nahi ho paayi.'
              );
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const openScanner = () => {
    router.push('/qr-scanner');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.brand}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>F</Text>
            </View>
            <Text style={styles.brandName}>FinGo</Text>
          </View>

          <TouchableOpacity
            style={styles.avatar}
            accessibilityLabel="Profile"
            onPress={() => router.push('/profile')}
          >
            <Text style={styles.avatarText}>A</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.greeting}>
          <Text style={styles.muted}>{t.goodMorning}</Text>
          <Text style={styles.heading}>{t.welcome}</Text>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceTop}>
            <Text style={styles.balanceLabel}>{t.totalBalance}</Text>
            <Text style={styles.cardDots}>•••</Text>
          </View>

          <Text style={styles.balance}>₹48,562.00</Text>

          <View style={styles.balanceFooter}>
            <View>
              <Text style={styles.smallLabel}>{t.monthlySpending}</Text>
              <Text style={styles.spending}>₹12,450.00</Text>
            </View>
            <View style={styles.growthBadge}>
              <Text style={styles.growthText}>↗ 12.8%</Text>
            </View>
          </View>

          <Text style={styles.demoNote}>{t.demo}</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t.quickActions}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.action}
            onPress={() =>
              Alert.alert('Send Money', 'Demo feature abhi available nahi hai.')
            }
          >
            <View style={[styles.actionIcon, { backgroundColor: '#DDF7E8' }]}>
              <Text style={styles.actionEmoji}>↗</Text>
            </View>
            <Text style={styles.actionText}>{t.send}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.action}
            onPress={() =>
              Alert.alert(
                'Receive Money',
                'Demo feature abhi available nahi hai.'
              )
            }
          >
            <View style={[styles.actionIcon, { backgroundColor: '#E8E4FF' }]}>
              <Text style={styles.actionEmoji}>↙</Text>
            </View>
            <Text style={styles.actionText}>{t.receive}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.action}
            onPress={() =>
              Alert.alert('Pay Bills', 'Demo feature abhi available nahi hai.')
            }
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FCE8D8' }]}>
              <Text style={styles.actionEmoji}>▦</Text>
            </View>
            <Text style={styles.actionText}>{t.payBills}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.action}
            onPress={() =>
              Alert.alert('Add Money', 'Demo feature abhi available nahi hai.')
            }
          >
            <View style={[styles.actionIcon, { backgroundColor: '#DDEEFF' }]}>
              <Text style={styles.actionEmoji}>＋</Text>
            </View>
            <Text style={styles.actionText}>{t.addMoney}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          activeOpacity={0.7}
          onPress={openLogin}
          accessibilityRole="button"
          accessibilityLabel="Open Login or Sign Up"
        >
          <View style={styles.loginIcon}>
            <Text style={styles.loginIconText}>↗</Text>
          </View>

          <View style={styles.loginInfo}>
            <Text style={styles.loginTitle}>Login / Sign Up</Text>
            <Text style={styles.loginSubtitle}>
              Sign in to save your QR scan history
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.qrScannerButton}
          activeOpacity={0.7}
          onPress={openScanner}
          accessibilityRole="button"
          accessibilityLabel="Open QR Scanner"
        >
          <View style={styles.qrScannerIcon}>
            <Text style={styles.qrScannerIconText}>▦</Text>
          </View>

          <View style={styles.loginInfo}>
            <Text style={styles.qrScannerTitle}>QR Code Scanner</Text>
            <Text style={styles.qrScannerSubtitle}>
              Scan a QR code securely
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t.recentTransactions}</Text>
          <TouchableOpacity
            onPress={() => router.push('/activity')}
            accessibilityRole="button"
          >
            <Text style={styles.viewAll}>{t.viewAll}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionCard}>
          {transactions.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.transaction,
                index !== transactions.length - 1 &&
                  styles.transactionBorder,
              ]}
            >
              <View
                style={[
                  styles.transactionIcon,
                  { backgroundColor: item.color },
                ]}
              >
                <Text style={styles.transactionEmoji}>{item.icon}</Text>
              </View>

              <View style={styles.transactionInfo}>
                <Text style={styles.transactionName}>
                  {item.id === 'coffee'
                    ? t.coffee
                    : item.id === 'salary'
                      ? t.salary
                      : t.shopping}
                </Text>

                <Text style={styles.transactionCategory}>
                  {item.id === 'coffee'
                    ? t.food
                    : item.id === 'salary'
                      ? t.income
                      : t.shopping}
                </Text>
              </View>

              <Text
                style={[
                  styles.transactionAmount,
                  item.amount.startsWith('+') && styles.income,
                ]}
              >
                {item.amount}
              </Text>
            </View>
          ))}
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
    flex: 1,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#2457E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
  },
  brandName: {
    color: '#17213B',
    fontSize: 23,
    fontWeight: '800',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E4EAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#2457E6',
    fontSize: 18,
    fontWeight: '800',
  },
  greeting: {
    marginBottom: 22,
  },
  muted: {
    color: '#778198',
    fontSize: 14,
    marginBottom: 5,
  },
  heading: {
    color: '#17213B',
    fontSize: 25,
    fontWeight: '800',
  },
  balanceCard: {
    backgroundColor: '#2457E6',
    borderRadius: 26,
    padding: 23,
    marginBottom: 30,
    overflow: 'hidden',
  },
  balanceTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#DCE5FF',
    fontSize: 14,
  },
  cardDots: {
    color: '#FFFFFF',
    fontSize: 20,
    letterSpacing: 3,
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 25,
  },
  balanceFooter: {
    borderTopWidth: 1,
    borderTopColor: '#6485EE',
    paddingTop: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  smallLabel: {
    color: '#DCE5FF',
    fontSize: 12,
    marginBottom: 6,
  },
  spending: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  growthBadge: {
    backgroundColor: '#4774ED',
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  growthText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  demoNote: {
    color: '#DCE5FF',
    fontSize: 9,
    letterSpacing: 1,
    marginTop: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 17,
  },
  sectionTitle: {
    color: '#17213B',
    fontSize: 19,
    fontWeight: '800',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  action: {
    alignItems: 'center',
    width: '23%',
    gap: 9,
  },
  actionIcon: {
    width: 58,
    height: 58,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionEmoji: {
    color: '#17213B',
    fontSize: 25,
    fontWeight: '700',
  },
  actionText: {
    color: '#414B63',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  viewAll: {
    color: '#2457E6',
    fontSize: 13,
    fontWeight: '700',
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
    gap: 12,
  },
  transactionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F7',
  },
  transactionIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionEmoji: {
    fontSize: 20,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    color: '#17213B',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 5,
  },
  transactionCategory: {
    color: '#929AAF',
    fontSize: 12,
  },
  transactionAmount: {
    color: '#17213B',
    fontSize: 13,
    fontWeight: '800',
  },
  income: {
    color: '#15965B',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF0FF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D6E1FF',
    padding: 15,
    marginBottom: 16,
    gap: 13,
  },
  loginIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#2457E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginIconText: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '800',
  },
  loginInfo: {
    flex: 1,
  },
  loginTitle: {
    color: '#17213B',
    fontSize: 15,
    fontWeight: '800',
  },
  loginSubtitle: {
    color: '#596780',
    fontSize: 12,
    marginTop: 5,
  },
  qrScannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E4EAF5',
    padding: 15,
    marginTop: -10,
    marginBottom: 28,
    gap: 13,
  },
  qrScannerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#DDF8F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrScannerIconText: {
    color: '#087F6B',
    fontSize: 29,
    fontWeight: '700',
  },
  qrScannerTitle: {
    color: '#17213B',
    fontSize: 15,
    fontWeight: '800',
  },
  qrScannerSubtitle: {
    color: '#778198',
    fontSize: 12,
    marginTop: 5,
  },
  arrow: {
    color: '#2457E6',
    fontSize: 30,
    fontWeight: '500',
  },
});
