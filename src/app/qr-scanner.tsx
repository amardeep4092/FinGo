
import {
  CameraView,
  useCameraPermissions,
  type BarcodeScanningResult,
} from 'expo-camera';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { supabase } from '@/lib/supabase';

export default function QRScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();

  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scannedType, setScannedType] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleBarcodeScanned = async (
    result: BarcodeScanningResult
  ) => {
    if (scannedData !== null || saving) return;

    setScannedData(result.data);
    setScannedType(result.type);
    setSaving(true);
    setSaved(false);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      if (!user) {
        throw new Error('Please log in again to save your scan.');
      }

      const { error: insertError } = await supabase
        .from('qr_scan_history')
        .insert({
          scanned_data: result.data,
          qr_type: result.type || 'qr',
          user_id: user.id,
        });

      if (insertError) throw insertError;

      setSaved(true);
      Alert.alert('Scan Successful', 'QR data saved to your history.');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred';

      Alert.alert(
        'Scan Read, Save Failed',
        `QR code read hua, lekin database mein save nahi hua.\n\n${message}`
      );
    } finally {
      setSaving(false);
    }
  };

  const handleScanAgain = () => {
    setScannedData(null);
    setScannedType(null);
    setSaved(false);
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'QR Scanner', headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="#070B14" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityLabel="Go back"
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.headerTitle}>QR Scanner</Text>
          <Text style={styles.headerSubtitle}>Scan securely with FinGo</Text>
        </View>

        <View style={styles.headerIcon}>
          <Text style={styles.qrIcon}>▦</Text>
        </View>
      </View>

      {!permission ? (
        <View style={styles.centerContent}>
          <Text style={styles.infoText}>Checking camera permission...</Text>
        </View>
      ) : !permission.granted ? (
        <View style={styles.permissionCard}>
          <Text style={styles.largeIcon}>📷</Text>
          <Text style={styles.sectionTitle}>Camera Permission Needed</Text>
          <Text style={styles.infoText}>
            FinGo needs camera access to scan QR codes. Your camera is used
            only while this scanner screen is active.
          </Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={requestPermission}
          >
            <Text style={styles.primaryButtonText}>Allow Camera Access</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.introTitle}>
            {scannedData ? 'QR Code Scanned' : 'Scan any QR code'}
          </Text>
          <Text style={styles.introSubtitle}>
            {scannedData
              ? 'Review the scanned information below.'
              : 'Place the QR code inside the frame to scan it.'}
          </Text>

          <View style={styles.cameraCard}>
            {!scannedData ? (
              <CameraView
                style={styles.camera}
                facing="back"
                barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                onBarcodeScanned={handleBarcodeScanned}
              >
                <View style={styles.scanOverlay}>
                  <View style={styles.scanFrame}>
                    <View style={[styles.corner, styles.topLeft]} />
                    <View style={[styles.corner, styles.topRight]} />
                    <View style={[styles.corner, styles.bottomLeft]} />
                    <View style={[styles.corner, styles.bottomRight]} />
                    <View style={styles.scanLine} />
                  </View>
                </View>
              </CameraView>
            ) : (
              <View style={styles.resultPlaceholder}>
                <Text style={styles.successIcon}>✓</Text>
                <Text style={styles.resultHeading}>
                  {saving ? 'Saving Scan...' : saved ? 'Scan Saved!' : 'QR Scanned'}
                </Text>
                {saving ? (
                  <ActivityIndicator color="#42E8C5" size="large" />
                ) : (
                  <Text style={styles.resultHint}>
                    {saved
                      ? 'QR data saved securely to your account.'
                      : 'QR data was read. Check the error message if saving failed.'}
                  </Text>
                )}
              </View>
            )}
          </View>

          {!scannedData ? (
            <View style={styles.tipCard}>
              <Text style={styles.tipIcon}>💡</Text>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Scanning tips</Text>
                <Text style={styles.tipText}>
                  Keep your phone steady, use good lighting, and make sure
                  the complete QR code is visible.
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>QR TYPE</Text>
              <Text style={styles.resultValue}>{scannedType ?? 'QR code'}</Text>

              <Text style={[styles.resultLabel, styles.dataLabel]}>
                SCANNED DATA
              </Text>
              <Text selectable style={styles.scannedData}>
                {scannedData}
              </Text>

              <Text style={styles.securityNote}>
                Check QR content before opening a link or making a payment.
                Scanning does not prove a QR code is trustworthy.
              </Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleScanAgain}
                disabled={saving}
              >
                <Text style={styles.primaryButtonText}>Scan Again</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.footer}>
            <Text style={styles.footerText}>🔒 FinGo Secure Scanner</Text>
            <Text style={styles.footerSubtext}>
              Scanning does not transfer money.
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070B14' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 54,
    paddingHorizontal: 20,
    paddingBottom: 22,
    gap: 14,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#151E2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 34,
    lineHeight: 38,
    marginTop: -4,
  },
  headerTitle: { color: '#FFFFFF', fontSize: 21, fontWeight: '700' },
  headerSubtitle: { color: '#8D9AB0', fontSize: 12, marginTop: 3 },
  headerIcon: {
    marginLeft: 'auto',
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#142C35',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrIcon: { color: '#42E8C5', fontSize: 28 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 32 },
  introTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },
  introSubtitle: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 22,
  },
  cameraCard: {
    height: 330,
    overflow: 'hidden',
    borderRadius: 24,
    backgroundColor: '#111B2B',
    borderWidth: 1,
    borderColor: '#25364A',
  },
  camera: { flex: 1 },
  scanOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  scanFrame: { width: 225, height: 225, position: 'relative' },
  corner: { position: 'absolute', width: 35, height: 35, borderColor: '#42E8C5' },
  topLeft: {
    top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 12,
  },
  topRight: {
    top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 12,
  },
  scanLine: {
    position: 'absolute', top: '50%', left: 8, right: 8,
    height: 2, backgroundColor: '#42E8C5', opacity: 0.9,
  },
  resultPlaceholder: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  successIcon: {
    width: 66, height: 66, borderRadius: 33, overflow: 'hidden',
    textAlign: 'center', textAlignVertical: 'center', color: '#07130F',
    backgroundColor: '#42E8C5', fontSize: 42, fontWeight: '700', marginBottom: 18,
  },
  resultHeading: { color: '#FFFFFF', fontSize: 21, fontWeight: '700', marginBottom: 12 },
  resultHint: { color: '#94A3B8', fontSize: 14, textAlign: 'center', marginTop: 8 },
  tipCard: {
    flexDirection: 'row', backgroundColor: '#111B2B', borderRadius: 18,
    padding: 16, marginTop: 20, borderWidth: 1, borderColor: '#202D40', gap: 12,
  },
  tipIcon: { fontSize: 24 },
  tipContent: { flex: 1 },
  tipTitle: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  tipText: { color: '#94A3B8', fontSize: 13, lineHeight: 20, marginTop: 6 },
  resultCard: {
    backgroundColor: '#111B2B', borderWidth: 1, borderColor: '#26364A',
    borderRadius: 20, padding: 18, marginTop: 20,
  },
  resultLabel: { color: '#42E8C5', fontSize: 11, fontWeight: '700', letterSpacing: 1.2 },
  resultValue: { color: '#FFFFFF', fontSize: 15, marginTop: 8, textTransform: 'uppercase' },
  dataLabel: { marginTop: 22 },
  scannedData: {
    color: '#FFFFFF', fontSize: 15, lineHeight: 23, marginTop: 8,
    padding: 12, backgroundColor: '#0A1220', borderRadius: 12, overflow: 'hidden',
  },
  securityNote: { color: '#F2C879', fontSize: 12, lineHeight: 19, marginTop: 16, marginBottom: 18 },
  primaryButton: {
    backgroundColor: '#42E8C5', borderRadius: 14, minHeight: 50,
    paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', marginTop: 20,
  },
  primaryButtonText: { color: '#07130F', fontSize: 15, fontWeight: '700' },
  permissionCard: {
    margin: 20, marginTop: 45, padding: 24, borderRadius: 22,
    backgroundColor: '#111B2B', alignItems: 'center', borderWidth: 1, borderColor: '#26364A',
  },
  largeIcon: { fontSize: 44, marginBottom: 18 },
  sectionTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '700', textAlign: 'center' },
  infoText: { color: '#94A3B8', fontSize: 14, lineHeight: 22, textAlign: 'center', marginTop: 12 },
  centerContent: { flex: 1, justifyContent: 'center', padding: 24 },
  footer: { alignItems: 'center', marginTop: 25 },
  footerText: { color: '#42E8C5', fontSize: 13, fontWeight: '600' },
  footerSubtext: { color: '#718096', fontSize: 12, marginTop: 7 },
});
