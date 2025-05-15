import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const services = [
  { name: 'Chăm sóc da mặt và dưỡng ẩm tự nhiên', price: 250000 },
  { name: 'Gội đầu dưỡng sinh trung hoa', price: 150000 },
  { name: 'Lột mụn', price: 40000 },
  { name: 'Gội đầu trọn gói tất cả dịch vụ', price: 400000 },
  { name: 'Dịch vụ rửa mặt', price: 100000 },
  { name: 'Dịch vụ đánh răng', price: 50000 },
];

export const seedServicesToFirestore = async () => {
  try {
    for (const service of services) {
      await addDoc(collection(db, 'services'), service);
      console.log('Đã thêm:', service.name);
    }
    console.log('✅ Đã thêm tất cả dịch vụ');
  } catch (error: any) {
    console.error('❌ Lỗi khi thêm:', error.message);
  }
};
