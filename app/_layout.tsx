// app/_layout.tsx
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  const theme = useColorScheme() === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={theme}>
      <Stack>
         {/* Luôn nằm trên cùng */}
  <Stack.Screen name="login" options={{ headerShown: false }} />
  <Stack.Screen name="signup" options={{ headerShown: false }} />
  <Stack.Screen name="forgot-password" options={{ title: 'Quên mật khẩu' }} />
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
