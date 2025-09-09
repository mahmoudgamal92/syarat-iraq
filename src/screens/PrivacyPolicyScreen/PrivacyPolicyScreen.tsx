import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { styles } from './styles';
import { Header } from '@components';
export const PrivacyPolicyScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>سياسة الخصوصية</Text>

        <Text style={styles.sectionTitle}>١. مقدمة</Text>
        <Text style={styles.paragraph}>
          نحن نقدر خصوصيتك ونلتزم بحماية المعلومات الشخصية الخاصة بك. تهدف هذه السياسة إلى شرح كيفية جمع بياناتك واستخدامها ومشاركتها عند استخدام التطبيق.
        </Text>

        <Text style={styles.sectionTitle}>٢. البيانات التي نجمعها</Text>
        <Text style={styles.paragraph}>
          • البيانات التي تقدمها لنا: مثل الاسم، البريد الإلكتروني، ورقم الهاتف.{'\n'}
          • البيانات التي نجمعها تلقائيًا: مثل بيانات الجهاز، عنوان IP، وسجل التصفح داخل التطبيق.
        </Text>

        <Text style={styles.sectionTitle}>٣. كيفية استخدام بياناتك</Text>
        <Text style={styles.paragraph}>
          نحن نستخدم بياناتك لتقديم وتحسين خدماتنا، بما في ذلك:{'\n'}
          • تحسين أداء التطبيق.{'\n'}
          • التواصل معك بشأن التحديثات والعروض.{'\n'}
          • حماية المستخدمين من الأنشطة غير القانونية.
        </Text>

        <Text style={styles.sectionTitle}>٤. مشاركة البيانات</Text>
        <Text style={styles.paragraph}>
          لا نشارك بياناتك الشخصية مع أطراف ثالثة إلا في الحالات التالية:{'\n'}
          • الامتثال للقوانين والتشريعات.{'\n'}
          • إذا وافقت على مشاركة بياناتك.{'\n'}
          • مع مزودي الخدمة لتحسين تجربة التطبيق.
        </Text>

        <Text style={styles.sectionTitle}>٥. حقوقك</Text>
        <Text style={styles.paragraph}>
          لديك الحق في:{'\n'}
          • الوصول إلى بياناتك الشخصية وتحديثها.{'\n'}
          • طلب حذف بياناتك في أي وقت.{'\n'}
          • سحب الموافقة على معالجة بياناتك.
        </Text>

        <Text style={styles.sectionTitle}>٦. حماية البيانات</Text>
        <Text style={styles.paragraph}>
          نحن نتخذ تدابير أمنية مناسبة لحماية بياناتك من الوصول غير المصرح به، أو التعديل، أو الإفصاح.
        </Text>

        <Text style={styles.sectionTitle}>٧. تحديثات سياسة الخصوصية</Text>
        <Text style={styles.paragraph}>
          قد نقوم بتحديث هذه السياسة من وقت لآخر. نوصي بمراجعتها بانتظام لمعرفة أي تغييرات.
        </Text>

        <Text style={styles.sectionTitle}>٨. الاتصال بنا</Text>
        <Text style={styles.paragraph}>
          إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا عبر البريد الإلكتروني: example@email.com
        </Text>
      </ScrollView>
    </View>

  );
}
