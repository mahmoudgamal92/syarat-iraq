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




export function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return 'منذ لحظات';
  if (minutes < 60) return `منذ ${minutes} دقيقة`;
  if (hours < 24) return `منذ ${hours} ساعة`;
  if (days < 30) return `منذ ${days} يوم`;
  if (months < 12) return `منذ ${months} شهر`;
  return `منذ ${years} سنة`;
}
