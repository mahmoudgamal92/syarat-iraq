import { Alert, Linking } from 'react-native';

export const openUrl = async (rawUrl: string) => {
  console.log('url to open:', rawUrl);

  const validUrl = normalizeUrl(rawUrl);

  if (!validUrl) {
    Alert.alert('خطأ', 'الرابط غير صالح');
    return;
  }

  try {
    await Linking.openURL(validUrl);
  } catch (err) {
    console.log('openUrl error:', err);
    Alert.alert('خطأ', 'حدث خطأ أثناء محاولة فتح الرابط');
  }
};

    export const normalizeUrl = (url: string): string | null => {
  if (!url || typeof url !== 'string') return null;

  const trimmed = url.trim();

  if (!trimmed) return null;

  // لو الرابط بدون scheme ضيف https
  const withScheme = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const parsed = new URL(withScheme);

    // لازم يبقى فيه دومين حقيقي
    if (!parsed.hostname || !parsed.hostname.includes('.')) {
      return null;
    }

    return parsed.href;
  } catch {
    return null;
  }
};
