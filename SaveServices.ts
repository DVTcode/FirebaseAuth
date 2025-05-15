// SaveServices.ts
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const services = [
  { name: 'Chăm sóc da mặt và dưỡng ẩm tự nhiên', price: 250000 },
  { name: 'Gội đầu dưỡng sinh trung hoa', price: 150000 },
  { name: 'Lột mụn', price: 40000 },
  { name: 'Gội đầu trọn gói tất cả dịch vụ', price: 400000 },
  { name: 'Dịch vụ rửa mặt', price: 100000 },
  { name: 'Dịch vụ đánh răng', price: 50000 },
];

export const saveServicesToFirestore = async () => {
  try {
    const colRef = collection(db, 'services');
    for (const service of services) {
      await addDoc(colRef, service);
    }
    console.log('✅ Đã lưu danh sách dịch vụ vào Firestore.');
  } catch (error) {
    console.error('❌ Lỗi khi lưu:', error);
  }
};
