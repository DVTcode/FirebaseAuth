// app/(tabs)/services/page.tsx
import { getServices } from '@li'; // hàm fetch từ Firestore
import Link from 'next/link';

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <main>
      <h1>All Services</h1>
      <Link href="/services/add">+ Add New Service</Link>
      <ul>
        {services.map(s => (
          <li key={s.id}>
            <Link href={`/services/${s.id}`}>{s.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
