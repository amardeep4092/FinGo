
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

import { useLanguage } from '@/components/context/languagecontext';
import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const { t } = useLanguage();

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{
        selected: { color: colors.text },
      }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>
          {t('home')}
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>
          {t('cards')}
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="activity">
        <NativeTabs.Trigger.Label>
          {t('activity')}
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="arrow.left.arrow.right"
          md="swap-horiz"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>
          {t('profile')}
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="person.crop.circle"
          md="account-circle"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="qr-scanner">
        <NativeTabs.Trigger.Label>
          Scan
        </NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="qrcode.viewfinder"
          md="qr-code-scanner"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
