import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './loginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import AddServiceScreen from './AddServiceScreen'; // 👈 THÊM DÒNG NÀY
import { ThemeProvider } from './ThemeContext';
import ServiceDetailScreen from './ServiceDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Trang chủ' }}
          />
          <Stack.Screen
            name="AddService"
            component={AddServiceScreen}
            options={{ title: 'Thêm dịch vụ' }} // 👈 Tùy chọn tiêu đề
          />
          <Stack.Screen
  name="ServiceDetail"
  component={ServiceDetailScreen}
  options={{ title: 'Chi tiết dịch vụ' }}
/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
