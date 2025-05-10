// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: 'Trang chủ' }}
      />
      <Tabs.Screen
        name="explore"
        options={{ title: 'Khám phá' }}
      />
    </Tabs>
  );
}
