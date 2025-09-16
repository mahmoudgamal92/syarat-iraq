export const AUTHORIZATION_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkFsYWEgT3NhbWEiLCJyb2xlIjoiU3VwZXJBZG1pbiIsIm5iZiI6MTc1NTg4Nzg0OSwiZXhwIjozMzI5MTg4Nzg0OSwiaWF0IjoxNzU1ODg3ODQ5LCJpc3MiOiJodHRwczovL3NlcnZpY2VzLnNheWFyYXQtaXJhcS5jb20vIiwiYXVkIjoiaHR0cHM6Ly9zZXJ2aWNlcy5zYXlhcmF0LWlyYXEuY29tLyJ9.783viQBeI-Jw31Sx_gN0y2XccQxgJ6GJtNb69_pICWs';
export const baseURL = "https://services.sayarat-iraq.com/api";


export const features = [
  { id: 1, icon: 'camera-rear', text: 'كاميرا خلفية' },
  { id: 2, icon: 'panorama', text: 'بانوراما' },
  { id: 3, icon: 'airbag', text: 'كشن تدفئة' },
  { id: 4, icon: 'panorama', text: 'بانوراما' },
  { id: 5, icon: 'airbag', text: 'كشن تدفئة' },
  { id: 6, icon: 'camera-rear', text: 'كاميرا خلفية' },
  { id: 7, icon: 'panorama', text: 'بانوراما' },
  { id: 8, icon: 'airbag', text: 'كشن تدفئة' },
];

export const carList = [
  {
    id: '1',
    name: 'تويوتا كامري 2020',
    engine: '2.5L',
    condition: 'حادث',
    origin: 'اليابان',
    cylinders: 4,
    color: 'أبيض',
    location: 'الرياض',
    price: '100,000 ر.س',
    phone: '0501234567',
    kilometers: '55',
    gasType: 'بنزين',
    image: require('@assets/images/carList.jpg'), // make sure to add the image in assets
  },
  {
    id: '2',
    name: 'مرسيدس C200 2019',
    engine: '2.0L',
    condition: 'حادث',
    origin: 'ألمانيا',
    cylinders: 4,
    color: 'أسود',
    location: 'جدة',
    price: '120,000 ر.س',
    phone: '0507654321',
    kilometers: '55',
    gasType: 'بنزين',
    image: require('@assets/images/carList.jpg'),
  },
  {
    id: '3',
    name: 'نيسان ألتيما 2021',
    engine: '2.5L',
    condition: 'بيها حادث',
    origin: 'اليابان',
    cylinders: 4,
    color: 'أزرق',
    location: 'الدمام',
    price: '95,000 ر.س',
    phone: '0501122334',
    kilometers: '55',
    gasType: 'بنزين',
    image: require('@assets/images/carList.jpg'),
  },
  {
    id: '4',
    name: 'بي إم دبليو 320i 2020',
    engine: '2.0L',
    condition: 'كلين',
    origin: 'ألمانيا',
    cylinders: 4,
    color: 'رمادي',
    location: 'الخبر',
    price: '130,000 ر.س',
    phone: '0509988776',
    kilometers: '55',
    gasType: 'بنزين',
    image: require('@assets/images/carList.jpg'),
  },
];

export const countries = [
  { label: 'ياباني', value: 'ياباني', },
  { label: 'كوري', value: 'كوري', },

];


export const clinders = [
  { label: '2', value: '2', },
  { label: '4', value: '4', },
];

export const carType = [
  { label: 'مستعمل', value: 2, },
  { label: 'جديد', value: 1, },

];
export const carStatus = [
  { label: 'بها حادث', value: 3, },
  { label: 'بدون حادث', value: 2, },
  { label: 'كلين', value: 1, },

];

export const categories = [
  { name: 'الحمل', color: '#F28C5C', value: "truck" },
  { name: 'الرافعات', color: '#5C4CF2', value: "cranes" },
  { name: 'تناكر', color: '#F28C5C', value: "towtrucks" },
  { name: 'الحفارات', color: '#5C4CF2', value: "excavators" },
  { name: 'الكريدارات', color: '#F28C5C', value: "bulldozers" },
  { name: 'الكرينات', color: '#5C4CF2', value: "cranes" },
  { name: 'الحادلات', color: '#5C4CF2', value: "loaders" },
  { name: 'الشغلات', color: '#4CF2B0', value: "forklifts" },
  { name: 'باصات', color: '#5C4CF2', value: "buses" },
  { name: 'اليات زراعية', color: '#4CF2B0', value: "agricultural" },
];


export const cities = [
  { label: "بغداد", value: "بغداد" },
  { label: "أربيل", value: "أربيل" },
  { label: "السليمانية", value: "السليمانية" },
  { label: "دهوك", value: "دهوك" },
  { label: "البصرة", value: "البصرة" },
  { label: "كركوك", value: "كركوك" },
  { label: "الموصل (نينوى)", value: "الموصل (نينوى)" },
  { label: "الناصرية (ذي قار)", value: "الناصرية (ذي قار)" },
  { label: "السماوة (المثنى)", value: "السماوة (المثنى)" },
  { label: "العمارة (ميسان)", value: "العمارة (ميسان)" },
  { label: "الحلة (بابل)", value: "الحلة (بابل)" },
  { label: "الكوت (واسط)", value: "الكوت (واسط)" },
  { label: "النجف", value: "النجف" },
  { label: "كربلاء", value: "كربلاء" },
  { label: "صلاح الدين", value: "صلاح الدين" },
  { label: "ديالى", value: "ديالى" },
  { label: "الأنبار", value: "الأنبار" },
  { label: "الديوانية", value: "الديوانية" },
  { label: "حلبجة", value: "حلبجة" },
];


