// app/(auth)/forgot-password.tsx
import { auth } from '@/Config/firebaseConfig';
import { router } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleSendReset = async () => {
    if (!email) {
      Alert.alert('❗️ Vui lòng nhập email');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('✅ Email khôi phục đã được gửi. Vui lòng kiểm tra hộp thư.');
      router.replace('/(auth)/login');
    } catch (err: any) {
      Alert.alert('❌ Lỗi:', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quên mật khẩu</Text>
      <Text style={styles.instructions}>
        Nhập email để nhận đường dẫn đặt lại mật khẩu.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email của bạn"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Button title="Gửi email khôi phục" onPress={handleSendReset} />
      <View style={styles.back}>
        <Text
          style={styles.link}
          onPress={() => router.push('/(auth)/login')}
        >
          ← Quay lại Đăng nhập
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  instructions: { textAlign: 'center', marginBottom: 20, color: '#555' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 6,
    padding: 12, marginBottom: 16,
  },
  back: { marginTop: 16, alignItems: 'center' },
  link: { color: '#3478f6', fontWeight: '600' },
});
