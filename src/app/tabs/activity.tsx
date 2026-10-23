
import { useLanguage } from '@/components/context/languagecontext';
import { supabase } from '@/lib/supabase';
import { useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type QRScan = {
  id: number;
  scanned_data: string;
  qr_type: string | null;
  scanned_at: string;
};

const transactions = [
  {
    id: '1',
    name: 'Coffee House',
    category: {
      en: 'Food & Drinks · Today, 10:30 AM',
      hi: 'खाना और पेय · आज, सुबह 10:30',
      hinglish: 'Food & Drinks · Aaj, 10:30 AM',
    },
    amount: '-₹180.00',
    icon: '☕',
    color: '#FCE8D8',
    type: 'expense',
    status: { en: 'Completed', hi: 'पूरा हुआ', hinglish: 'Complete' },
  },
  {
    id: '2',
    name: 'Salary Received',
    category: {
      en: 'Income · Today, 9:15 AM',
      hi: 'आय · आज, सुबह 9:15',
      hinglish: 'Income · Aaj, 9:15 AM',
    },
    amount: '+₹25,000.00',
    icon: '↙',
    color: '#DDF7E8',
    type: 'income',
    status: { en: 'Completed', hi: 'पूरा हुआ', hinglish: 'Complete' },
  },
  {
    id: '3',
    name: 'Online Shopping',
    category: {
      en: 'Shopping · Yesterday',
      hi: 'खरीदारी · कल',
      hinglish: 'Shopping · Kal',
    },
    amount: '-₹1,250.00',
    icon: '🛍',
    color: '#E8E4FF',
    type: 'expense',
    status: { en: 'Completed', hi: 'पूरा हुआ', hinglish: 'Complete' },
  },
  {
    id: '4',
    name: 'Electricity Bill',
    category: {
      en: 'Utilities · Yesterday',
      hi: 'बिजली बिल · कल',
      hinglish: 'Electricity Bill · Kal',
    },
    amount: '-₹950.00',
    icon: '⚡',
    color: '#DDEEFF',
    type: 'expense',
    status: { en: 'Completed', hi: 'पूरा हुआ', hinglish: 'Complete' },
  },
  {
    id: '5',
    name: 'Received from Rahul',
    category: {
      en: 'Transfer · 8 Oct 2026',
      hi: 'ट्रांसफर · 8 अक्टूबर 2026',
      hinglish: 'Transfer · 8 Oct 2026',
    },
    amount: '+₹2,000.00',
    icon: '↙',
    color: '#DDF7E8',
    type: 'income',
    status: { en: 'Completed', hi: 'पूरा हुआ', hinglish: 'Complete' },
  },
];

const transactionNames = {
  en: {
    'Coffee House': 'Coffee House',
    'Salary Received': 'Salary Received',
    'Online Shopping': 'Online Shopping',
    'Electricity Bill': 'Electricity Bill',
    'Received from Rahul': 'Received from Rahul',
  },
  hi: {
    'Coffee House': 'कॉफी हाउस',
    'Salary Received': 'वेतन प्राप्त हुआ',
    'Online Shopping': 'ऑनलाइन खरीदारी',
    'Electricity Bill': 'बिजली बिल',
    'Received from Rahul': 'राहुल से प्राप्त',
  },
  hinglish: {
    'Coffee House': 'Coffee House',
    'Salary Received': 'Salary Receive Hua',
    'Online Shopping': 'Online Shopping',
    'Electricity Bill': 'Electricity Bill',
    'Received from Rahul': 'Rahul se receive hua',
  },
} as const;

export default function ActivityScreen() {
  const { language } = useLanguage();
  const [qrScans, setQrScans] = useState<QRScan[]>([]);
  const [loadingScans, setLoadingScans] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [historyError, setHistoryError] = useState('');

  const loadQRHistory = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoadingScans(true);
    }

    setHistoryError('');

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      if (!user) {
        setQrScans([]);
        setHistoryError(
          language === 'hi'
            ? 'इतिहास देखने के लिए लॉग इन करें।'
            : 'Please log in to view your scan history.'
        );
        return;
      }

      const { data, error } = await supabase
        .from('qr_scan_history')
        .select('id, scanned_data, qr_type, scanned_at')
        .eq('user_id', user.id)
        .order('scanned_at', { ascending: false });

      if (error) throw error;

      setQrScans((data ?? []) as QRScan[]);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Could not load QR scan history.';

      setHistoryError(message);
    } finally {
      setLoadingScans(false);
      setRefreshing(false);
    }
  }, [language]);

  useFocusEffect(
    useCallback(() => {
      void loadQRHistory();
    }, [loadQRHistory])
  );

  const text = {
    en: {
      subtitle: 'YOUR FINANCES',
      title: 'Activity',
      description: 'Review your recent transactions and QR scans.',
      income: 'Total income',
      expenses: 'Total expenses',
      all: 'All transactions',
      incomeFilter: 'Income',
      expensesFilter: 'Expenses',
      recent: 'Recent transactions',
      demo: 'DEMO TRANSACTIONS · NOT REAL BANK ACTIVITY',
      history: 'QR Scan History',
      historyDescription: 'Your saved QR scans',
      loading: 'Loading your scan history...',
      empty: 'No QR scans saved yet.',
      retry: 'Try Again',
      refresh: 'Refresh',
      scanType: 'Type',
      scanDate: 'Scanned',
      error: 'Could not load QR history',
    },
    hi: {
      subtitle: 'आपका वित्त',
      title: 'गतिविधि',
      description: 'हाल के लेन-देन और QR स्कैन देखें।',
      income: 'कुल आय',
      expenses: 'कुल खर्च',
      all: 'सभी लेन-देन',
      incomeFilter: 'आय',
      expensesFilter: 'खर्च',
      recent: 'हाल के लेन-देन',
      demo: 'डेमो लेन-देन · असली बैंक गतिविधि नहीं',
      history: 'QR स्कैन इतिहास',
      historyDescription: 'आपके सेव किए गए QR स्कैन',
      loading: 'स्कैन इतिहास लोड हो रहा है...',
      empty: 'अभी कोई QR स्कैन सेव नहीं है।',
      retry: 'दोबारा कोशिश करें',
      refresh: 'रिफ्रेश करें',
      scanType: 'प्रकार',
      scanDate: 'स्कैन समय',
      error: 'QR इतिहास लोड नहीं हो सका',
    },
    hinglish: {
      subtitle: 'AAPKE FINANCES',
      title: 'Activity',
      description: 'Recent transactions aur QR scans dekhein.',
      income: 'Total Income',
      expenses: 'Total Expenses',
      all: 'All Transactions',
      incomeFilter: 'Income',
      expensesFilter: 'Expenses',
      recent: 'Recent Transactions',
      demo: 'DEMO TRANSACTIONS · REAL BANK ACTIVITY NAHI',
      history: 'QR Scan History',
      historyDescription: 'Aapke saved QR scans',
      loading: 'Scan history load ho rahi hai...',
      empty: 'Abhi koi QR scan save nahi hai.',
      retry: 'Dobara try karein',
      refresh: 'Refresh karein',
      scanType: 'Type',
      scanDate: 'Scan time',
      error: 'QR history load nahi hui',
    },
  } as const;

  const labels = text[language];
  const totalIncome = 27000;
  const totalExpenses = 2380;

  const formatDate = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleString(
      language === 'hi' ? 'hi-IN' : 'en-IN',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => void loadQRHistory(true)}
            tintColor="#2457E6"
          />
        }
      >
        <Text style={styles.subtitle}>{labels.subtitle}</Text>
        <Text style={styles.title}>{labels.title}</Text>
        <Text style={styles.description}>{labels.description}</Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>{labels.income}</Text>
            <Text style={styles.incomeAmount}>
              +₹{totalIncome.toLocaleString('en-IN')}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>{labels.expenses}</Text>
            <Text style={styles.expenseAmount}>
              -₹{totalExpenses.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>

        <View style={styles.filterRow}>
          <Text style={styles.filterActive}>{labels.all}</Text>
          <Text style={styles.filterInactive}>{labels.incomeFilter}</Text>
          <Text style={styles.filterInactive}>{labels.expensesFilter}</Text>
        </View>

        <Text style={styles.sectionTitle}>{labels.recent}</Text>

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
                <Text style={styles.iconText}>{item.icon}</Text>
              </View>

              <View style={styles.transactionInfo}>
                <Text style={styles.transactionName}>
                  {transactionNames[language][
                    item.name as keyof (typeof transactionNames)['en']
                  ]}
                </Text>
                <Text style={styles.transactionCategory}>
                  {item.category[language]}
                </Text>
                <Text style={styles.status}>{item.status[language]}</Text>
              </View>

              <Text
                style={[
                  styles.amount,
                  item.type === 'income' && styles.incomeAmount,
                ]}
              >
                {item.amount}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.demoNote}>{labels.demo}</Text>

        <View style={styles.historyHeader}>
          <View style={styles.historyHeadingText}>
            <Text style={styles.sectionTitle}>{labels.history}</Text>
            <Text style={styles.historyDescription}>
              {labels.historyDescription}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.refreshButton}
            onPress={() => void loadQRHistory(true)}
            disabled={loadingScans || refreshing}
          >
            <Text style={styles.refreshButtonText}>{labels.refresh}</Text>
          </TouchableOpacity>
        </View>

        {loadingScans ? (
          <View style={styles.messageCard}>
            <ActivityIndicator size="large" color="#2457E6" />
            <Text style={styles.messageText}>{labels.loading}</Text>
          </View>
        ) : historyError ? (
          <View style={styles.messageCard}>
            <Text style={styles.errorTitle}>{labels.error}</Text>
            <Text selectable style={styles.messageText}>
              {historyError}
            </Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => void loadQRHistory()}
            >
              <Text style={styles.retryButtonText}>{labels.retry}</Text>
            </TouchableOpacity>
          </View>
        ) : qrScans.length === 0 ? (
          <View style={styles.messageCard}>
            <Text style={styles.emptyIcon}>▦</Text>
            <Text style={styles.messageText}>{labels.empty}</Text>
          </View>
        ) : (
          <View style={styles.qrHistoryCard}>
            {qrScans.map((scan, index) => (
              <View
                key={scan.id}
                style={[
                  styles.qrItem,
                  index !== qrScans.length - 1 && styles.transactionBorder,
                ]}
              >
                <View style={styles.qrIconBox}>
                  <Text style={styles.qrIconText}>▦</Text>
                </View>

                <View style={styles.qrInfo}>
                  <Text style={styles.qrType}>
                    {labels.scanType}: {scan.qr_type || 'QR'}
                  </Text>
                  <Text selectable style={styles.qrData}>
                    {scan.scanned_data}
                  </Text>
                  <Text style={styles.qrDate}>
                    {labels.scanDate}: {formatDate(scan.scanned_at)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F7FB' },
  container: { padding: 22, paddingBottom: 35 },
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
  },
  description: {
    color: '#778198',
    fontSize: 14,
    marginTop: 7,
    marginBottom: 22,
  },
  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 15,
  },
  summaryLabel: { color: '#778198', fontSize: 12, marginBottom: 12 },
  incomeAmount: { color: '#15965B', fontSize: 15, fontWeight: '800' },
  expenseAmount: { color: '#D84A4A', fontSize: 15, fontWeight: '800' },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 25,
  },
  filterActive: {
    overflow: 'hidden',
    backgroundColor: '#2457E6',
    color: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: '700',
  },
  filterInactive: {
    backgroundColor: '#FFFFFF',
    color: '#778198',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
    fontSize: 12,
  },
  sectionTitle: {
    color: '#17213B',
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 15,
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 14,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
    gap: 11,
  },
  transactionBorder: { borderBottomWidth: 1, borderBottomColor: '#F0F2F7' },
  transactionIcon: {
    width: 43,
    height: 43,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { fontSize: 20 },
  transactionInfo: { flex: 1 },
  transactionName: { color: '#17213B', fontSize: 13, fontWeight: '700' },
  transactionCategory: { color: '#929AAF', fontSize: 10, marginTop: 5 },
  status: { color: '#15965B', fontSize: 10, fontWeight: '600', marginTop: 5 },
  amount: { color: '#17213B', fontSize: 12, fontWeight: '800' },
  demoNote: {
    color: '#929AAF',
    textAlign: 'center',
    fontSize: 9,
    letterSpacing: 0.7,
    marginTop: 22,
    marginBottom: 32,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 8,
  },
  historyHeadingText: { flex: 1 },
  historyDescription: { color: '#778198', fontSize: 12, marginTop: -8, marginBottom: 15 },
  refreshButton: {
    backgroundColor: '#E5ECFF',
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 14,
  },
  refreshButtonText: { color: '#2457E6', fontSize: 12, fontWeight: '700' },
  messageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
    marginBottom: 20,
  },
  messageText: {
    color: '#778198',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 12,
  },
  errorTitle: { color: '#D84A4A', fontWeight: '700', fontSize: 15 },
  retryButton: {
    backgroundColor: '#2457E6',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 12,
    marginTop: 15,
  },
  retryButtonText: { color: '#FFFFFF', fontWeight: '700' },
  emptyIcon: { fontSize: 36, color: '#2457E6' },
  qrHistoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  qrItem: { flexDirection: 'row', gap: 12, paddingVertical: 16 },
  qrIconBox: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#DDF7F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrIconText: { color: '#159D83', fontSize: 25 },
  qrInfo: { flex: 1 },
  qrType: {
    color: '#159D83',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  qrData: {
    color: '#17213B',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
  qrDate: { color: '#929AAF', fontSize: 10, marginTop: 7 },
});
